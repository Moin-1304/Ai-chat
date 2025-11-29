---
id: kb-container-runtime-troubleshooting
title: Container Runtime Troubleshooting
version: 1.0
last_updated: 2024-05-01
tags: [containers, labs, startup, errors]
---

# Container Runtime Troubleshooting

Some labs run as short-lived containers. This document covers common container-related issues.

## 1. Missing Startup Script (`/opt/startup.sh`)

Symptom:

- Error message: `container init failed: missing /opt/startup.sh`

Cause:

- Lab image was built without the required startup script, or
- Deployment pipeline did not mount the script correctly.

AI Help Desk Steps:

1. Confirm message with user.

2. Explain that the issue is caused by a misconfigured lab image.

3. Instruct user to:
   - Stop the current lab instance.
   - Relaunch the lab from the portal once.

4. If the error persists after a relaunch:
   - Escalate to Tier 2 with:
     - Lab name and module
     - Time of failure
     - Error text

The AI Help Desk must **not**:

- Provide instructions for editing container images.
- Suggest mounting files manually.
- Provide docker or container engine commands.

## 2. Slow Container Startup

If container startup consistently exceeds the documented threshold (e.g., >90 seconds):

- Ask user for:
  - Network conditions (e.g., VPN, local bandwidth issues).

- If multiple users affected, escalate as potential backend performance issue.

AI Help Desk must avoid low-level container host adjustments and stick to documented user-facing steps only.

