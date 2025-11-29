"""
Embedding generation utilities
"""
import os
from typing import List
from dotenv import load_dotenv
import logging

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """Generate embeddings for text"""
    
    def __init__(self):
        # Try to use sentence-transformers, fallback to OpenAI if not available
        model_name = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
        self.use_openai = os.getenv("USE_OPENAI_EMBEDDINGS", "false").lower() == "true"
        
        if self.use_openai:
            # Use OpenAI embeddings
            from app.utils.llm_client import get_llm_client
            try:
                self.openai_client = get_llm_client()
                logger.info("Using OpenAI embeddings")
            except Exception as e:
                logger.error(f"Failed to initialize OpenAI embeddings: {e}")
                raise
            self.model = None
        else:
            # Try to use sentence-transformers
            try:
                from sentence_transformers import SentenceTransformer
                self.model = SentenceTransformer(model_name)
                logger.info(f"Loaded embedding model: {model_name}")
            except ImportError:
                logger.warning("sentence-transformers not available, falling back to OpenAI embeddings")
                self.use_openai = True
                from app.utils.llm_client import get_llm_client
                try:
                    self.openai_client = get_llm_client()
                    logger.info("Using OpenAI embeddings as fallback")
                except Exception as e:
                    logger.error(f"Failed to initialize OpenAI embeddings: {e}")
                    raise
            except Exception as e:
                logger.error(f"Failed to load embedding model: {e}")
                # Fallback to OpenAI
                self.use_openai = True
                from app.utils.llm_client import get_llm_client
                try:
                    self.openai_client = get_llm_client()
                    logger.info("Using OpenAI embeddings as fallback")
                except Exception as e2:
                    logger.error(f"Failed to initialize OpenAI embeddings: {e2}")
                    raise
    
    def generate(self, text: str) -> List[float]:
        """Generate embedding for a single text"""
        if not text or not text.strip():
            return [0.0] * 1536  # OpenAI embedding dimension
        
        if self.use_openai:
            # Use OpenAI embeddings
            try:
                response = self.openai_client.client.embeddings.create(
                    model="text-embedding-3-small",
                    input=text
                )
                return response.data[0].embedding
            except Exception as e:
                logger.error(f"OpenAI embedding error: {e}")
                raise
        else:
            # Use sentence-transformers
            embedding = self.model.encode(text, normalize_embeddings=True)
            return embedding.tolist()
    
    def generate_batch(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts"""
        if not texts:
            return []
        
        # Filter out empty texts
        valid_texts = [t if t and t.strip() else " " for t in texts]
        
        if self.use_openai:
            # Use OpenAI embeddings
            try:
                response = self.openai_client.client.embeddings.create(
                    model="text-embedding-3-small",
                    input=valid_texts
                )
                return [item.embedding for item in response.data]
            except Exception as e:
                logger.error(f"OpenAI embedding error: {e}")
                raise
        else:
            # Use sentence-transformers
            embeddings = self.model.encode(valid_texts, normalize_embeddings=True)
            return embeddings.tolist()


# Global instance
_embedding_generator = None


def get_embedding_generator() -> EmbeddingGenerator:
    """Get or create embedding generator instance"""
    global _embedding_generator
    if _embedding_generator is None:
        _embedding_generator = EmbeddingGenerator()
    return _embedding_generator

