// Mock Knowledge Base Articles with Full Content
// Used for AI chat responses and search functionality

export const kbArticles = [
  {
    id: 'KB-2024-001',
    title: 'Lab Access Troubleshooting Guide',
    content: `# Lab Access Troubleshooting Guide

## Overview
This guide helps resolve common lab access issues in the PCTE environment.

## Step-by-Step Troubleshooting

### Step 1: Verify Account Status
- Ensure your account is active and not locked
- Check that you have completed required training modules
- Verify your role assignments (Trainee/Instructor)

### Step 2: Check Lab Environment Availability
- Navigate to Training Portal > Lab Environments
- Verify the lab you're trying to access is available
- Check for scheduled maintenance windows

### Step 3: Browser Requirements
- Use Chrome, Firefox, or Edge (latest versions)
- Clear browser cache and cookies
- Disable browser extensions that might interfere

### Step 4: Network Connectivity
- Verify you're connected to the PCTE network
- Check VPN connection if accessing remotely
- Ensure firewall rules allow lab access

### Step 5: Module-Specific Access
- Confirm you've completed prerequisite modules
- Verify you're enrolled in the correct training course
- Check module completion status

## Common Error Messages

**Error: "Access Denied - Insufficient Permissions"**
- Solution: Contact your training administrator to verify role assignments

**Error: "Lab Environment Unavailable"**
- Solution: Check maintenance schedule or try alternative lab environment

**Error: "Module Not Found"**
- Solution: Verify correct module number and enrollment status

## Still Need Help?
If these steps don't resolve your issue, create a support ticket with the following information:
- Error message details
- Module number
- Browser and operating system
- Steps you've already tried`,
    summary: 'Complete troubleshooting guide for lab access issues including account verification, browser requirements, and common error resolutions.',
    source: 'Confluence',
    category: 'Technical',
    keywords: ['lab', 'access', 'environment', 'troubleshoot', 'module', 'training'],
    relatedArticles: ['KB-2024-002', 'KB-2024-015'],
    confidence: 0.95,
    lastUpdated: '2025-01-08 09:15',
    views: 892,
  },
  {
    id: 'KB-2024-002',
    title: 'Password Reset Procedures',
    content: `# Password Reset Procedures

## Self-Service Password Reset

### For Active Users
1. Navigate to the PCTE login page
2. Click "Forgot Password" link
3. Enter your username or email address
4. Follow the verification steps sent to your registered email
5. Create a new password following security requirements:
   - Minimum 12 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

### For Locked Accounts
If your account is locked due to multiple failed login attempts:
1. Wait 15 minutes for automatic unlock
2. If still locked, use the "Unlock Account" self-service option
3. Contact Help Desk if self-service doesn't work

### Account Recovery
If you've forgotten your username:
1. Use the "Recover Username" option on login page
2. Provide your registered email address
3. Check your email for username recovery instructions

## Security Requirements
- Passwords expire every 90 days
- Cannot reuse last 12 passwords
- Must change password on first login
- MFA required for all accounts

## Need Additional Help?
Contact the Help Desk if:
- Email verification not received
- Account remains locked after self-service
- Password reset link expired
- MFA device issues`,
    summary: 'Step-by-step guide for resetting passwords, unlocking accounts, and password security requirements.',
    source: 'Confluence',
    category: 'Account Management',
    keywords: ['password', 'reset', 'forgot', 'locked', 'account', 'credentials', 'login'],
    relatedArticles: ['KB-2024-015', 'KB-2024-003'],
    confidence: 0.97,
    lastUpdated: '2025-01-05 11:22',
    views: 756,
  },
  {
    id: 'KB-2024-003',
    title: 'Training Portal Access Guide',
    content: `# Training Portal Access Guide

## Overview
Access the PCTE Training Portal to enroll in courses, access materials, and track progress.

## Access Requirements
- Active PCTE account
- Completed orientation module
- Browser compatibility (Chrome, Firefox, Edge)

## Accessing the Portal
1. Navigate to training.pcte.mil
2. Log in with your PCTE credentials
3. Accept terms and conditions if first-time user
4. Dashboard will display your enrolled courses

## Portal Features
- **Course Catalog**: Browse available training modules
- **Progress Tracking**: View completion status and scores
- **Resource Library**: Access course materials and guides
- **Certification Paths**: View recommended training sequences

## Common Issues

**Issue: Cannot see enrolled courses**
- Verify you've completed enrollment process
- Check course start dates
- Contact instructor if courses should be visible

**Issue: Cannot access course materials**
- Ensure module prerequisites are completed
- Verify browser compatibility
- Clear browser cache

**Issue: Progress not updating**
- Allow up to 24 hours for progress sync
- Contact support if issue persists`,
    summary: 'Complete guide for accessing and using the PCTE Training Portal, including enrollment and troubleshooting.',
    source: 'MKDocs',
    category: 'Training',
    keywords: ['training', 'portal', 'course', 'enrollment', 'materials', 'access'],
    relatedArticles: ['KB-2024-001', 'KB-2024-002'],
    confidence: 0.93,
    lastUpdated: '2025-01-12 10:30',
    views: 643,
  },
  {
    id: 'KB-2024-015',
    title: 'SSO Configuration Guide',
    content: `# SSO Configuration Guide

## Single Sign-On (SSO) Overview
PCTE uses Red Hat SSO for centralized authentication across all services.

## SSO Setup
1. Access SSO portal at sso.pcte.mil
2. Log in with your primary credentials
3. Configure trusted devices for MFA
4. Link external accounts if needed

## Supported Services
- Training Portal
- Lab Environments
- Knowledge Base
- Ticketing System
- Analytics Dashboard

## Troubleshooting SSO Issues
- Clear browser cookies and cache
- Verify time synchronization on device
- Check VPN connection if remote
- Contact IT support if persistent issues`,
    summary: 'Guide for configuring and troubleshooting Single Sign-On (SSO) authentication.',
    source: 'MKDocs',
    category: 'Authentication',
    keywords: ['sso', 'single sign-on', 'authentication', 'login', 'red hat', 'mfa'],
    relatedArticles: ['KB-2024-002', 'KB-2024-003'],
    confidence: 0.92,
    lastUpdated: '2024-12-20 16:45',
    views: 543,
  },
  {
    id: 'KB-2024-025',
    title: 'Network Configuration for Lab Environments',
    content: `# Network Configuration for Lab Environments

## Overview
Configure network settings for optimal lab environment connectivity.

## Required Settings
- DNS: 10.0.0.1
- Gateway: 10.0.0.254
- Subnet: 255.255.255.0

## Firewall Rules
- Allow ports 443, 8080, 8443
- Whitelist lab environment IP ranges
- Disable unnecessary firewall rules

## VPN Configuration
- Use PCTE VPN client version 2.3 or higher
- Connect to nearest regional endpoint
- Verify certificate validity`,
    summary: 'Network and firewall configuration guidelines for lab environment access.',
    source: 'Confluence',
    category: 'Technical',
    keywords: ['network', 'vpn', 'firewall', 'configuration', 'lab', 'connectivity'],
    relatedArticles: ['KB-2024-001'],
    confidence: 0.89,
    lastUpdated: '2025-01-07 14:20',
    views: 421,
  },
  {
    id: 'KB-2024-030',
    title: 'Common Error Codes Reference',
    content: `# Common Error Codes Reference

## Error Code: ACC-001
**Description**: Access Denied - Insufficient Permissions
**Solution**: Contact administrator to verify role assignments

## Error Code: LAB-404
**Description**: Lab Environment Not Found
**Solution**: Verify correct lab ID and availability

## Error Code: NET-503
**Description**: Network Connection Timeout
**Solution**: Check VPN connection and firewall settings

## Error Code: AUTH-401
**Description**: Authentication Failed
**Solution**: Verify credentials and SSO status`,
    summary: 'Quick reference guide for common PCTE error codes and resolutions.',
    source: 'MKDocs',
    category: 'Reference',
    keywords: ['error', 'code', 'troubleshoot', 'reference', 'common'],
    relatedArticles: ['KB-2024-001', 'KB-2024-002'],
    confidence: 0.88,
    lastUpdated: '2025-01-06 11:00',
    views: 389,
  },
];

// Helper function to find article by ID
export const findArticleById = (id) => {
  return kbArticles.find(article => article.id === id);
};

// Helper function to search articles by keyword
export const searchArticles = (query) => {
  const lowerQuery = query.toLowerCase().trim();
  // Split query into individual words for better matching
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 0);
  
  return kbArticles
    .filter(article => {
      const searchableText = `${article.title} ${article.summary} ${article.keywords.join(' ')}`.toLowerCase();
      
      // If query has multiple words, check if all words appear in the article
      if (queryWords.length > 1) {
        return queryWords.every(word => searchableText.includes(word));
      }
      
      // Single word or exact phrase match
      return searchableText.includes(lowerQuery);
    })
    .sort((a, b) => {
      // Enhanced relevance scoring
      const searchableTextA = `${a.title} ${a.summary} ${a.keywords.join(' ')}`.toLowerCase();
      const searchableTextB = `${b.title} ${b.summary} ${b.keywords.join(' ')}`.toLowerCase();
      
      let aRelevance = 0;
      let bRelevance = 0;
      
      // Check each query word
      queryWords.forEach(word => {
        // Title match (highest weight)
        if (a.title.toLowerCase().includes(word)) aRelevance += 3;
        if (b.title.toLowerCase().includes(word)) bRelevance += 3;
        
        // Keyword match (high weight)
        if (a.keywords.some(k => k.toLowerCase().includes(word))) aRelevance += 2;
        if (b.keywords.some(k => k.toLowerCase().includes(word))) bRelevance += 2;
        
        // Summary match (lower weight)
        if (a.summary.toLowerCase().includes(word)) aRelevance += 1;
        if (b.summary.toLowerCase().includes(word)) bRelevance += 1;
      });
      
      // Bonus for exact phrase match in title
      if (a.title.toLowerCase().includes(lowerQuery)) aRelevance += 2;
      if (b.title.toLowerCase().includes(lowerQuery)) bRelevance += 2;
      
      return bRelevance - aRelevance;
    });
};

// Helper function to get related articles
export const getRelatedArticles = (articleId, limit = 3) => {
  const article = findArticleById(articleId);
  if (!article) return [];
  
  return article.relatedArticles
    .map(id => findArticleById(id))
    .filter(article => article !== undefined)
    .slice(0, limit);
};

