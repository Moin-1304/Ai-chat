# AI Help Desk Backend

Full-stack AI Help Desk Platform backend implementation using FastAPI, RAG, and vector databases.

## Features

- ✅ RAG (Retrieval-Augmented Generation) pipeline
- ✅ Vector database for KB storage (ChromaDB)
- ✅ Guardrail engine for safety
- ✅ Tier routing and escalation logic
- ✅ Conversation history management
- ✅ Analytics and metrics
- ✅ RESTful API endpoints

## Quick Start

### 1. Install Dependencies

```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

**Note:** On macOS/Linux, use `python3` instead of `python`. If `python` command is not found, check with `which python3`.

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your OpenAI API key
```

### 3. Initialize Database

```bash
python3 -c "from app.models.database import init_db; init_db()"
```

Or if you have activated the virtual environment:
```bash
python -c "from app.models.database import init_db; init_db()"
```

### 4. Ingest Knowledge Base

```bash
# Place KB files in knowledge_base/raw/
python3 scripts/ingest_kb.py
```

Or if you have activated the virtual environment:
```bash
python scripts/ingest_kb.py
```

### 5. Run Server

```bash
uvicorn app.main:app --reload --port 8000
```

Visit `http://localhost:8000/docs` for API documentation.

## Project Structure

```
backend/
├── app/
│   ├── api/              # API endpoints
│   ├── services/         # Business logic
│   ├── models/           # Data models
│   ├── database/         # Database operations
│   └── utils/            # Utilities
├── knowledge_base/       # KB files
├── scripts/              # Utility scripts
├── tests/                # Tests
└── requirements.txt      # Dependencies
```

## API Endpoints

- `POST /api/chat` - Chat endpoint
- `GET /api/tickets` - List tickets
- `GET /api/tickets/{id}` - Get ticket
- `GET /api/metrics/summary` - Metrics summary
- `GET /api/metrics/trends` - Metrics trends

See [API.md](API.md) for detailed documentation.

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [API.md](API.md) - API documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [TESTING.md](TESTING.md) - Testing guide
- [KB_STRUCTURE.md](KB_STRUCTURE.md) - Knowledge base structure

## Development

### Running Tests

```bash
pytest
```

### Code Quality

```bash
# Format code
black app/

# Lint
flake8 app/
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Docker

```bash
docker build -t ai-helpdesk-backend .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_key ai-helpdesk-backend
```

### Cloud Platforms

- Google Cloud Run
- Render
- Railway
- AWS Lambda

## Environment Variables

See `.env.example` for all available environment variables.

## License

Internal use only.

