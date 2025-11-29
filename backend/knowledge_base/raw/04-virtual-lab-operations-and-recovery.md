---
id: kb-virtual-lab-recovery
title: Virtual Lab Operations and Recovery
version: 1.3
last_updated: 2024-05-12
tags: [labs, vm, recovery, crash, snapshots]
---

# Virtual Lab Operations and Recovery

This document describes how to handle issues with personal lab VMs and shared ranges.

## 1. Common Issues

- VM freezes / becomes unresponsive.
- VM shuts down unexpectedly.
- User loses work mid-exercise.
- Kernel panic messages appear in the VM console.

## 2. Freeze or Temporary Unresponsiveness

Symptoms:

- UI stops responding.
- Mouse/keyboard lag.

Steps (Tier 0):

1. Ask the user:
   - Are other browser tabs responsive?
   - Are other users reporting similar issues?

2. If only a single VM is affected:
   - Instruct user to disconnect and reconnect through the portal.
   - Do **not** instruct them to reboot the VM from inside the guest OS.

If the VM remains unresponsive after reconnection, escalate to Tier 2.

## 3. Unexpected Shutdown / Lab Crash

Symptoms:

- VM or lab tab closes abruptly.
- "Connection lost" or similar message appears.

Steps:

1. Ask:
   - Which module and lab are they running?
   - Approximately when did the crash occur?

2. Check whether the lab supports **auto-snapshot on start**:
   - If yes:
     - Instruct user to relaunch the lab.
     - Inform them that state may be restored from the last snapshot.
   - If no:
     - Explain that unsaved in-VM changes may be lost.

Escalate to Tier 2 if:

- The lab repeatedly crashes on relaunch.
- Multiple users report crashes in the same module.

## 4. Kernel Panic in Lab VM

If user reports kernel panic messages (e.g., stack trace, driver-related logs):

- Do **not** attempt to debug or instruct user to alter kernel or drivers.
- Explain that kernel-level issues are handled by platform engineering.
- Immediately escalate to Tier 2 with:
  - Lab name and module
  - Time of incident
  - Any screenshots or logs provided

The AI Help Desk must never provide OS-level commands to modify drivers, kernel modules, or boot parameters.

## 5. Lost Progress

If a user loses work because of a crash:

- Apologize and explain snapshot behavior clearly.
- Provide any **documented** recommendations for:
  - Saving work more frequently
  - Exporting artifacts (if supported)
- Do not promise recovery if snapshots are not configured.

If recurring, escalate so Support Engineers can investigate the lab image.

