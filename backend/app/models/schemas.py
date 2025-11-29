"""
Pydantic schemas for request/response models
"""
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum


class UserRole(str, Enum):
    TRAINEE = "trainee"
    OPERATOR = "operator"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"
    SUPPORT_ENGINEER = "support_engineer"


class Tier(str, Enum):
    TIER_1 = "TIER_1"
    TIER_2 = "TIER_2"
    TIER_3 = "TIER_3"


class Severity(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class TicketStatus(str, Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


# Request Models
class ChatRequest(BaseModel):
    sessionId: str = Field(..., description="Unique session identifier")
    message: str = Field(..., description="User message")
    userRole: str = Field(..., description="User role")
    context: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional context")


class TicketCreateRequest(BaseModel):
    sessionId: str
    subject: str
    description: str
    tier: Tier
    severity: Severity
    userRole: str


# Response Models
class KBReference(BaseModel):
    id: str
    title: str
    snippet: Optional[str] = None


class GuardrailResult(BaseModel):
    blocked: bool
    reason: Optional[str] = None


class ChatResponse(BaseModel):
    answer: str
    kbReferences: List[KBReference] = Field(default_factory=list)
    confidence: float = Field(..., ge=0.0, le=1.0)
    tier: Tier
    severity: Severity
    needsEscalation: bool
    guardrail: GuardrailResult
    ticketId: Optional[str] = None


class TicketResponse(BaseModel):
    id: str
    sessionId: str
    subject: str
    description: str
    tier: Tier
    severity: Severity
    status: TicketStatus
    userRole: str
    createdAt: datetime


class MetricsSummary(BaseModel):
    totalConversations: int
    totalTickets: int
    deflectionRate: float  # Percentage of issues solved without ticket
    ticketsByTier: Dict[str, int]
    ticketsBySeverity: Dict[str, int]
    guardrailActivations: int
    mostCommonIssues: List[Dict[str, Any]]
    escalationCount: int
    averageResponseTime: float  # in seconds


class MetricsTrends(BaseModel):
    date: str
    conversations: int
    tickets: int
    guardrailActivations: int
    escalations: int

