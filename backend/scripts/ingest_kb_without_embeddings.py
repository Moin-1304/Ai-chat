"""
Knowledge Base ingestion script WITHOUT OpenAI embeddings
Uses simple hash-based embeddings for testing when API quota is exceeded
"""
import os
import sys
import json
import re
import hashlib
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database.vector_store import get_vector_store
from app.models.database import init_db, KBChunk, get_session_local
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def simple_embedding(text: str, dim: int = 1536) -> list:
    """
    Create a simple hash-based embedding for testing
    This is NOT a real embedding but allows storing text in ChromaDB
    """
    # Use hash to create deterministic "embedding"
    hash_obj = hashlib.sha256(text.encode())
    hash_hex = hash_obj.hexdigest()
    
    # Convert hex to numbers (0-1 range)
    embedding = []
    for i in range(0, min(len(hash_hex), dim * 2), 2):
        val = int(hash_hex[i:i+2], 16) / 255.0
        embedding.append(val)
    
    # Pad to required dimension
    while len(embedding) < dim:
        embedding.append(0.0)
    
    return embedding[:dim]


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list:
    """Split text into overlapping chunks"""
    paragraphs = re.split(r'\n\n+', text)
    chunks = []
    current_chunk = ""
    
    for para in paragraphs:
        if len(current_chunk) + len(para) + 2 <= chunk_size:
            current_chunk += para + "\n\n"
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = para + "\n\n"
    
    if current_chunk:
        chunks.append(current_chunk.strip())
    
    return chunks


def extract_metadata(file_path: str, content: str) -> dict:
    """Extract metadata from markdown frontmatter"""
    metadata = {
        "kb_id": "",
        "title": "",
        "category": "",
        "source": "kb",
        "version": "1.0",
        "last_updated": "",
    }
    
    # Try to extract frontmatter
    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        for line in frontmatter.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                key = key.strip()
                value = value.strip().strip('"\'')
                if key == 'id':
                    metadata['kb_id'] = value
                elif key == 'title':
                    metadata['title'] = value
                elif key == 'version':
                    metadata['version'] = value
                elif key == 'last_updated':
                    metadata['last_updated'] = value
                elif key == 'tags':
                    # Extract first tag as category
                    tags = [t.strip() for t in value.strip('[]').split(',')]
                    if tags:
                        metadata['category'] = tags[0]
    
    # If no frontmatter, use filename
    if not metadata['kb_id']:
        filename = os.path.basename(file_path)
        metadata['kb_id'] = filename.replace('.md', '')
        metadata['title'] = filename.replace('.md', '').replace('-', ' ').title()
    
    return metadata


def process_file(file_path: str, vector_store, db) -> int:
    """Process a single KB file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract metadata
        file_metadata = extract_metadata(file_path, content)
        
        # Remove frontmatter if present
        content = re.sub(r'^---\s*\n.*?\n---\s*\n', '', content, flags=re.DOTALL)
        
        # Split into chunks
        text_chunks = chunk_text(content)
        
        if not text_chunks:
            logger.warning(f"No chunks extracted from {file_path}")
            return 0
        
        # Prepare chunks for vector store
        chunks = []
        embeddings = []
        
        for idx, chunk_content in enumerate(text_chunks):
            chunk_id = f"{file_metadata['kb_id']}-chunk-{idx}"
            
            chunk_data = {
                "id": chunk_id,
                "content": chunk_content,
                "kb_id": file_metadata['kb_id'],
                "title": file_metadata['title'],
                "category": file_metadata['category'],
                "source": file_metadata['source'],
                "version": file_metadata.get('version', '1.0'),
                "date": file_metadata.get('last_updated', ''),
                "chunk_index": idx,
            }
            
            # Create simple embedding
            embedding = simple_embedding(chunk_content)
            
            chunks.append(chunk_data)
            embeddings.append(embedding)
        
        # Add to vector store
        vector_store.add_chunks(chunks, embeddings)
        
        # Also save to SQLite for reference
        kb_chunk = KBChunk(
            kb_id=file_metadata['kb_id'],
            title=file_metadata['title'],
            content=content[:5000],  # First 5000 chars
            category=file_metadata['category'],
            source=file_metadata['source'],
            extra_metadata=json.dumps(file_metadata)
        )
        db.add(kb_chunk)
        db.commit()
        
        logger.info(f"Successfully processed {file_path}: {len(chunks)} chunks")
        return len(chunks)
        
    except Exception as e:
        logger.error(f"Error processing {file_path}: {e}")
        return 0


def main():
    """Main ingestion function"""
    # Initialize databases
    engine = init_db()
    SessionLocal = get_session_local(engine)
    db = SessionLocal()
    
    try:
        vector_store = get_vector_store()
        
        # Find all KB files
        kb_dir = Path(__file__).parent.parent / "knowledge_base" / "raw"
        kb_files = list(kb_dir.glob("*.md"))
        
        # Filter out README.md
        kb_files = [f for f in kb_files if f.name != "README.md"]
        
        logger.info(f"Found {len(kb_files)} KB files")
        
        total_chunks = 0
        for kb_file in sorted(kb_files):
            logger.info(f"Processing: {kb_file}")
            chunks_added = process_file(str(kb_file), vector_store, db)
            total_chunks += chunks_added
        
        # Get final count
        final_count = vector_store.get_count()
        logger.info(f"Ingestion complete! Total chunks in vector store: {final_count}")
        
    except Exception as e:
        logger.error(f"Error during ingestion: {e}", exc_info=True)
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()

