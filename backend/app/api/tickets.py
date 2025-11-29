"""
Tickets API endpoints
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.schemas import TicketResponse, TicketStatus
from app.models.database import Ticket
from app.database.session_store import get_db
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/api/tickets", response_model=List[TicketResponse])
async def get_tickets(
    session_id: str = None,
    status: str = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """Get tickets, optionally filtered by session_id or status"""
    try:
        query = db.query(Ticket)
        
        if session_id:
            query = query.filter(Ticket.session_id == session_id)
        
        if status:
            query = query.filter(Ticket.status == status.upper())
        
        tickets = query.order_by(Ticket.created_at.desc()).limit(limit).all()
        
        return [
            TicketResponse(
                id=ticket.id,
                sessionId=ticket.session_id,
                subject=ticket.subject,
                description=ticket.description,
                tier=ticket.tier,
                severity=ticket.severity,
                status=ticket.status,
                userRole=ticket.user_role,
                createdAt=ticket.created_at
            )
            for ticket in tickets
        ]
    except Exception as e:
        logger.error(f"Error getting tickets: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/tickets/{ticket_id}", response_model=TicketResponse)
async def get_ticket(ticket_id: str, db: Session = Depends(get_db)):
    """Get a specific ticket by ID"""
    try:
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")
        
        return TicketResponse(
            id=ticket.id,
            sessionId=ticket.session_id,
            subject=ticket.subject,
            description=ticket.description,
            tier=ticket.tier,
            severity=ticket.severity,
            status=ticket.status,
            userRole=ticket.user_role,
            createdAt=ticket.created_at
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting ticket: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.patch("/api/tickets/{ticket_id}")
async def update_ticket_status(
    ticket_id: str,
    status: str,
    db: Session = Depends(get_db)
):
    """Update ticket status"""
    try:
        ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
        if not ticket:
            raise HTTPException(status_code=404, detail="Ticket not found")
        
        # Validate status
        try:
            TicketStatus(status.upper())
        except ValueError:
            raise HTTPException(status_code=400, detail=f"Invalid status: {status}")
        
        ticket.status = status.upper()
        db.commit()
        db.refresh(ticket)
        
        return {"message": "Ticket status updated", "ticket_id": ticket.id, "status": ticket.status}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating ticket: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

