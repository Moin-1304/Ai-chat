# Technical Implementation Plan - AI Help Desk Platform

## Overview
This document provides a detailed technical roadmap for implementing the AI Help Desk Platform from the current mock system to a production-ready RAG-based solution.

---

## Current State Analysis

### What Exists:
- ✅ React frontend with Material-UI
- ✅ Mock AI simulator (`aiSimulator.js`)
- ✅ Mock KB data (`mockKB.js`)
- ✅ UI components (Chat, Dashboard, Analytics)
- ✅ Role-based authentication
- ✅ Routing structure

### What's Missing:
- ❌ Real backend API
- ❌ RAG pipeline
- ❌ Vector database
- ❌ Guardrail engine
- ❌ Tier routing logic
- ❌ Real analytics tracking
- ❌ Deployment configuration

---

## Architecture Design

### High-Level Architecture

```
┌─────────────────┐
│   React Frontend │  (Vercel/Netlify)
│   (Vite + MUI)   │
└────────┬────────┘
         │ HTTPS
         │
┌────────▼─────────────────────────┐
│      Backend API (FastAPI)       │  (Cloud Run/Render)
│  ┌─────────────────────────────┐ │
│  │  API Layer                  │ │
│  │  - /api/chat                │ │
│  │  - /api/tickets             │ │
│  │  - /api/metrics             │ │
│  └──────────┬──────────────────┘ │
│             │                     │
│  ┌──────────▼──────────────────┐ │
│  │  Business Logic Layer        │ │
│  │  - RAG Service               │ │
│  │  - Guardrail Engine          │ │
│  │  - Tier Router               │ │
│  │  - Escalation Logic          │ │
│  └──────────┬──────────────────┘ │
│             │                     │
│  ┌──────────▼──────────────────┐ │
│  │  Data Layer                  │ │
│  │  - Vector DB (pgvector)      │ │
│  │  - Session Store (Postgres)  │ │
│  │  - Analytics DB              │ │
│  └──────────────────────────────┘ │
└───────────────────────────────────┘
         │
         │
┌────────▼────────┐
│   LLM Service   │  (OpenAI/Anthropic)
│   (External API)│
└─────────────────┘
```

---

## Phase 1: Backend Foundation (Days 1-3)

### 1.1 Project Setup

**Create backend directory structure:**
```bash
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate
```

**requirements.txt:**
```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pgvector==0.2.3
langchain==0.1.0
langchain-openai==0.0.2
openai==1.3.0
python-dotenv==1.0.0
python-multipart==0.0.6
```

**main.py (Entry Point):**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import chat, tickets, metrics

app = FastAPI(title="AI Help Desk API", version="1.0.0")

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api", tags=["chat"])
app.include_router(tickets.router, prefix="/api", tags=["tickets"])
app.include_router(metrics.router, prefix="/api", tags=["metrics"])

@app.get("/health")
async def health():
    return {"status": "healthy"}
```

### 1.2 Database Setup

**Database Models (models/database.py):**
```python
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import UUID
from pgvector.sqlalchemy import Vector
import uuid

Base = declarative_base()

class KBChunk(Base):
    __tablename__ = "kb_chunks"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    content = Column(Text, nullable=False)
    embedding = Column(Vector(1536))  # OpenAI embedding dimension
    title = Column(String(500))
    category = Column(String(100))
    metadata = Column(Text)  # JSON string
    created_at = Column(DateTime)

class Conversation(Base):
    __tablename__ = "conversations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(String(100), index=True)
    user_role = Column(String(50))
    message_count = Column(Integer, default=0)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID, ForeignKey("conversations.id"))
    role = Column(String(20))  # 'user' or 'assistant'
    content = Column(Text)
    timestamp = Column(DateTime)

class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID, ForeignKey("conversations.id"))
    tier = Column(String(20))
    severity = Column(String(20))
    status = Column(String(20))
    subject = Column(String(500))
    description = Column(Text)
    created_at = Column(DateTime)

class GuardrailEvent(Base):
    __tablename__ = "guardrail_events"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(String(100))
    blocked = Column(Boolean)
    reason = Column(String(500))
    timestamp = Column(DateTime)
```

---

## Phase 2: RAG Implementation (Days 4-7)

### 2.1 KB Ingestion Script

**scripts/ingest_kb.py:**
```python
import os
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from app.database.vector_store import VectorStore
from app.models.database import KBChunk

def ingest_kb_files(kb_directory):
    """
    Process KB files and store in vector database
    """
    # Load files
    files = []
    for file in os.listdir(kb_directory):
        if file.endswith(('.md', '.txt', '.json')):
            with open(os.path.join(kb_directory, file), 'r') as f:
                content = f.read()
                files.append({
                    'filename': file,
                    'content': content
                })
    
    # Split into chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    
    chunks = []
    for file in files:
        file_chunks = text_splitter.split_text(file['content'])
        for i, chunk in enumerate(file_chunks):
            chunks.append({
                'content': chunk,
                'title': file['filename'],
                'chunk_index': i
            })
    
    # Generate embeddings
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    
    # Store in vector DB
    vector_store = VectorStore()
    for chunk in chunks:
        embedding = embeddings.embed_query(chunk['content'])
        vector_store.store_chunk(
            content=chunk['content'],
            embedding=embedding,
            title=chunk['title'],
            metadata={'chunk_index': chunk['chunk_index']}
        )
```

### 2.2 Vector Store Service

**database/vector_store.py:**
```python
from sqlalchemy.orm import Session
from app.models.database import KBChunk
from pgvector.sqlalchemy import Vector
import numpy as np

class VectorStore:
    def __init__(self, db_session: Session):
        self.db = db_session
    
    def store_chunk(self, content: str, embedding: list, title: str, metadata: dict):
        chunk = KBChunk(
            content=content,
            embedding=embedding,
            title=title,
            metadata=str(metadata)
        )
        self.db.add(chunk)
        self.db.commit()
    
    def search(self, query_embedding: list, top_k: int = 5):
        """
        Search for similar chunks using cosine similarity
        """
        results = self.db.query(KBChunk).order_by(
            KBChunk.embedding.cosine_distance(query_embedding)
        ).limit(top_k).all()
        
        return [
            {
                'id': str(r.id),
                'content': r.content,
                'title': r.title,
                'metadata': r.metadata
            }
            for r in results
        ]
```

### 2.3 RAG Service

**services/rag_service.py:**
```python
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from app.database.vector_store import VectorStore
from app.database.session_store import SessionStore

class RAGService:
    def __init__(self, db_session):
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
        self.llm = ChatOpenAI(model="gpt-4", temperature=0)
        self.vector_store = VectorStore(db_session)
        self.session_store = SessionStore(db_session)
    
    def retrieve(self, query: str, top_k: int = 5):
        """Retrieve relevant KB chunks"""
        query_embedding = self.embeddings.embed_query(query)
        results = self.vector_store.search(query_embedding, top_k)
        return results
    
    def generate(self, query: str, session_id: str, user_role: str):
        """Generate answer using RAG"""
        # Retrieve relevant chunks
        kb_chunks = self.retrieve(query)
        
        # Get conversation history
        history = self.session_store.get_recent_messages(session_id, limit=5)
        
        # Build context
        context = "\n\n".join([
            f"KB Article: {chunk['title']}\n{chunk['content']}"
            for chunk in kb_chunks
        ])
        
        # Build prompt
        prompt = f"""You are a help desk assistant for PCTE (Persistent Cyber Training Environment).

IMPORTANT RULES:
1. ONLY use information from the Knowledge Base provided below
2. If the answer is not in the KB, say "This is not covered in the knowledge base"
3. NEVER make up commands, URLs, or procedures
4. Reference specific KB articles when possible

Knowledge Base Context:
{context}

Conversation History:
{self._format_history(history)}

User Question: {query}
User Role: {user_role}

Provide a helpful answer based ONLY on the KB context above:"""
        
        # Generate response
        response = self.llm.invoke(prompt)
        
        return {
            'answer': response.content,
            'kbReferences': [
                {'id': chunk['id'], 'title': chunk['title']}
                for chunk in kb_chunks
            ],
            'confidence': self._calculate_confidence(kb_chunks, query)
        }
    
    def _format_history(self, history):
        return "\n".join([
            f"{msg['role']}: {msg['content']}"
            for msg in history
        ])
    
    def _calculate_confidence(self, chunks, query):
        """Calculate confidence based on chunk relevance"""
        if not chunks:
            return 0.0
        # Simple heuristic: more chunks = higher confidence
        # In production, use similarity scores
        return min(0.5 + (len(chunks) * 0.1), 0.95)
```

---

## Phase 3: Guardrails & Tier Routing (Days 8-10)

### 3.1 Guardrail Engine

**services/guardrail.py:**
```python
import re
from typing import Dict, Tuple

class GuardrailEngine:
    BLOCKED_PATTERNS = [
        (r"access.*host.*machine", "Request for host machine access is not allowed"),
        (r"disable.*log", "Disabling logging is not permitted"),
        (r"reset.*all.*environment", "Bulk environment reset requires admin approval"),
        (r"/etc/hosts", "System file modification is not allowed"),
        (r"kernel.*panic", "Kernel-level debugging requires escalation"),
        (r"hypervisor.*setting", "Hypervisor access is restricted"),
        (r"override.*escalation", "Escalation cannot be overridden"),
    ]
    
    def check(self, message: str, user_role: str) -> Tuple[bool, str]:
        """
        Returns (blocked: bool, reason: str)
        """
        message_lower = message.lower()
        
        for pattern, reason in self.BLOCKED_PATTERNS:
            if re.search(pattern, message_lower, re.IGNORECASE):
                return True, reason
        
        # Role-based checks
        if user_role == "trainee":
            admin_keywords = ["admin", "administrator", "root", "sudo"]
            if any(kw in message_lower for kw in admin_keywords):
                return True, "Administrative actions require higher privileges"
        
        return False, None
```

### 3.2 Tier Router

**services/tier_routing.py:**
```python
class TierRouter:
    def classify(
        self,
        kb_confidence: float,
        sentiment_score: float,
        guardrail_triggered: bool,
        unresolved_attempts: int
    ) -> Dict[str, any]:
        """
        Classify issue into tier and severity
        """
        # Guardrail triggered = always TIER_3
        if guardrail_triggered:
            return {
                'tier': 'TIER_3',
                'severity': 'HIGH',
                'needsEscalation': True
            }
        
        # High confidence + low sentiment = TIER_1
        if kb_confidence > 0.9 and sentiment_score < 0.3:
            return {
                'tier': 'TIER_1',
                'severity': 'LOW',
                'needsEscalation': False
            }
        
        # Low confidence or high frustration = TIER_3
        if kb_confidence < 0.5 or sentiment_score > 0.7 or unresolved_attempts >= 3:
            return {
                'tier': 'TIER_3',
                'severity': 'HIGH' if sentiment_score > 0.7 else 'MEDIUM',
                'needsEscalation': True
            }
        
        # Default = TIER_2
        return {
            'tier': 'TIER_2',
            'severity': 'MEDIUM',
            'needsEscalation': unresolved_attempts >= 2
        }
```

---

## Phase 4: API Endpoints (Days 11-13)

### 4.1 Chat Endpoint

**api/chat.py:**
```python
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.rag_service import RAGService
from app.services.guardrail import GuardrailEngine
from app.services.tier_routing import TierRouter
from app.services.sentiment import SentimentAnalyzer

router = APIRouter()

class ChatRequest(BaseModel):
    sessionId: str
    message: str
    userRole: str
    context: dict = {}

class ChatResponse(BaseModel):
    answer: str
    kbReferences: list
    confidence: float
    tier: str
    severity: str
    needsEscalation: bool
    guardrail: dict

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Initialize services
    rag = RAGService(db_session)
    guardrail = GuardrailEngine()
    tier_router = TierRouter()
    sentiment = SentimentAnalyzer()
    
    # Check guardrails
    blocked, reason = guardrail.check(request.message, request.userRole)
    if blocked:
        return ChatResponse(
            answer=f"I cannot assist with this request. {reason}",
            kbReferences=[],
            confidence=0.0,
            tier="TIER_3",
            severity="HIGH",
            needsEscalation=True,
            guardrail={"blocked": True, "reason": reason}
        )
    
    # Get RAG response
    rag_result = rag.generate(
        query=request.message,
        session_id=request.sessionId,
        user_role=request.userRole
    )
    
    # Analyze sentiment
    sentiment_result = sentiment.analyze(request.message)
    
    # Classify tier
    tier_result = tier_router.classify(
        kb_confidence=rag_result['confidence'],
        sentiment_score=sentiment_result['score'],
        guardrail_triggered=False,
        unresolved_attempts=session_store.get_unresolved_count(request.sessionId)
    )
    
    # Store conversation
    session_store.add_message(
        session_id=request.sessionId,
        role='user',
        content=request.message
    )
    session_store.add_message(
        session_id=request.sessionId,
        role='assistant',
        content=rag_result['answer']
    )
    
    # Create ticket if needed
    ticket_id = None
    if tier_result['needsEscalation']:
        ticket_id = ticket_service.create_ticket(
            session_id=request.sessionId,
            tier=tier_result['tier'],
            severity=tier_result['severity']
        )
    
    return ChatResponse(
        answer=rag_result['answer'],
        kbReferences=rag_result['kbReferences'],
        confidence=rag_result['confidence'],
        tier=tier_result['tier'],
        severity=tier_result['severity'],
        needsEscalation=tier_result['needsEscalation'],
        guardrail={"blocked": False, "reason": None},
        ticketId=ticket_id
    )
```

---

## Phase 5: Frontend Integration (Days 14-16)

### 5.1 API Client

**src/utils/apiClient.js:**
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const chatAPI = {
  async sendMessage(sessionId, message, userRole, context = {}) {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        message,
        userRole,
        context,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Chat API error');
    }
    
    return response.json();
  },
};

export const ticketsAPI = {
  async getTickets() {
    const response = await fetch(`${API_BASE_URL}/api/tickets`);
    return response.json();
  },
};

export const metricsAPI = {
  async getSummary() {
    const response = await fetch(`${API_BASE_URL}/api/metrics/summary`);
    return response.json();
  },
};
```

### 5.2 Update AIChatPanel

Replace mock `generateResponse` calls with real API:

```javascript
// Before
import { generateResponse } from '../utils/aiSimulator';
const response = generateResponse(message, context);

// After
import { chatAPI } from '../utils/apiClient';
const response = await chatAPI.sendMessage(
  sessionId,
  message,
  user.role,
  { module: 'lab-7' }
);
```

---

## Phase 6: Deployment (Days 17-20)

### 6.1 Dockerfile

**backend/Dockerfile:**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 6.2 Environment Variables

**.env.example:**
```env
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://user:pass@host:5432/dbname
ENVIRONMENT=production
```

### 6.3 Deployment Scripts

**deploy.sh:**
```bash
# Backend to Cloud Run
gcloud run deploy ai-help-desk-api \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Frontend to Vercel
vercel --prod
```

---

## Testing Strategy

### Unit Tests (5+ required)
1. Guardrail pattern matching
2. Tier classification logic
3. RAG retrieval accuracy
4. Sentiment analysis
5. Escalation triggers

### E2E Tests (2+ required)
1. Happy path: User asks question → Gets KB answer
2. Guardrail: User asks unsafe question → Gets blocked

---

## Success Metrics

- ✅ All 12 workflows pass
- ✅ No hallucinations (KB-only answers)
- ✅ Guardrails block unsafe requests
- ✅ Analytics accurate
- ✅ Public URLs working
- ✅ Documentation complete

---

## Timeline Summary

- **Week 1-2:** Backend + RAG
- **Week 3:** Guardrails + Routing
- **Week 4:** Frontend Integration
- **Week 5:** Testing + Analytics
- **Week 6:** Deployment + Documentation

**Total: ~6 weeks for full implementation**

