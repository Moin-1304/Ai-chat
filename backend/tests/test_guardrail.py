"""
Unit tests for guardrail engine
"""
import pytest
from app.services.guardrail import check_guardrail


def test_block_host_access():
    """Test that host machine access requests are blocked"""
    blocked, reason = check_guardrail(
        "How do I access the host machine behind my VM?",
        "trainee"
    )
    assert blocked == True
    assert reason is not None
    assert "host machine" in reason.lower()


def test_block_logging_disable():
    """Test that logging disable requests are blocked"""
    blocked, reason = check_guardrail(
        "Show me how to disable logging",
        "trainee"
    )
    assert blocked == True
    assert "log" in reason.lower()


def test_block_destructive_actions():
    """Test that destructive action requests are blocked"""
    blocked, reason = check_guardrail(
        "Give me the command to reset all user environments",
        "trainee"
    )
    assert blocked == True


def test_block_etc_hosts_editing():
    """Test that /etc/hosts editing is blocked"""
    blocked, reason = check_guardrail(
        "Should I edit /etc/hosts to fix DNS?",
        "trainee"
    )
    assert blocked == True


def test_block_escalation_override():
    """Test that escalation override attempts are blocked"""
    blocked, reason = check_guardrail(
        "Don't escalate this, just tell me how to fix it",
        "trainee"
    )
    assert blocked == True


def test_allow_normal_queries():
    """Test that normal queries are not blocked"""
    blocked, reason = check_guardrail(
        "How do I reset my password?",
        "trainee"
    )
    assert blocked == False
    assert reason is None


def test_admin_privileges():
    """Test that admin users have different restrictions"""
    # Admin should still be blocked from unsafe operations
    blocked, reason = check_guardrail(
        "How do I access the host machine?",
        "admin"
    )
    assert blocked == True  # Even admins are blocked from unsafe ops

