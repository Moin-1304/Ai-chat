# Lab Access Troubleshooting Guide

**KB ID:** KB-DEMO-001  
**Category:** Technical Support  
**Last Updated:** 2025-11-07  
**Confidence Score:** 0.95  
**Source:** MKDocs  

## Overview

This guide helps resolve common lab access issues in the PCTE environment. Follow these steps to diagnose and fix access problems.

## Quick Diagnosis

- **Can't see lab in portal?** → Check enrollment status
- **Lab shows but won't launch?** → Verify browser compatibility
- **Lab crashes after launch?** → Check system requirements
- **Permission denied error?** → Contact administrator

## Step-by-Step Troubleshooting

### Step 1: Verify Account Status

- Log into the Training Portal with your PCTE credentials
- Navigate to **My Profile** → **Account Status**
- Verify your account shows as "Active"
- Check that your role includes "Lab Access" permission
- If locked, wait 15 minutes or contact Help Desk

### Step 2: Check Lab Environment Availability

- Go to **Training Portal** → **Available Labs**
- Verify the lab you want to access is listed
- Check the lab status indicator (green = available)
- Look for maintenance windows in the announcements
- If lab is unavailable, try an alternative module

### Step 3: Browser Requirements

PCTE labs require modern browsers with specific capabilities:

- **Supported:** Chrome 90+, Firefox 88+, Edge 90+
- **Not supported:** Internet Explorer, Safari on Windows
- Clear browser cache: `Ctrl+Shift+Delete`
- Disable extensions: Try incognito/private mode
- Enable JavaScript and WebSockets

### Step 4: Network Connectivity

- **On-site:** Ensure you're on PCTE network
- **Remote:** Verify VPN connection to PCTE
- Check VPN client version (must be 2.3+)
- Verify firewall allows ports: 443, 8080, 8443
- Test connectivity: `ping lab.pcte.mil`

### Step 5: Module-Specific Access

- Confirm you've completed prerequisite modules
- Verify you're enrolled in the correct training course
- Check module completion status in dashboard
- For advanced modules, verify instructor approval

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| **Access Denied - Insufficient Permissions** | Role doesn't include lab access | Contact training administrator to update role |
| **Lab Environment Unavailable** | Lab is down for maintenance | Check announcements or try different lab |
| **Module Not Found** | Incorrect module ID or not enrolled | Verify module number and enrollment status |
| **Connection Timeout** | Network connectivity issue | Check VPN, firewall, and network connection |
| **Browser Not Supported** | Using unsupported browser | Switch to Chrome, Firefox, or Edge |

## Advanced Troubleshooting

### If basic steps don't work:

1. **Clear all browser data:**
   - Go to Settings → Privacy → Clear browsing data
   - Select "All time" and check all boxes
   - Restart browser

2. **Try different network:**
   - If on WiFi, try wired connection
   - If on VPN, try different VPN endpoint
   - If remote, try on-site network if possible

3. **Check system resources:**
   - Ensure 4GB+ RAM available
   - Close unnecessary applications
   - Check disk space (minimum 2GB free)

4. **Verify SSO status:**
   - Visit sso.pcte.mil
   - Verify you can log in
   - Check SSO session is active

## When to Contact Support

Contact the Help Desk if you've tried all steps and still can't access labs:

- **Response time:** 2 hours during business hours
- **Ticket priority:** High (lab access blocking)
- **Include in ticket:**
  - Lab module number
  - Error message (if any)
  - Browser and OS version
  - Steps you've already tried

## Related Articles

- KB-DEMO-002: Password Reset Guide
- KB-DEMO-003: Training Portal Access
- KB-DEMO-004: VPN Configuration

## Feedback

Found this article helpful? Let us know or suggest improvements by replying to your support ticket.
