"""
Guardrail engine for blocking unsafe requests
"""
import re
from typing import Dict, Any, Tuple, Optional
import logging

logger = logging.getLogger(__name__)


# Blocked patterns - unsafe requests
BLOCKED_PATTERNS = [
    # Host machine access
    (r"access.*host.*machine", "Request to access host machine is not allowed"),
    (r"host.*machine.*access", "Request to access host machine is not allowed"),
    (r"behind.*vm", "Accessing host machine behind VM is not allowed"),
    (r"hypervisor.*setting", "Modifying hypervisor settings is not allowed"),
    (r"hypervisor.*config", "Modifying hypervisor settings is not allowed"),
    
    # Logging disable
    (r"disable.*log", "Disabling logging is not allowed"),
    (r"turn.*off.*log", "Disabling logging is not allowed"),
    (r"stop.*log", "Disabling logging is not allowed"),
    (r"quiet.*mode", "Disabling logging is not allowed"),
    
    # Destructive actions
    (r"reset.*all.*environment", "Resetting all environments is a destructive action and not allowed"),
    (r"delete.*all.*user", "Deleting all user data is not allowed"),
    (r"wipe.*all", "Wiping all data is not allowed"),
    (r"format.*all", "Formatting all drives is not allowed"),
    
    # System file editing
    (r"/etc/hosts", "Editing /etc/hosts file is not allowed"),
    (r"edit.*hosts.*file", "Editing hosts file is not allowed"),
    (r"modify.*hosts", "Modifying hosts file is not allowed"),
    
    # Kernel-level operations
    # Only block explicit "fix" or "debug" requests, not general kernel panic queries
    (r"kernel.*panic.*(?:fix|debug|repair|modify|command|how.*to.*fix)", "Kernel panic debugging requires specialized support"),
    (r"kernel.*debug", "Kernel-level debugging is not allowed"),
    (r"kernel.*config", "Kernel configuration changes are not allowed"),
    (r"how.*to.*fix.*kernel.*panic", "Kernel panic debugging requires specialized support"),
    
    # Unauthorized system access
    (r"root.*access", "Root access requests are not allowed"),
    (r"sudo.*privilege", "Elevated privilege requests are not allowed"),
    (r"admin.*override", "Admin override requests are not allowed"),
    
    # Override escalation attempts
    (r"don.*t.*escalate", "Escalation rules cannot be overridden"),
    (r"don't.*escalate", "Escalation rules cannot be overridden"),
    (r"no.*escalation", "Escalation rules cannot be overridden"),
    (r"skip.*escalation", "Escalation rules cannot be overridden"),
]


def check_guardrail(message: str, user_role: str) -> Tuple[bool, Optional[str]]:
    """
    Check if message should be blocked by guardrails
    
    Returns:
        (blocked: bool, reason: Optional[str])
    """
    message_lower = message.lower()
    
    # Check against blocked patterns
    for pattern, reason in BLOCKED_PATTERNS:
        if re.search(pattern, message_lower, re.IGNORECASE):
            logger.warning(f"Guardrail triggered: {reason} (pattern: {pattern})")
            return True, reason
    
    # Role-based checks
    if user_role.lower() not in ["admin", "support_engineer"]:
        # Additional checks for non-admin users
        admin_keywords = [
            r"system.*config",
            r"database.*access",
            r"backup.*restore",
            r"security.*policy",
        ]
        for pattern in admin_keywords:
            if re.search(pattern, message_lower, re.IGNORECASE):
                return True, "This operation requires administrator privileges"
    
    return False, None


def log_guardrail_event(
    session_id: str,
    blocked: bool,
    reason: Optional[str],
    message_content: str,
    user_role: str,
    db
):
    """Log guardrail event to database"""
    from app.models.database import GuardrailEvent
    
    try:
        event = GuardrailEvent(
            session_id=session_id,
            blocked=blocked,
            reason=reason,
            message_content=message_content[:500],  # Truncate long messages
            user_role=user_role
        )
        db.add(event)
        db.commit()
    except Exception as e:
        logger.error(f"Error logging guardrail event: {e}")
        db.rollback()

