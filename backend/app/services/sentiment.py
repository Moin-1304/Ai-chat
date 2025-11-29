"""
Sentiment analysis for user messages
"""
from typing import Dict, Any
import re
import logging

logger = logging.getLogger(__name__)


# Sentiment patterns
FRUSTRATED_PATTERNS = [
    r"frustrated", r"angry", r"annoyed", r"upset", r"irritated",
    r"doesn't work", r"didn't work", r"not working", r"still doesn't",
    r"not resolved", r"doesn't help", r"nothing works", r"still not",
    r"useless", r"waste of time", r"terrible", r"awful"
]

SATISFIED_PATTERNS = [
    r"thank", r"thanks", r"appreciate", r"helpful", r"great", r"good",
    r"perfect", r"excellent", r"works", r"resolved", r"solved"
]

URGENT_PATTERNS = [
    r"urgent", r"asap", r"as soon as possible", r"immediately", r"now",
    r"emergency", r"critical", r"important", r"need help now"
]


def analyze_sentiment(message: str, conversation_context: Dict[str, Any] = None) -> Dict[str, Any]:
    """
    Analyze sentiment from user message
    
    Returns:
        {
            "sentiment": str,  # "neutral", "frustrated", "satisfied"
            "score": float,    # 0.0 to 1.0
            "shouldEscalate": bool
        }
    """
    message_lower = message.lower()
    score = 0.0
    detected_sentiment = "neutral"
    
    # Check for frustrated patterns
    frustrated_matches = sum(1 for pattern in FRUSTRATED_PATTERNS if re.search(pattern, message_lower))
    if frustrated_matches > 0:
        score = min(0.5 + (frustrated_matches * 0.15), 1.0)
        detected_sentiment = "frustrated"
    
    # Check for satisfied patterns (only if not frustrated)
    if score < 0.3:
        satisfied_matches = sum(1 for pattern in SATISFIED_PATTERNS if re.search(pattern, message_lower))
        if satisfied_matches > 0:
            score = 0.2
            detected_sentiment = "satisfied"
    
    # Track frustration accumulation
    unresolved_attempts = conversation_context.get("unresolved_attempts", 0) if conversation_context else 0
    frustration_keywords = ["didn't work", "not working", "still doesn't", "not resolved"]
    has_frustration_keyword = any(keyword in message_lower for keyword in frustration_keywords)
    
    if has_frustration_keyword and unresolved_attempts > 0:
        accumulated_frustration = min(0.3 + (unresolved_attempts * 0.2), 0.9)
        score = max(score, accumulated_frustration)
        if score > 0.5:
            detected_sentiment = "frustrated"
    
    # Check for urgent patterns
    if any(re.search(pattern, message_lower) for pattern in URGENT_PATTERNS):
        if unresolved_attempts >= 2:
            score = max(score, 0.8)
            detected_sentiment = "frustrated"
    
    # Determine if escalation is needed
    should_escalate = score >= 0.7
    
    return {
        "sentiment": detected_sentiment,
        "score": score,
        "shouldEscalate": should_escalate
    }

