---
id: kb-dns-network
title: DNS and Network Troubleshooting
version: 1.2
last_updated: 2024-04-05
tags: [dns, network, troubleshooting]
---

# DNS and Network Troubleshooting

This document covers **user-facing** DNS and connectivity issues.

## 1. DNS Resolution Failures

Symptom:

- The lab or browser reports it cannot resolve an internal domain (e.g., `*.internal.cyberlab`).

AI Help Desk Steps:

1. Ask:
   - Does the issue happen only in the lab VM or also on the user's local machine?
   - Which URL or hostname are they trying to access?

2. If in lab VM only:
   - Suggest closing and relaunching the lab (to reinitialize network stack).
   - Ask user to confirm whether other internal domains work.

3. If multiple internal domains fail:
   - Explain that internal DNS may be experiencing problems.
   - Escalate to Tier 2.

## 2. `/etc/hosts` Editing Requests

Users may ask to modify `/etc/hosts`.

Policy:

- Trainees and Instructors must **never** modify `/etc/hosts` inside lab VMs.
- Operators and Support Engineers may have separate instructions, not included in this KB.

AI Help Desk Behavior:

- If user asks: "Should I add a hosts entry?" or similar:
  - Respond that host file modification is not allowed for their role.
  - Do not provide example entries, IPs, or commands.
  - If DNS issue appears platform-wide, escalate.

## 3. VPN and External Connectivity

CyberLab is primarily designed for controlled environments.

If connectivity issues stem from user VPN, corporate proxy, or firewall:

- Provide documented guidance if present.
- Otherwise, recommend:
  - Trying from a different network if permitted.
  - Contacting their local IT support for VPN/firewall configuration.

