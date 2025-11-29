# Quick Start Guide

## Setup Complete! ✅

Your virtual environment is created and dependencies are installed.

## Next Steps

### 1. Create Environment File

```bash
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-key-here
USE_OPENAI_EMBEDDINGS=true  # Required for Python 3.13
```

### 2. Initialize Database

```bash
source venv/bin/activate
python -c "from app.models.database import init_db; init_db()"
```

### 3. Ingest Knowledge Base

First, copy some KB files to `knowledge_base/raw/`:

```bash
# Copy example KB from frontend
cp ../dsai-help-desk-main/docs/kb-examples/*.md knowledge_base/raw/ 2>/dev/null || true
```

Then ingest:
```bash
python scripts/ingest_kb.py
```

### 4. Run the Backend

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

### 5. Update Frontend

In the frontend directory, create/update `.env`:
```env
VITE_API_URL=http://localhost:8000
```

Then run the frontend:
```bash
cd ../dsai-help-desk-main
npm install
npm run dev
```

## Testing the API

You can test the chat endpoint:

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "test-123",
    "message": "How do I reset my password?",
    "userRole": "trainee",
    "context": {}
  }'
```

## Troubleshooting

### Python 3.13 Compatibility

Since you're using Python 3.13.5, we're using OpenAI embeddings instead of sentence-transformers (which doesn't support Python 3.13 yet). This is configured via `USE_OPENAI_EMBEDDINGS=true` in `.env`.

### If you get import errors

Make sure the virtual environment is activated:
```bash
source venv/bin/activate
```

### If KB ingestion fails

Make sure you have KB files in `knowledge_base/raw/` directory. You can use the example files from the frontend docs.

## Need Help?

Check the full documentation:
- [README.md](README.md) - Overview
- [API.md](API.md) - API documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

