"""
Add mock KB chunks directly to vector store for testing
This bypasses embedding generation for quick testing
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

sys.path.insert(0, str(Path(__file__).parent.parent))

from app.database.vector_store import get_vector_store
from app.models.database import init_db, KBChunk, get_session_local
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def add_mock_chunks():
    """Add mock KB chunks with simple embeddings for testing"""
    
    # Initialize database
    engine = init_db()
    SessionLocal = get_session_local(engine)
    db = SessionLocal()
    
    try:
        vector_store = get_vector_store()
        
        # Mock KB chunks about login redirection
        mock_chunks = [
            {
                "id": "kb-login-001-chunk-0",
                "kb_id": "KB-LOGIN-001",
                "title": "Login Redirection Troubleshooting",
                "content": """Login Redirection Troubleshooting Guide

Common Causes:
1. Browser Cache Issues - Stale cookies or cached authentication data
2. Session Timeout - Session expired before login completed
3. SSO Configuration - Single Sign-On misconfiguration
4. Time Synchronization - System clock out of sync

Step 1: Clear Browser Cache and Cookies
1. Open browser settings
2. Navigate to Privacy/Clear browsing data
3. Select "Cookies and cached images"
4. Clear data for the last hour
5. Restart browser and try logging in again

Step 2: Check Session Status
1. Verify you're using the correct login URL
2. Check if session timeout occurred
3. Try logging in from an incognito/private window
4. Verify your account is not locked""",
                "category": "Authentication",
                "source": "MKDocs",
                "chunk_index": 0
            },
            {
                "id": "kb-login-001-chunk-1",
                "kb_id": "KB-LOGIN-001",
                "title": "Login Redirection - SSO and Time Sync",
                "content": """Step 3: Verify SSO Configuration
1. Access SSO portal at sso.pcte.mil
2. Verify SSO session is active
3. Check trusted device settings
4. Clear SSO cookies if needed

Step 4: Check Time Synchronization
1. Verify system clock is correct
2. Check timezone settings
3. Sync time with NTP server if needed
4. Time drift can cause authentication failures

Step 5: Verify Account Status
1. Check account is active (not locked)
2. Verify password hasn't expired
3. Check MFA device is properly configured
4. Contact administrator if account shows as inactive""",
                "category": "Authentication",
                "source": "MKDocs",
                "chunk_index": 1
            }
        ]
        
        # Create simple mock embeddings (just random vectors for testing)
        # In production, these would be real embeddings
        import random
        mock_embeddings = []
        for chunk in mock_chunks:
            # Create a simple 1536-dim vector (OpenAI embedding size)
            # For testing, we'll use a simple pattern based on content
            embedding = [random.random() * 0.1 for _ in range(1536)]
            mock_embeddings.append(embedding)
        
        # Add to vector store
        vector_store.add_chunks(mock_chunks, mock_embeddings)
        
        # Add to database
        for chunk in mock_chunks:
            kb_chunk = KBChunk(
                id=chunk["id"],
                kb_id=chunk["kb_id"],
                title=chunk["title"],
                content=chunk["content"],
                chunk_index=chunk["chunk_index"],
                category=chunk["category"],
                source=chunk["source"],
                extra_metadata={}
            )
            db.add(kb_chunk)
        
        db.commit()
        
        logger.info(f"Added {len(mock_chunks)} mock chunks to vector store")
        logger.info(f"Total chunks: {vector_store.get_count()}")
        
    finally:
        db.close()


if __name__ == "__main__":
    add_mock_chunks()

