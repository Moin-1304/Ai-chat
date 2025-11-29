# Testing Guide

## Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_guardrail.py
```

## Test Structure

```
tests/
├── test_guardrail.py      # Guardrail tests
├── test_tier_routing.py   # Tier classification tests
├── test_rag_service.py    # RAG pipeline tests
├── test_api_chat.py       # Chat API tests
└── test_e2e.py            # End-to-end tests
```

## Unit Tests

### Guardrail Tests

Test that unsafe requests are blocked:

```python
def test_block_host_access():
    blocked, reason = check_guardrail(
        "How do I access the host machine?", 
        "trainee"
    )
    assert blocked == True
    assert "host machine" in reason.lower()
```

### Tier Routing Tests

Test tier classification logic:

```python
def test_tier_classification():
    tier, severity, escalation = classify_tier_and_severity(
        query="My lab crashed",
        kb_match_confidence=0.3,
        sentiment_score=0.8,
        has_kb_match=False
    )
    assert tier == Tier.TIER_3
    assert severity == Severity.CRITICAL
    assert escalation == True
```

### RAG Service Tests

Test RAG retrieval and generation:

```python
def test_rag_retrieval():
    rag_service = get_rag_service()
    chunks = rag_service.retrieve("login issue", top_k=3)
    assert len(chunks) > 0
    assert "id" in chunks[0]
    assert "content" in chunks[0]
```

## Integration Tests

### Chat API Test

Test full chat flow:

```python
def test_chat_endpoint():
    response = client.post("/api/chat", json={
        "sessionId": "test-123",
        "message": "I can't log in",
        "userRole": "trainee",
        "context": {}
    })
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
    assert "tier" in data
    assert "confidence" in data
```

## End-to-End Tests

### Happy Path Workflow

1. User sends message about login issue
2. System retrieves relevant KB chunks
3. System generates answer
4. System classifies as TIER_1
5. No escalation needed

### Guardrail Workflow

1. User requests host machine access
2. Guardrail blocks request
3. System creates high-severity ticket
4. System returns blocked message

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All API endpoints
- **E2E Tests**: 2+ critical workflows

## Manual Testing Checklist

### Core Workflows (from requirements)

- [ ] Authentication loop failure
- [ ] Lab VM crash
- [ ] Incorrect environment assignment
- [ ] Container initialization failure
- [ ] Unauthorized system access (guardrail)
- [ ] Disable logging attempt (guardrail)
- [ ] Conflicting KB documents
- [ ] Time drift causing auth failure
- [ ] DNS resolution error
- [ ] Destructive action request (guardrail)
- [ ] Kernel panic in VM
- [ ] Override escalation attempt (guardrail)

### API Endpoints

- [ ] POST /api/chat - normal flow
- [ ] POST /api/chat - guardrail blocking
- [ ] POST /api/chat - escalation
- [ ] GET /api/tickets
- [ ] GET /api/tickets/{id}
- [ ] PATCH /api/tickets/{id}
- [ ] GET /api/metrics/summary
- [ ] GET /api/metrics/trends

### Edge Cases

- [ ] Empty message
- [ ] Very long message
- [ ] Special characters
- [ ] No KB matches
- [ ] Multiple rapid requests
- [ ] Invalid session ID

