"""
Tier routing and severity classification
"""
from typing import Dict, Any, Tuple, Optional
from app.models.schemas import Tier, Severity
import logging

logger = logging.getLogger(__name__)


# Critical keywords that indicate high severity
CRITICAL_KEYWORDS = [
    "crash", "crashed", "panic", "frozen", "froze", "lost work", "lost progress",
    "kernel panic", "system down", "cannot access", "completely broken",
    "urgent", "emergency", "asap", "immediately"
]

# Medium severity keywords
MEDIUM_KEYWORDS = [
    "not working", "issue", "problem", "error", "failed", "failure",
    "slow", "lag", "timeout", "redirect", "redirected"
]

# Low severity keywords
LOW_KEYWORDS = [
    "question", "how to", "guide", "tutorial", "help with", "explain",
    "information", "documentation"
]


def classify_tier_and_severity(
    query: str,
    kb_match_confidence: float,
    sentiment_score: float = 0.0,
    has_kb_match: bool = True,
    unresolved_attempts: int = 0
) -> Tuple[Tier, Severity, bool]:
    """
    Classify tier, severity, and escalation need
    
    Returns:
        (tier: Tier, severity: Severity, needs_escalation: bool)
    """
    query_lower = query.lower()
    
    # Determine severity first
    severity = Severity.LOW
    
    # Check for critical keywords
    has_critical = any(keyword in query_lower for keyword in CRITICAL_KEYWORDS)
    if has_critical:
        severity = Severity.CRITICAL
    elif any(keyword in query_lower for keyword in MEDIUM_KEYWORDS):
        severity = Severity.MEDIUM
    elif any(keyword in query_lower for keyword in LOW_KEYWORDS):
        severity = Severity.LOW
    
    # Boost severity based on sentiment
    if sentiment_score > 0.7:
        if severity == Severity.LOW:
            severity = Severity.MEDIUM
        elif severity == Severity.MEDIUM:
            severity = Severity.HIGH
    
    # Boost severity for unresolved attempts
    if unresolved_attempts >= 2:
        if severity == Severity.LOW:
            severity = Severity.MEDIUM
        elif severity == Severity.MEDIUM:
            severity = Severity.HIGH
    
    # Determine tier
    # TIER_3: Critical issues, no KB match, high frustration, or multiple unresolved attempts
    # BUT: Don't classify as TIER_3 if it's an ambiguous query that needs clarification
    query_lower = query.lower()
    is_ambiguous_environment_query = any(word in query_lower for word in ["environment", "toolset", "wrong", "incorrect", "different"])
    
    if (severity == Severity.CRITICAL or 
          (not has_kb_match and not is_ambiguous_environment_query) or  # Only if really no match AND not ambiguous
          (kb_match_confidence < 0.2 and not has_kb_match and not is_ambiguous_environment_query) or
          sentiment_score > 0.7 or
          unresolved_attempts >= 3):
        tier = Tier.TIER_3
    # TIER_1: High confidence KB match, low/medium severity, no frustration
    # Lower threshold for TIER_1 since we're using keyword fallback (confidence may be lower)
    elif (has_kb_match and 
        kb_match_confidence >= 0.3 and  # Lowered from 0.8 for keyword fallback
        severity in [Severity.LOW, Severity.MEDIUM] and 
        sentiment_score < 0.5 and
        unresolved_attempts < 2):
        tier = Tier.TIER_1
    # TIER_2: Everything else (medium confidence, or some frustration)
    else:
        tier = Tier.TIER_2
    
    # Determine escalation need
    # Don't escalate if we have a good KB match and it's not critical
    # Also don't escalate ambiguous queries that need clarification
    needs_escalation = (
        tier == Tier.TIER_3 or
        severity == Severity.CRITICAL or
        (not has_kb_match and kb_match_confidence < 0.2 and not is_ambiguous_environment_query) or  # Only escalate if really no KB match AND not ambiguous
        sentiment_score > 0.7 or
        unresolved_attempts >= 2
    )
    
    # If we have KB matches with decent confidence, don't escalate for normal issues
    if (has_kb_match and kb_match_confidence >= 0.3 and 
        severity in [Severity.LOW, Severity.MEDIUM] and 
        sentiment_score < 0.5):
        needs_escalation = False
    
    # Don't escalate ambiguous queries that need clarification - they should ask questions first
    if is_ambiguous_environment_query and severity != Severity.CRITICAL:
        needs_escalation = False
    
    logger.info(
        f"Tier classification: tier={tier}, severity={severity}, "
        f"escalation={needs_escalation}, confidence={kb_match_confidence:.2f}"
    )
    
    return tier, severity, needs_escalation


def should_ask_clarifying_question(
    query: str,
    kb_matches: list,
    conversation_history: list,
    confidence: float = 1.0
) -> Tuple[bool, Optional[str]]:
    """
    Determine if we should ask a clarifying question
    
    Returns:
        (should_ask: bool, question: Optional[str])
    """
    query_lower = query.lower()
    
    # Check if query is about KB conflicts first (before environment/toolset check)
    is_kb_conflict_query = any(phrase in query_lower for phrase in [
        "kb docs say different", "kb documents say different", "two kb", "multiple kb",
        "conflicting kb", "kb conflict", "which kb", "which is right", "which is correct"
    ])
    
    if is_kb_conflict_query:
        # For KB conflict queries, we should handle them in RAG service, not ask clarifying questions
        # Return False to let the RAG service handle it
        return False, None
    
    # If low confidence matches (likely irrelevant KB chunks) OR no KB matches but query is ambiguous
    # Check if query is about environment/toolset (ambiguous) - this should trigger clarifying questions
    # Exclude "different" if it's part of a KB conflict query
    if any(word in query_lower for word in ["environment", "toolset", "wrong", "incorrect"]):
        # If confidence is low OR no KB matches, ask for clarification
        if confidence < 0.3 or not kb_matches:
            return True, "I need more details to help you. Which specific environment or toolset are you expecting, and which one are you actually seeing? Also, which training module are you working on?"
    
    # Also check for "different" but only if it's about environment/toolset, not KB
    if "different" in query_lower and not is_kb_conflict_query:
        if any(word in query_lower for word in ["environment", "toolset", "wrong", "incorrect"]):
            if confidence < 0.3 or not kb_matches:
                return True, "I need more details to help you. Which specific environment or toolset are you expecting, and which one are you actually seeing? Also, which training module are you working on?"
    
    # If multiple KB paths exist and query is ambiguous
    if len(kb_matches) > 3:
        # Check if query mentions specific module/environment
        if "module" not in query_lower and "environment" not in query_lower:
            return True, "Which training module or environment are you working with?"
    
    # If query is very short or vague
    if len(query.split()) < 3:
        return True, "Could you provide more details about the issue you're experiencing?"
    
    # If no KB matches but query seems incomplete
    if not kb_matches and len(query.split()) < 5:
        return True, "I need more information to help you. What specific problem are you encountering?"
    
    return False, None

