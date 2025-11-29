---
id: kb-known-errors
title: Known Error Catalog
version: 1.0
last_updated: 2024-05-18
tags: [known-issues, catalog, errors]
---

# Known Error Catalog

This catalog lists selected known issues to support fast recognition by the AI Help Desk.

## KE-1001 – Login Redirection Loop (AUTH)

- **Description:** Users get redirected to the login page repeatedly.
- **Cause:** Stale SSO cookies in some browsers.
- **Workaround:** Clear browser cookies for `*.cyberlab.local` and retry.
- **Status:** Open, being monitored.
- **Related KB:** `kb-access-authentication`

## KE-2001 – Missing `/opt/startup.sh` in Container Labs

- **Description:** Containerized labs fail with "missing /opt/startup.sh".
- **Cause:** Image build missing startup script.
- **Workaround:** None; relaunch may succeed if updated image deployed.
- **Status:** Open — platform engineering actively fixing.
- **Related KB:** `kb-container-runtime-troubleshooting`

## KE-3001 – Environment Mapping Mismatch in Module L-7

- **Description:** Users launched into the wrong environment for Module L-7.
- **Cause:** Incorrect mapping of course to range.
- **Workaround:** None for end users.
- **Status:** Open.
- **AI Help Desk Guidance:**
  - Explain that the issue is known.
  - Reassure user it is being addressed.
  - Escalate ticket with module and environment details.
- **Related KB:** `kb-env-mapping`

## KE-4001 – VM Kernel Panic in Certain Labs

- **Description:** Kernel panic observed in some VM images under heavy load.
- **AI Help Desk Guidance:**
  - Do not attempt to debug.
  - Escalate immediately with lab details and timestamp.
- **Related KB:** `kb-virtual-lab-recovery`

