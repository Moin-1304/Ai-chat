"""
Metrics API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from datetime import datetime, timedelta
from typing import List, Dict, Any
from app.models.schemas import MetricsSummary, MetricsTrends
from app.models.database import Conversation, Ticket, GuardrailEvent, Message
from app.database.session_store import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/api/metrics/summary", response_model=MetricsSummary)
async def get_metrics_summary(db: Session = Depends(get_db)):
    """Get summary metrics"""
    try:
        # Total conversations
        total_conversations = db.query(Conversation).count()
        
        # Total tickets
        total_tickets = db.query(Ticket).count()
        
        # Tickets by tier
        tickets_by_tier = {}
        for tier in ["TIER_1", "TIER_2", "TIER_3"]:
            count = db.query(Ticket).filter(Ticket.tier == tier).count()
            tickets_by_tier[tier] = count
        
        # Tickets by severity
        tickets_by_severity = {}
        for severity in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]:
            count = db.query(Ticket).filter(Ticket.severity == severity).count()
            tickets_by_severity[severity] = count
        
        # Guardrail activations
        guardrail_activations = db.query(GuardrailEvent).filter(
            GuardrailEvent.blocked == True
        ).count()
        
        # Escalation count (TIER_3 tickets)
        escalation_count = tickets_by_tier.get("TIER_3", 0)
        
        # Deflection rate (conversations without tickets)
        conversations_with_tickets = db.query(func.count(func.distinct(Ticket.session_id))).scalar()
        deflection_rate = 0.0
        if total_conversations > 0:
            deflection_rate = ((total_conversations - conversations_with_tickets) / total_conversations) * 100
        
        # Most common issues (from ticket subjects)
        # This is a simplified version - in production, you'd use NLP to categorize
        most_common_issues = []
        issue_counts = db.query(
            Ticket.subject,
            func.count(Ticket.id).label('count')
        ).group_by(Ticket.subject).order_by(func.count(Ticket.id).desc()).limit(5).all()
        
        for subject, count in issue_counts:
            most_common_issues.append({
                "issue": subject[:50],  # Truncate
                "count": count
            })
        
        # Average response time (simplified - using message timestamps)
        # In production, track actual API response times
        avg_response_time = 2.5  # Placeholder - would calculate from actual metrics
        
        return MetricsSummary(
            totalConversations=total_conversations,
            totalTickets=total_tickets,
            deflectionRate=round(deflection_rate, 2),
            ticketsByTier=tickets_by_tier,
            ticketsBySeverity=tickets_by_severity,
            guardrailActivations=guardrail_activations,
            mostCommonIssues=most_common_issues,
            escalationCount=escalation_count,
            averageResponseTime=avg_response_time
        )
    except Exception as e:
        logger.error(f"Error getting metrics summary: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/metrics/trends", response_model=List[MetricsTrends])
async def get_metrics_trends(
    days: int = 7,
    db: Session = Depends(get_db)
):
    """Get metrics trends over time"""
    try:
        trends = []
        end_date = datetime.utcnow()
        start_date = end_date - timedelta(days=days)
        
        # Group by date
        current_date = start_date
        while current_date <= end_date:
            date_str = current_date.strftime("%Y-%m-%d")
            next_date = current_date + timedelta(days=1)
            
            # Conversations on this date
            conversations = db.query(Conversation).filter(
                and_(
                    Conversation.created_at >= current_date,
                    Conversation.created_at < next_date
                )
            ).count()
            
            # Tickets on this date
            tickets = db.query(Ticket).filter(
                and_(
                    Ticket.created_at >= current_date,
                    Ticket.created_at < next_date
                )
            ).count()
            
            # Guardrail activations on this date
            guardrail_activations = db.query(GuardrailEvent).filter(
                and_(
                    GuardrailEvent.created_at >= current_date,
                    GuardrailEvent.created_at < next_date,
                    GuardrailEvent.blocked == True
                )
            ).count()
            
            # Escalations (TIER_3 tickets) on this date
            escalations = db.query(Ticket).filter(
                and_(
                    Ticket.created_at >= current_date,
                    Ticket.created_at < next_date,
                    Ticket.tier == "TIER_3"
                )
            ).count()
            
            trends.append(MetricsTrends(
                date=date_str,
                conversations=conversations,
                tickets=tickets,
                guardrailActivations=guardrail_activations,
                escalations=escalations
            ))
            
            current_date = next_date
        
        return trends
    except Exception as e:
        logger.error(f"Error getting metrics trends: {e}")
        raise HTTPException(status_code=500, detail=str(e))

