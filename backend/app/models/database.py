"""
Database models using SQLAlchemy
"""
from sqlalchemy import create_engine, Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime
import uuid

Base = declarative_base()


class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, index=True, nullable=False)
    user_role = Column(String, nullable=False)
    message_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")
    tickets = relationship("Ticket", back_populates="conversation")


class Message(Base):
    __tablename__ = "messages"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.id"), nullable=False)
    role = Column(String, nullable=False)  # 'user' or 'assistant'
    content = Column(Text, nullable=False)
    confidence = Column(Float)
    tier = Column(String)
    severity = Column(String)
    kb_references = Column(JSON)  # List of KB reference IDs
    guardrail_blocked = Column(Boolean, default=False)
    guardrail_reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    conversation = relationship("Conversation", back_populates="messages")


class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String, ForeignKey("conversations.id"))
    session_id = Column(String, index=True, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    tier = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    status = Column(String, default="NEW")
    user_role = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    conversation = relationship("Conversation", back_populates="tickets")


class GuardrailEvent(Base):
    __tablename__ = "guardrail_events"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, index=True, nullable=False)
    blocked = Column(Boolean, nullable=False)
    reason = Column(String)
    message_content = Column(Text)
    user_role = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)


class KBChunk(Base):
    __tablename__ = "kb_chunks"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    kb_id = Column(String, index=True, nullable=False)  # Original KB article ID
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    chunk_index = Column(Integer, default=0)  # Index within the article
    category = Column(String)
    source = Column(String)
    extra_metadata = Column(JSON)  # Additional metadata (renamed from 'metadata' - reserved in SQLAlchemy)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Vector embedding will be stored separately in ChromaDB


# Database setup
def get_database_url():
    import os
    return os.getenv("DATABASE_URL", "sqlite:///./helpdesk.db")


def init_db():
    """Initialize database and create tables"""
    database_url = get_database_url()
    
    # SQLite-specific connection args (not needed for PostgreSQL)
    connect_args = {}
    if database_url.startswith("sqlite"):
        connect_args["check_same_thread"] = False
    
    engine = create_engine(database_url, connect_args=connect_args)
    Base.metadata.create_all(engine)
    return engine


def get_session_local(engine):
    """Create session factory"""
    return sessionmaker(autocommit=False, autoflush=False, bind=engine)

