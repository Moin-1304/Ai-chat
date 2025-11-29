# Architecture Documentation

## Overview

The AI Help Desk Platform is a full-stack application with a React frontend and FastAPI backend, implementing a RAG (Retrieval-Augmented Generation) system for intelligent help desk support.

## High-Level Architecture

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
│  │  - SQLite (conversations)    │ │
│  │  - ChromaDB (vector store)   │ │
│  └──────────────────────────────┘ │
└────────────────────────────────────┘
```

## Components

### Frontend (React)

- **Components**: React components using Material-UI
- **State Management**: React Context API for authentication
- **API Client**: Centralized API client (`apiClient.js`)
- **Routing**: React Router for navigation

### Backend (FastAPI)

#### API Layer (`app/api/`)
- `chat.py`: Chat endpoint for user messages
- `tickets.py`: Ticket management endpoints
- `metrics.py`: Analytics and metrics endpoints

#### Business Logic Layer (`app/services/`)
- `rag_service.py`: RAG pipeline (retrieve + generate)
- `guardrail.py`: Safety checks and blocking
- `tier_routing.py`: Tier and severity classification
- `escalation.py`: Escalation logic and ticket creation
- `sentiment.py`: Sentiment analysis

#### Data Layer (`app/database/`)
- `vector_store.py`: ChromaDB vector database operations
- `session_store.py`: Conversation history management
- `database.py`: SQLAlchemy models and database setup

#### Utilities (`app/utils/`)
- `llm_client.py`: LLM abstraction (OpenAI)
- `embeddings.py`: Text embedding generation

## Data Flow

### Chat Request Flow

1. User sends message → Frontend
2. Frontend → POST `/api/chat`
3. Backend:
   - Check guardrails
   - Analyze sentiment
   - Retrieve KB chunks (RAG)
   - Generate answer (LLM)
   - Classify tier/severity
   - Create ticket if needed
   - Store conversation
4. Backend → Response with answer, references, tier, etc.
5. Frontend displays response

### RAG Pipeline

1. User query → Embedding generation
2. Vector search in ChromaDB
3. Retrieve top-k relevant chunks
4. Build context with chunks + conversation history
5. LLM generates grounded answer
6. Return answer + KB references

## Knowledge Base Structure

- **Storage**: ChromaDB vector database
- **Format**: Markdown or JSON files
- **Processing**: Chunked into 500-1000 character pieces
- **Embeddings**: Generated using sentence-transformers (all-MiniLM-L6-v2)

## Security & Guardrails

- Pattern-based blocking for unsafe requests
- Role-based access control
- No internet access from chatbot
- All responses grounded in KB only

## Deployment Architecture

### Frontend
- **Platform**: Vercel/Netlify
- **Build**: `npm run build`
- **Environment**: `VITE_API_URL` for backend URL

### Backend
- **Platform**: Cloud Run / Render / Railway
- **Container**: Docker
- **Database**: SQLite (POC) or PostgreSQL (production)
- **Vector DB**: ChromaDB (persistent storage)

## Future Adaptations

### No Internet Access
- Use self-hosted LLM (Llama, Mistral)
- Local embedding models (already implemented)
- No external API calls

### No External LLM
- Replace `llm_client.py` with local model wrapper
- Use transformers library for local inference
- CPU-only optimizations (quantized models)

### Offline Operation
- All components already support offline
- ChromaDB is local
- SQLite is local
- Embeddings are local

