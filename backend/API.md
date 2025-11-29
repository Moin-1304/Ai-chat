# API Documentation

## Base URL

```
http://localhost:8000  (development)
https://your-backend-url.com  (production)
```

## Endpoints

### POST /api/chat

Main chat endpoint for user messages.

**Request:**
```json
{
  "sessionId": "session-123",
  "message": "I keep getting redirected to the login page after I log in.",
  "userRole": "trainee",
  "context": {
    "module": "lab-7",
    "channel": "self-service-portal"
  }
}
```

**Response:**
```json
{
  "answer": "Here are the steps to resolve the login redirection issue...",
  "kbReferences": [
    {
      "id": "kb-auth-loop",
      "title": "Login Redirection Troubleshooting",
      "snippet": "If you're experiencing login redirection..."
    }
  ],
  "confidence": 0.93,
  "tier": "TIER_2",
  "severity": "MEDIUM",
  "needsEscalation": false,
  "guardrail": {
    "blocked": false,
    "reason": null
  },
  "ticketId": null
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request format
- `500 Internal Server Error`: Server error

---

### GET /api/tickets

Get list of tickets.

**Query Parameters:**
- `session_id` (optional): Filter by session ID
- `status` (optional): Filter by status (NEW, IN_PROGRESS, RESOLVED, CLOSED)
- `limit` (optional, default: 50): Maximum number of tickets

**Response:**
```json
[
  {
    "id": "ticket-123",
    "sessionId": "session-123",
    "subject": "Login redirection issue",
    "description": "User experiencing login loop...",
    "tier": "TIER_2",
    "severity": "MEDIUM",
    "status": "NEW",
    "userRole": "trainee",
    "createdAt": "2025-01-15T10:30:00Z"
  }
]
```

---

### GET /api/tickets/{ticket_id}

Get a specific ticket by ID.

**Response:**
```json
{
  "id": "ticket-123",
  "sessionId": "session-123",
  "subject": "Login redirection issue",
  "description": "User experiencing login loop...",
  "tier": "TIER_2",
  "severity": "MEDIUM",
  "status": "NEW",
  "userRole": "trainee",
  "createdAt": "2025-01-15T10:30:00Z"
}
```

**Error Responses:**
- `404 Not Found`: Ticket not found

---

### PATCH /api/tickets/{ticket_id}

Update ticket status.

**Request:**
```json
{
  "status": "IN_PROGRESS"
}
```

**Response:**
```json
{
  "message": "Ticket status updated",
  "ticket_id": "ticket-123",
  "status": "IN_PROGRESS"
}
```

---

### GET /api/metrics/summary

Get summary metrics.

**Response:**
```json
{
  "totalConversations": 150,
  "totalTickets": 45,
  "deflectionRate": 70.0,
  "ticketsByTier": {
    "TIER_1": 10,
    "TIER_2": 20,
    "TIER_3": 15
  },
  "ticketsBySeverity": {
    "LOW": 15,
    "MEDIUM": 20,
    "HIGH": 8,
    "CRITICAL": 2
  },
  "guardrailActivations": 5,
  "mostCommonIssues": [
    {
      "issue": "Login redirection issue",
      "count": 12
    }
  ],
  "escalationCount": 15,
  "averageResponseTime": 2.5
}
```

---

### GET /api/metrics/trends

Get metrics trends over time.

**Query Parameters:**
- `days` (optional, default: 7): Number of days to include

**Response:**
```json
[
  {
    "date": "2025-01-15",
    "conversations": 25,
    "tickets": 8,
    "guardrailActivations": 1,
    "escalations": 3
  }
]
```

---

## Data Models

### Tier
- `TIER_1`: Simple questions, high KB confidence
- `TIER_2`: Complex issues, medium confidence
- `TIER_3`: Critical issues, low confidence, needs escalation

### Severity
- `LOW`: Minor issues
- `MEDIUM`: Moderate issues
- `HIGH`: Significant issues
- `CRITICAL`: Urgent issues

### Ticket Status
- `NEW`: Newly created
- `IN_PROGRESS`: Being worked on
- `RESOLVED`: Issue resolved
- `CLOSED`: Ticket closed

## Error Handling

All endpoints return standard HTTP status codes:
- `200 OK`: Success
- `400 Bad Request`: Invalid request
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "detail": "Error message description"
}
```

