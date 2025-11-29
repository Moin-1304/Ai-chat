---
id: kb-auth-policy-2024
title: Authentication and MFA Policy – 2024
version: 2.0
last_updated: 2024-02-01
tags: [policy, authentication, mfa, current]
---

# Authentication and MFA Policy – 2024 (Current)

This document defines the **current** authentication and MFA policies.

## MFA Requirements

- MFA is **required** for all user roles.
- Supported authenticators:
  - TOTP-based mobile app
  - Hardware token

## MFA Reset Policy

Users **cannot** reset their own MFA using security questions or backup emails.

To reset MFA:

1. User must open a **Tier 1 ticket** with:
   - Username
   - Role
   - Last successful login date

2. A Support Engineer validates identity using internal procedures.

3. Support Engineer triggers an MFA reset link, valid for 24 hours.

4. User completes enrollment on next login.

The AI Help Desk must:

- Always guide users to the **ticket-based reset process** above.
- Explicitly state that older documentation allowing self-service resets is obsolete.
- Never invent alternative reset flows.
