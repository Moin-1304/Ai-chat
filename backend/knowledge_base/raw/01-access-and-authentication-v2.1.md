---
id: kb-access-authentication
title: Access and Authentication Troubleshooting
version: 2.1
last_updated: 2024-04-10
tags: [authentication, sso, login, access]
---

# Access and Authentication Troubleshooting (v2.1)

This document describes how to troubleshoot authentication and login issues
for the CyberLab platform.

> **Note:** This document supersedes earlier authentication guidance in
> `kb-auth-policy-2023`. For MFA-related policies, use `kb-auth-policy-2024`.

## Common Symptoms

1. **Login Redirection Loop**
   - User logs in, sees "Authentication successful", then is redirected back
     to the login page repeatedly.

2. **Session Expired Immediately**
   - User logs in successfully but is logged out after a few seconds.

3. **Time Drift Authentication Failures**
   - User reports that their lab VM clock is behind and cannot complete certain
     authentication workflows (e.g., token validation).

---

## 1. Login Redirection Loop

**Symptom:**

User reports: "I keep getting redirected to the login page even after logging in."

### 1.1 Required Clarifying Questions

Before suggesting steps, ask:

1. Which **browser** are you using?
2. Are you accessing CyberLab from within a lab VM or your local machine?
3. Approximately what **time** did the issue start?

### 1.2 Self-Service Steps (Tier 0/Tier 1)

1. Instruct the user to:
   - Close all CyberLab tabs.
   - Clear browser **cookies and site data** for `*.cyberlab.local`.
   - Close and reopen the browser.
   - Navigate to the CyberLab login page and try again.

2. If the user is accessing from inside a lab VM, ensure:
   - The VM browser is not using stale cached SSO sessions.

### 1.3 Escalation Criteria

Escalate to Tier 2 (Support Engineer) if:

- The user has performed all steps in 1.2 **twice** and the issue persists.
- Multiple users report the same behavior within a short time window.

When escalating, capture:

- Browser type and version.
- Network location (lab VM vs local).
- Approximate start time.
- Any error messages or codes observed.

---

## 2. Session Expired Immediately

If the user is logged out within seconds:

1. Verify with user:
   - Whether they are using private/incognito mode.
   - Whether any browser extensions are blocking cookies.

2. If session still expires:
   - Escalate to Tier 2 with captured session details.

---

## 3. Time Drift Authentication Failures

**Symptom:**

User reports: "My lab VM clock is behind and authentication keeps failing."

### 3.1 Policy

Trainees and Instructors are **not allowed** to modify time synchronization
or system clocks inside lab VMs.

Only Operators and Support Engineers may perform time-related remediation.

### 3.2 AI Help Desk Behavior

- If user is a **Trainee** or **Instructor**:
  - Do **not** provide commands or procedures to adjust system time.
  - Inform the user that time synchronization is a platform-level function.
  - Escalate to Tier 2 (Support Engineer) with:
    - VM name or ID.
    - Reported time skew (approximate).

- If user is an **Operator** or **Support Engineer**:
  - You may reference the high-level process, but do **not** provide
    step-by-step OS commands unless explicitly documented in a separate
    Operator guide (not included in this KB set).
  - If not documented, escalate to Tier 3.

The AI Help Desk must **never** invent time synchronization commands.

