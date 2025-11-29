"""
Initialize KB if not already ingested.
This script checks if KB chunks exist and ingests if needed.
Useful for Render deployments where KB might need to be re-ingested.
"""
import sys
import os
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database.vector_store import get_vector_store
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def check_and_ingest_kb():
    """Check if KB is ingested, and ingest if needed"""
    try:
        store = get_vector_store()
        count = store.get_count()
        
        if count == 0:
            logger.info("No KB chunks found. Starting ingestion...")
            
            # Check if KB directory exists
            kb_dir = os.getenv("KB_DIR", "./knowledge_base/raw")
            if not os.path.exists(kb_dir):
                logger.warning(f"KB directory not found: {kb_dir}. Skipping ingestion.")
                return False
            
            # Run ingestion script
            ingestion_script = Path(__file__).parent / "ingest_kb_without_embeddings.py"
            if not ingestion_script.exists():
                logger.warning(f"Ingestion script not found: {ingestion_script}")
                return False
            
            import subprocess
            result = subprocess.run(
                [sys.executable, str(ingestion_script)],
                capture_output=True,
                text=True
            )
            
            if result.returncode == 0:
                logger.info("KB ingestion completed successfully")
                # Verify ingestion
                new_count = store.get_count()
                logger.info(f"KB now contains {new_count} chunks")
                return True
            else:
                logger.error(f"KB ingestion failed: {result.stderr}")
                return False
        else:
            logger.info(f"KB already ingested with {count} chunks. Skipping ingestion.")
            return True
            
    except Exception as e:
        logger.error(f"Error checking/ingesting KB: {e}", exc_info=True)
        return False


if __name__ == "__main__":
    success = check_and_ingest_kb()
    # Don't fail startup if KB ingestion fails - log warning but continue
    if not success:
        logger.warning("KB initialization failed or skipped, but continuing startup...")
        logger.warning("You can manually ingest KB later or check logs for errors.")
    # Always exit with 0 to allow service to start
    # KB ingestion can be done manually if needed
    sys.exit(0)

