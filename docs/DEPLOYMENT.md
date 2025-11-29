# Deployment Guide

## Prerequisites

- Python 3.11+
- Docker (for containerized deployment)
- OpenAI API key (or other LLM provider)
- Git

## Local Development Setup

### 1. Clone and Setup

```bash
cd backend
python3 -m venv venv  # Use python3 on macOS/Linux
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
OPENAI_TEMPERATURE=0.3
LLM_PROVIDER=openai
DATABASE_URL=sqlite:///./helpdesk.db
VECTOR_DB_PATH=./chroma_db
EMBEDDING_MODEL=all-MiniLM-L6-v2
KB_DIR=./knowledge_base/raw
```

### 3. Initialize Database

```bash
# Database tables will be created automatically on first run
python -c "from app.models.database import init_db; init_db()"
```

### 4. Ingest Knowledge Base

```bash
# Place KB files in knowledge_base/raw/ (markdown or JSON)
python scripts/ingest_kb.py
```

```bash
# Place KB files in knowledge_base/raw/ 
python scripts/ingest_kb_without_embeddings.py
```

### 5. Run Backend

```bash
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`

## Docker Deployment

### 1. Build Docker Image

```bash
cd backend
docker build -t ai-helpdesk-backend .
```

### 2. Run Container

```bash
docker run -d \
  -p 8000:8000 \
  -e OPENAI_API_KEY=your_key \
  -e DATABASE_URL=sqlite:///./helpdesk.db \
  -v $(pwd)/chroma_db:/app/chroma_db \
  -v $(pwd)/helpdesk.db:/app/helpdesk.db \
  --name helpdesk-backend \
  ai-helpdesk-backend
```

## Cloud Deployment

### Google Cloud Run

1. **Build and push image:**
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/helpdesk-backend
```

2. **Deploy:**
```bash
gcloud run deploy helpdesk-backend \
  --image gcr.io/PROJECT_ID/helpdesk-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars OPENAI_API_KEY=your_key
```

3. **Set environment variables in Cloud Run console:**
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `DATABASE_URL` (use Cloud SQL for production)
   - `VECTOR_DB_PATH`

### Render

**📘 For detailed Render deployment instructions, see [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)**

Quick start:
1. **Connect GitHub repository**
2. **Create new Web Service**
3. **Configure:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python scripts/init_kb_if_needed.py && uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. **Add Environment Variables:**
   - `OPENAI_API_KEY` (required)
   - `DATABASE_URL` (use PostgreSQL Internal URL from Render)
   - `VECTOR_DB_PATH=/tmp/chroma_db` (or use Render Disk for persistence)
   - `OPENAI_MODEL`, `OPENAI_TEMPERATURE`, etc.

**Important**: Use PostgreSQL (not SQLite) on Render. Create a PostgreSQL service first and use its Internal Database URL.

### Railway

1. **Connect GitHub repository**
2. **Railway will auto-detect Python**
3. **Add environment variables**
4. **Deploy**

## Frontend Deployment

### Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd dsai-help-desk-main
vercel
```

3. **Set Environment Variable:**
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-backend.run.app`)

### Netlify

1. **Connect GitHub repository**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Environment variables:**
   - `VITE_API_URL`: Your backend URL

## Production Considerations

### Database

For production, use PostgreSQL instead of SQLite:

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname
```

Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

### Vector Database

For production, consider:
- **Qdrant**: Cloud-hosted vector database
- **Pinecone**: Managed vector database
- **PostgreSQL + pgvector**: Self-hosted option

### Security

1. **CORS**: Update `ALLOWED_ORIGINS` in `main.py` to specific frontend URLs
2. **API Keys**: Never commit `.env` files
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Add rate limiting middleware
5. **Authentication**: Add API authentication if needed

### Monitoring

- Add logging to CloudWatch / Datadog
- Set up health check endpoints
- Monitor API response times
- Track error rates

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key (required) | - |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4-turbo-preview` |
| `OPENAI_TEMPERATURE` | LLM temperature | `0.3` |
| `LLM_PROVIDER` | LLM provider | `openai` |
| `DATABASE_URL` | Database connection string | `sqlite:///./helpdesk.db` |
| `VECTOR_DB_PATH` | ChromaDB storage path | `./chroma_db` |
| `EMBEDDING_MODEL` | Embedding model name | `all-MiniLM-L6-v2` |
| `KB_DIR` | Knowledge base directory | `./knowledge_base/raw` |

## Troubleshooting

### Backend won't start
- Check Python version (3.11+)
- Verify all dependencies installed
- Check environment variables

### KB ingestion fails
- Verify KB files are in correct directory
- Check file formats (markdown or JSON)
- Ensure write permissions

### API returns errors
- Check OpenAI API key is valid
- Verify database is initialized
- Check logs for detailed error messages

### Frontend can't connect
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Ensure backend is running and accessible

