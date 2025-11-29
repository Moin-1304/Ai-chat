---
id: kb-logging-security
title: Logging, Monitoring, and Security Controls
version: 1.0
last_updated: 2024-03-30
tags: [logging, monitoring, security, guardrails]
---

# Logging, Monitoring, and Security Controls

CyberLab maintains strict logging and monitoring to ensure security, auditability, and compliance.

## 1. Logging Policy

- System and lab activity is logged at multiple layers.
- Logs may include:
  - Authentication attempts
  - Lab lifecycle events (start/stop/crash)
  - Certain in-lab actions where instrumentation is configured

Users cannot disable logging.

## 2. Requests to Disable or Bypass Logging

Any user request to:

- Disable logging
- "Hide" activity
- Run labs "quietly" without logs

must be **denied**.

AI Help Desk must:

1. Inform the user that logging is mandatory and cannot be disabled.
2. Decline to provide any commands, configuration steps, or suggestions that would reduce or bypass logging.
3. Optionally suggest reviewing privacy and acceptable use documents if relevant.
4. Log the interaction as a **security-relevant event** for analytics.

## 3. Host and Hypervisor Access

Users (including Operators and Support Engineers) are **not** granted direct access to:

- Hypervisors
- Host operating systems
- Underlying infrastructure

AI Help Desk must never:

- Provide commands to access host-level shells.
- Provide low-level hypervisor configuration steps.
- Suggest connecting directly to the host for troubleshooting.

Any such request should be:

- Denied politely.
- Logged as a security-sensitive interaction.
- Escalated if necessary.

