"""
Vector store for KB chunks using ChromaDB
"""
import os
import chromadb
from chromadb.config import Settings
from typing import List, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)


class VectorStore:
    """Vector store for KB chunks"""
    
    def __init__(self):
        # Use persistent storage
        persist_directory = os.getenv("VECTOR_DB_PATH", "./chroma_db")
        os.makedirs(persist_directory, exist_ok=True)
        
        self.client = chromadb.PersistentClient(
            path=persist_directory,
            settings=Settings(anonymized_telemetry=False)
        )
        
        # Get or create collection
        self.collection = self.client.get_or_create_collection(
            name="kb_chunks",
            metadata={"hnsw:space": "cosine"}  # Use cosine similarity
        )
        logger.info(f"Vector store initialized at {persist_directory}")
    
    def add_chunks(self, chunks: List[Dict[str, Any]], embeddings: List[List[float]]):
        """Add KB chunks with embeddings to vector store"""
        if not chunks or not embeddings:
            return
        
        ids = [chunk["id"] for chunk in chunks]
        documents = [chunk["content"] for chunk in chunks]
        metadatas = [
            {
                "kb_id": chunk.get("kb_id", ""),
                "title": chunk.get("title", ""),
                "category": chunk.get("category", ""),
                "source": chunk.get("source", ""),
                "chunk_index": str(chunk.get("chunk_index", 0)),
                "version": chunk.get("version", ""),
                "date": chunk.get("date", "") or chunk.get("last_updated", ""),
            }
            for chunk in chunks
        ]
        
        try:
            self.collection.add(
                ids=ids,
                embeddings=embeddings,
                documents=documents,
                metadatas=metadatas
            )
            logger.info(f"Added {len(chunks)} chunks to vector store")
        except Exception as e:
            logger.error(f"Error adding chunks to vector store: {e}")
            raise
    
    def search(
        self, 
        query_embedding: List[float], 
        top_k: int = 5,
        filter_metadata: Optional[Dict[str, Any]] = None
    ) -> List[Dict[str, Any]]:
        """Search for similar chunks"""
        try:
            results = self.collection.query(
                query_embeddings=[query_embedding],
                n_results=top_k,
                where=filter_metadata  # Optional metadata filtering
            )
            
            # Format results
            chunks = []
            if results["ids"] and len(results["ids"][0]) > 0:
                for i in range(len(results["ids"][0])):
                    metadata = results["metadatas"][0][i]
                    chunk = {
                        "id": results["ids"][0][i],
                        "content": results["documents"][0][i],
                        "title": metadata.get("title", ""),
                        "kb_id": metadata.get("kb_id", ""),
                        "category": metadata.get("category", ""),
                        "source": metadata.get("source", ""),
                        "version": metadata.get("version", ""),
                        "date": metadata.get("date", ""),
                        "distance": results["distances"][0][i] if "distances" in results else 0.0,
                    }
                    chunks.append(chunk)
            
            return chunks
        except Exception as e:
            logger.error(f"Error searching vector store: {e}")
            return []
    
    def get_count(self) -> int:
        """Get total number of chunks in store"""
        try:
            return self.collection.count()
        except Exception as e:
            logger.error(f"Error getting count: {e}")
            return 0
    
    def delete_all(self):
        """Delete all chunks (for testing/reset)"""
        try:
            self.client.delete_collection("kb_chunks")
            self.collection = self.client.get_or_create_collection(
                name="kb_chunks",
                metadata={"hnsw:space": "cosine"}
            )
            logger.info("Vector store cleared")
        except Exception as e:
            logger.error(f"Error clearing vector store: {e}")


# Global instance
_vector_store = None


def get_vector_store() -> VectorStore:
    """Get or create vector store instance"""
    global _vector_store
    if _vector_store is None:
        _vector_store = VectorStore()
    return _vector_store

