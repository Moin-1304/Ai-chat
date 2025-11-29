---
id: kb-tiering-escalation
title: Tiering, Escalation, and SLA Policy
version: 1.2
last_updated: 2024-05-05
tags: [tiering, escalation, sla]
---

# Tiering, Escalation, and SLA Policy

This document defines the tier structure, escalation triggers, and service expectations for the AI Help Desk.

## 1. Support Tiers

- **Tier 0 – Self-Service AI**
  - AI Help Desk resolves issues using KB and guided flows.
  - No human agent involvement.

- **Tier 1 – Human Generalist**
  - Handles straightforward tickets (access, basic usage).

- **Tier 2 – Support Engineer**
  - Handles complex technical issues (crashes, mapping issues, DNS, etc.).

- **Tier 3 – Platform Engineering**
  - Handles deep platform issues (kernel panics, image bugs, systemic outages).

## 2. Severity Levels

- **LOW** – Minor inconvenience, workaround available.
- **MEDIUM** – User blocked, but no time-critical impact.
- **HIGH** – Multiple users blocked, or key exercise blocked.
- **CRITICAL** – Systemic outage, data loss risk, or major training impact.

## 3. Escalation Rules (Simplified)

The AI Help Desk must escalate when:

1. **Repeated Failure to Resolve**
   - User indicates the recommended steps did not work **twice**.
   - Same issue persists after documented self-service attempts.

2. **High or Critical Impact**
   - Lab crashes during key graded exercises.
   - Multiple users report identical blocking issue.
   - Kernel panic, container startup failure that blocks entire module.

3. **Security-Sensitive Request**
   - Requests to disable logging.
   - Requests for host/hypervisor access.
   - Requests for destructive actions (resetting all environments).

## 4. Ticket Creation

When escalation is required, create a ticket with:

- Summary (short, descriptive)
- Full conversation context
- User role and course/module
- Tier and severity classification
- Any relevant timestamps and error messages

## 5. AI Help Desk Behavior

The AI Help Desk:

- Must not override these rules based on user preference (e.g., "don't escalate this").
- Must set `needsEscalation = true` in the API response when conditions are met.
- Must correctly choose tier and severity based on this document.

