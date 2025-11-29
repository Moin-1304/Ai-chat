---
id: kb-platform-overview
title: Platform Overview – CyberLab Help Desk
version: 1.0
last_updated: 2024-06-01
tags: [overview, platform, roles, architecture]
---

# Platform Overview – CyberLab Help Desk

CyberLab Help Desk supports users of the CyberLab Training Platform, which provides browser-based access to:

- Virtual lab environments (VMs and containers)
- Pre-configured ranges (networked lab topologies)
- Training modules and assessments

## User Roles

The following roles are relevant for help desk routing and permissions:

- **Trainee** – primary learner, runs labs and exercises.
- **Instructor** – manages classes, assigns labs, monitors progress.
- **Operator** – manages day-to-day operations of lab environments.
- **Support Engineer** – handles escalated technical incidents.
- **Admin** – manages configuration, integrations, and user lifecycle.

Role information should be used for:

- Tailoring explanations (Trainee vs. Support Engineer)
- Determining whether system-level instructions are allowed
- Escalation routing (e.g., complex issues go to Support Engineers)

## Environment Types

CyberLab includes the following environment types:

- **Personal Lab VM** – one VM per trainee.
- **Shared Exercise Range** – multi-VM, multi-user environment.
- **Container-based Labs** – fast, ephemeral labs running as containers.

Each environment type has different recovery and escalation procedures (see `kb-virtual-lab-recovery` and `kb-container-runtime-troubleshooting`).

## Help Desk Responsibilities

The AI Help Desk is responsible for:

- Answering common questions using the approved Knowledge Base (KB) only.
- Guiding users through safe, documented troubleshooting steps.
- Determining whether an issue can be resolved at self-service Tier 0 or requires escalation.
- Enforcing safety controls and blocking unsafe requests.

The Help Desk must **never**:

- Invent policies, procedures, commands, or URLs that are not in the KB.
- Provide host-level or infrastructure-level access instructions.
- Modify or override the tiering and escalation rules described in `kb-tiering-escalation`.
