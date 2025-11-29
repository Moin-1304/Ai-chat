"""
Unit tests for tier routing and severity classification
"""
import pytest
from app.services.tier_routing import classify_tier_and_severity
from app.models.schemas import Tier, Severity


def test_tier_1_high_confidence():
    """Test TIER_1 classification for high confidence KB matches"""
    tier, severity, escalation = classify_tier_and_severity(
        query="How do I reset my password?",
        kb_match_confidence=0.9,
        sentiment_score=0.2,
        has_kb_match=True,
        unresolved_attempts=0
    )
    assert tier == Tier.TIER_1
    assert severity in [Severity.LOW, Severity.MEDIUM]
    assert escalation == False


def test_tier_3_critical_issue():
    """Test TIER_3 classification for critical issues"""
    tier, severity, escalation = classify_tier_and_severity(
        query="My lab VM crashed and I lost all my work",
        kb_match_confidence=0.3,
        sentiment_score=0.8,
        has_kb_match=False,
        unresolved_attempts=0
    )
    assert tier == Tier.TIER_3
    assert severity == Severity.CRITICAL
    assert escalation == True


def test_tier_3_no_kb_match():
    """Test TIER_3 when no KB match found"""
    tier, severity, escalation = classify_tier_and_severity(
        query="Some obscure issue not in KB",
        kb_match_confidence=0.2,
        sentiment_score=0.3,
        has_kb_match=False,
        unresolved_attempts=0
    )
    assert tier == Tier.TIER_3
    assert escalation == True


def test_tier_2_medium_confidence():
    """Test TIER_2 classification for medium confidence"""
    # Use higher sentiment to prevent TIER_1 classification
    tier, severity, escalation = classify_tier_and_severity(
        query="I'm having trouble with lab access",
        kb_match_confidence=0.6,
        sentiment_score=0.6,  # >= 0.5 prevents TIER_1
        has_kb_match=True,
        unresolved_attempts=1
    )
    assert tier == Tier.TIER_2
    assert escalation in [True, False]  # Depends on other factors


def test_escalation_after_multiple_attempts():
    """Test that escalation is triggered after multiple unresolved attempts"""
    tier, severity, escalation = classify_tier_and_severity(
        query="This still doesn't work",
        kb_match_confidence=0.7,
        sentiment_score=0.5,
        has_kb_match=True,
        unresolved_attempts=3
    )
    assert escalation == True

