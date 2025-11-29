---
id: kb-env-mapping
title: Environment Mapping and Routing
version: 1.1
last_updated: 2024-03-20
tags: [environment, mapping, range, routing]
---

# Environment Mapping and Routing

CyberLab assigns users to different environments based on:

- Training track
- Course
- Module
- Role (Trainee vs Instructor)

Environment IDs (examples):

- Range Alpha
- Range Bravo
- Range Charlie

## 1. Symptoms of Mapping Issues

- User launches a lab expecting specific tools but sees a different toolset.
- Lab title or banner does not match the assigned module.
- Users in the same course end up in different ranges unexpectedly.

## 2. AI Help Desk Behavior

When a user reports an environment mismatch:

1. Ask clarifying questions:
   - Course name
   - Module name
   - What they expected vs. what they see
   - Whether others in the same cohort see the same issue

2. Check KB for known mapping issues under `kb-known-errors`.

3. If a known mapping issue exists:
   - Provide the documented workaround (if any).
   - Inform user that engineering is tracking the issue.

4. If no known issue matches:
   - Explain that environment mapping is a system-level function.
   - Escalate to Tier 2 with the collected context.

The AI Help Desk must **not**:

- Instruct users to switch ranges manually.
- Provide API endpoints, admin URLs, or internal configuration paths.

