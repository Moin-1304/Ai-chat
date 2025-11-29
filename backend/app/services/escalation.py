"""
Escalation logic and ticket creation
"""
from typing import Dict, Any, Optional
from app.models.schemas import Tier, Severity, TicketStatus
from app.models.database import Ticket, get_session_local, init_db
from datetime import datetime
import uuid
import logging

logger = logging.getLogger(__name__)

# Initialize database
engine = init_db()
SessionLocal = get_session_local(engine)


def create_ticket(
    session_id: str,
    conversation_id: str,
    subject: str,
    description: str,
    tier: Tier,
    severity: Severity,
    user_role: str,
    db
) -> Ticket:
    """Create a support ticket"""
    try:
        ticket = Ticket(
            session_id=session_id,
            conversation_id=conversation_id,
            subject=subject,
            description=description,
            tier=tier.value,
            severity=severity.value,
            status=TicketStatus.NEW.value,
            user_role=user_role
        )
        db.add(ticket)
        db.commit()
        db.refresh(ticket)
        
        logger.info(f"Created ticket {ticket.id} for session {session_id}")
        return ticket
    except Exception as e:
        logger.error(f"Error creating ticket: {e}")
        db.rollback()
        raise


def should_escalate(
    tier: Tier,
    severity: Severity,
    kb_match_confidence: float,
    sentiment_score: float,
    unresolved_attempts: int,
    guardrail_blocked: bool
) -> bool:
    """Determine if escalation is needed"""
    # Always escalate if guardrail blocked
    if guardrail_blocked:
        return True
    
    # Always escalate for TIER_3
    if tier == Tier.TIER_3:
        return True
    
    # Escalate for critical severity
    if severity == Severity.CRITICAL:
        return True
    
    # Escalate if no KB match
    if kb_match_confidence < 0.5:
        return True
    
    # Escalate for high frustration
    if sentiment_score > 0.7:
        return True
    
    # Escalate after multiple unresolved attempts
    if unresolved_attempts >= 2:
        return True
    
    return False


def generate_ticket_subject(user_message: str, tier: Tier, severity: Severity) -> str:
    """Generate ticket subject from user message"""
    # Take first 50 characters of message
    subject = user_message[:50]
    if len(user_message) > 50:
        subject += "..."
    
    # Add tier/severity prefix if critical
    if severity == Severity.CRITICAL:
        subject = f"[CRITICAL] {subject}"
    elif tier == Tier.TIER_3:
        subject = f"[TIER_3] {subject}"
    
    return subject


def generate_ticket_description(
    user_message: str,
    conversation_history: list,
    kb_references: list
) -> str:
    """Generate ticket description from conversation"""
    description = f"User Issue: {user_message}\n\n"
    
    if conversation_history:
        description += "Conversation History:\n"
        for msg in conversation_history[-5:]:  # Last 5 messages
            role = msg.get('role', 'user')
            content = msg.get('content', '')
            description += f"{role.capitalize()}: {content}\n"
        description += "\n"
    
    if kb_references:
        description += "KB References Consulted:\n"
        for ref in kb_references:
            description += f"- {ref.get('title', 'Unknown')} (ID: {ref.get('id', 'N/A')})\n"
    
    return description

