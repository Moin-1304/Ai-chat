"""
Knowledge Base ingestion script
Processes KB files and stores them in the vector database
"""
import os
import sys
import json
import re
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database.vector_store import get_vector_store
from app.utils.embeddings import get_embedding_generator
from app.models.database import init_db, KBChunk, get_session_local
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    """Split text into overlapping chunks"""
    # Split by paragraphs first
    paragraphs = re.split(r'\n\n+', text)
    
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        # If adding this paragraph would exceed chunk size, save current chunk
        if len(current_chunk) + len(para) > chunk_size and current_chunk:
            chunks.append(current_chunk.strip())
            # Start new chunk with overlap
            current_chunk = current_chunk[-overlap:] + "\n\n" + para
        else:
            current_chunk += "\n\n" + para if current_chunk else para
    
    # Add final chunk
    if current_chunk.strip():
        chunks.append(current_chunk.strip())
    
    return chunks


def load_kb_from_markdown(file_path: str) -> dict:
    """Load KB article from markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract metadata from frontmatter or content
    kb_id = None
    title = None
    category = None
    source = "MKDocs"
    
    # Try to extract KB ID from filename or content
    filename = os.path.basename(file_path)
    if filename.startswith("KB-"):
        kb_id = filename.split("-")[1].split(".")[0]
    
    # Extract title (first # heading)
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if title_match:
        title = title_match.group(1).strip()
    
    # Extract KB ID from content if present
    kb_id_match = re.search(r'\*\*KB ID:\*\*\s*([^\s]+)', content)
    if kb_id_match:
        kb_id = kb_id_match.group(1)
    
    # Extract category
    category_match = re.search(r'\*\*Category:\*\*\s*([^\n]+)', content)
    if category_match:
        category = category_match.group(1).strip()
    
    # Use filename as fallback for title
    if not title:
        title = os.path.splitext(filename)[0]
    
    # Use filename as fallback for KB ID
    if not kb_id:
        kb_id = os.path.splitext(filename)[0]
    
    return {
        "id": kb_id,
        "title": title,
        "content": content,
        "category": category or "General",
        "source": source
    }


def load_kb_from_json(file_path: str) -> dict:
    """Load KB article from JSON file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    return {
        "id": data.get("id", os.path.splitext(os.path.basename(file_path))[0]),
        "title": data.get("title", "Untitled"),
        "content": data.get("content", data.get("summary", "")),
        "category": data.get("category", "General"),
        "source": data.get("source", "JSON")
    }


def ingest_kb_file(file_path: str, vector_store, embedding_generator, db_session):
    """Ingest a single KB file"""
    file_path = Path(file_path)
    
    if not file_path.exists():
        logger.warning(f"File not found: {file_path}")
        return
    
    logger.info(f"Processing: {file_path}")
    
    # Load based on file type
    if file_path.suffix == ".md":
        kb_data = load_kb_from_markdown(str(file_path))
    elif file_path.suffix == ".json":
        kb_data = load_kb_from_json(str(file_path))
    else:
        logger.warning(f"Unsupported file type: {file_path.suffix}")
        return
    
    # Chunk the content
    chunks = chunk_text(kb_data["content"])
    
    if not chunks:
        logger.warning(f"No chunks created for {file_path}")
        return
    
    # Prepare chunks for vector store
    chunk_objects = []
    
    for i, chunk_content in enumerate(chunks):
        chunk_id = f"{kb_data['id']}_chunk_{i}"
        
        chunk_obj = {
            "id": chunk_id,
            "kb_id": kb_data["id"],
            "title": kb_data["title"],
            "content": chunk_content,
            "category": kb_data["category"],
            "source": kb_data["source"],
            "chunk_index": i
        }
        chunk_objects.append(chunk_obj)
        
        # Store in database
        kb_chunk = KBChunk(
            id=chunk_id,
            kb_id=kb_data["id"],
            title=kb_data["title"],
            content=chunk_content,
            chunk_index=i,
            category=kb_data["category"],
            source=kb_data["source"],
            extra_metadata={"file_path": str(file_path)}
        )
        db_session.add(kb_chunk)
    
    # Generate embeddings
    texts = [chunk["content"] for chunk in chunk_objects]
    embeddings = embedding_generator.generate_batch(texts)
    
    # Add to vector store
    vector_store.add_chunks(chunk_objects, embeddings)
    
    # Commit database changes
    db_session.commit()
    
    logger.info(f"Ingested {len(chunks)} chunks from {file_path}")


def main():
    """Main ingestion function"""
    # Initialize components
    vector_store = get_vector_store()
    embedding_generator = get_embedding_generator()
    
    # Initialize database
    engine = init_db()
    SessionLocal = get_session_local(engine)
    db = SessionLocal()
    
    try:
        # Get KB directory
        kb_dir = os.getenv("KB_DIR", "./knowledge_base/raw")
        kb_dir = Path(kb_dir)
        
        if not kb_dir.exists():
            logger.error(f"KB directory not found: {kb_dir}")
            return
        
        # Find all KB files
        kb_files = []
        for ext in ["*.md", "*.json"]:
            kb_files.extend(kb_dir.glob(ext))
        
        if not kb_files:
            logger.warning(f"No KB files found in {kb_dir}")
            # Try to use example KB from frontend
            frontend_kb = Path(__file__).parent.parent.parent / "dsai-help-desk-main" / "docs" / "kb-examples"
            if frontend_kb.exists():
                logger.info(f"Trying frontend KB directory: {frontend_kb}")
                for ext in ["*.md", "*.json"]:
                    kb_files.extend(frontend_kb.glob(ext))
        
        if not kb_files:
            logger.error("No KB files found. Please add KB files to knowledge_base/raw/")
            return
        
        logger.info(f"Found {len(kb_files)} KB files")
        
        # Ingest each file
        for kb_file in kb_files:
            try:
                ingest_kb_file(kb_file, vector_store, embedding_generator, db)
            except Exception as e:
                logger.error(f"Error ingesting {kb_file}: {e}")
        
        # Print summary
        total_chunks = vector_store.get_count()
        logger.info(f"Ingestion complete! Total chunks in vector store: {total_chunks}")
        
    finally:
        db.close()


if __name__ == "__main__":
    main()

