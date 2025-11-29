#!/bin/bash
echo "🚀 Starting KB Ingestion..."
echo ""

# Activate virtual environment
source venv/bin/activate

# Run ingestion script
python scripts/ingest_kb.py

echo ""
echo "✅ KB Ingestion Complete!"
echo ""
echo "To verify, check ChromaDB:"
echo "  python -c \"import chromadb; client = chromadb.PersistentClient(path='./chroma_db'); print(f'Total chunks: {client.get_collection(\"kb_chunks\").count()}')\""
