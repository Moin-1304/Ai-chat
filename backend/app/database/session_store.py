"""
Session and conversation history management
"""
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.database import Conversation, Message, init_db
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Initialize database
engine = init_db()
from sqlalchemy.orm import sessionmaker
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """Dependency for getting database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_or_create_conversation(session_id: str, user_role: str, db: Session) -> Conversation:
    """Get existing conversation or create new one"""
    conversation = db.query(Conversation).filter(
        Conversation.session_id == session_id
    ).first()
    
    if not conversation:
        conversation = Conversation(
            session_id=session_id,
            user_role=user_role
        )
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
    
    return conversation


def add_message(
    conversation_id: str,
    role: str,
    content: str,
    confidence: Optional[float] = None,
    tier: Optional[str] = None,
    severity: Optional[str] = None,
    kb_references: Optional[List[str]] = None,
    guardrail_blocked: bool = False,
    guardrail_reason: Optional[str] = None,
    db: Session = None
) -> Message:
    """Add a message to conversation history"""
    if db is None:
        db = SessionLocal()
        should_close = True
    else:
        should_close = False
    
    try:
        message = Message(
            conversation_id=conversation_id,
            role=role,
            content=content,
            confidence=confidence,
            tier=tier,
            severity=severity,
            kb_references=kb_references or [],
            guardrail_blocked=guardrail_blocked,
            guardrail_reason=guardrail_reason
        )
        db.add(message)
        
        # Update conversation message count
        conversation = db.query(Conversation).filter(
            Conversation.id == conversation_id
        ).first()
        if conversation:
            conversation.message_count += 1
            conversation.updated_at = datetime.utcnow()
        
        db.commit()
        db.refresh(message)
        return message
    finally:
        if should_close:
            db.close()


def get_conversation_history(session_id: str, limit: int = 10, db: Session = None) -> List[Dict[str, str]]:
    """Get recent conversation history"""
    if db is None:
        db = SessionLocal()
        should_close = True
    else:
        should_close = False
    
    try:
        conversation = db.query(Conversation).filter(
            Conversation.session_id == session_id
        ).first()
        
        if not conversation:
            return []
        
        messages = db.query(Message).filter(
            Message.conversation_id == conversation.id
        ).order_by(Message.created_at.desc()).limit(limit).all()
        
        # Reverse to get chronological order
        messages.reverse()
        
        history = [
            {
                "role": msg.role,
                "content": msg.content
            }
            for msg in messages
        ]
        
        return history
    finally:
        if should_close:
            db.close()

