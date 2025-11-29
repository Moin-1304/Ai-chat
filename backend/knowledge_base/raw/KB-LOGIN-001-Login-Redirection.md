# Login Redirection Troubleshooting Guide

**KB ID:** KB-LOGIN-001  
**Category:** Authentication  
**Last Updated:** 2025-01-15  
**Confidence Score:** 0.95  
**Source:** MKDocs  

## Overview

This guide helps resolve login redirection issues where users are redirected back to the login page after attempting to log in.

## Common Causes

1. **Browser Cache Issues** - Stale cookies or cached authentication data
2. **Session Timeout** - Session expired before login completed
3. **SSO Configuration** - Single Sign-On misconfiguration
4. **Time Synchronization** - System clock out of sync
5. **Account Status** - Account locked or inactive

## Step-by-Step Troubleshooting

### Step 1: Clear Browser Cache and Cookies

1. Open browser settings
2. Navigate to Privacy/Clear browsing data
3. Select "Cookies and cached images"
4. Clear data for the last hour
5. Restart browser and try logging in again

### Step 2: Check Session Status

1. Verify you're using the correct login URL
2. Check if session timeout occurred
3. Try logging in from an incognito/private window
4. Verify your account is not locked

### Step 3: Verify SSO Configuration

1. Access SSO portal at sso.pcte.mil
2. Verify SSO session is active
3. Check trusted device settings
4. Clear SSO cookies if needed

### Step 4: Check Time Synchronization

1. Verify system clock is correct
2. Check timezone settings
3. Sync time with NTP server if needed
4. Time drift can cause authentication failures

### Step 5: Verify Account Status

1. Check account is active (not locked)
2. Verify password hasn't expired
3. Check MFA device is properly configured
4. Contact administrator if account shows as inactive

## Error Messages

**"Session expired"** - Your login session timed out. Try logging in again.

**"Invalid credentials"** - Username or password incorrect. Try password reset.

**"Account locked"** - Too many failed login attempts. Wait 15 minutes or contact support.

**"Redirect loop"** - Browser cache issue. Clear cookies and try again.

## Still Need Help?

If these steps don't resolve the login redirection issue:

1. Document the exact error message
2. Note which browser you're using
3. Check if issue occurs in incognito mode
4. Create a support ticket with these details

## Related Articles

- KB-DEMO-001: Lab Access Troubleshooting
- KB-2024-002: Password Reset Procedures
- KB-2024-015: SSO Configuration Guide

