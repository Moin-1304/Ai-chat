// Mock External System Search Results
// Used for AI-powered search functionality

export const mockExternalResults = {
  'password': [
    {
      id: 'EXT-JIRA-001',
      title: 'Password Reset Request - Account Locked',
      source: 'Jira',
      type: 'Ticket',
      summary: 'Recent ticket for password reset issue with account lockout',
      url: '#',
      relevance: 0.92,
      timestamp: '2025-01-14',
    },
    {
      id: 'EXT-CONF-045',
      title: 'Password Policy Update - January 2025',
      source: 'Confluence',
      type: 'Article',
      summary: 'Updated password requirements and security policies',
      url: '#',
      relevance: 0.88,
      timestamp: '2025-01-10',
    },
  ],
  'lab': [
    {
      id: 'EXT-JIRA-089',
      title: 'Lab Environment Access Issue - Module 3',
      source: 'Jira',
      type: 'Ticket',
      summary: 'Similar issue reported last week, resolved through module enrollment verification',
      url: '#',
      relevance: 0.94,
      timestamp: '2025-01-13',
    },
    {
      id: 'EXT-CONF-112',
      title: 'Lab Environment Maintenance Schedule',
      source: 'Confluence',
      type: 'Documentation',
      summary: 'Weekly maintenance windows and lab availability calendar',
      url: '#',
      relevance: 0.85,
      timestamp: '2025-01-08',
    },
  ],
  'training': [
    {
      id: 'EXT-MKDOCS-234',
      title: 'Training Portal API Documentation',
      source: 'MKDocs',
      type: 'Technical Docs',
      summary: 'Complete API reference for training portal integration',
      url: '#',
      relevance: 0.91,
      timestamp: '2025-01-12',
    },
    {
      id: 'EXT-CONF-078',
      title: 'Training Completion Tracking',
      source: 'Confluence',
      type: 'Guide',
      summary: 'How to track training progress and certifications',
      url: '#',
      relevance: 0.87,
      timestamp: '2025-01-09',
    },
  ],
  'error': [
    {
      id: 'EXT-JIRA-156',
      title: 'Error Code ACC-001 Resolution',
      source: 'Jira',
      type: 'Ticket',
      summary: 'Recent resolution for access denied error',
      url: '#',
      relevance: 0.93,
      timestamp: '2025-01-11',
    },
    {
      id: 'EXT-CONF-089',
      title: 'Error Code Reference - Q4 2024',
      source: 'Confluence',
      type: 'Reference',
      summary: 'Comprehensive error code lookup table',
      url: '#',
      relevance: 0.89,
      timestamp: '2024-12-20',
    },
  ],
  'network': [
    {
      id: 'EXT-JIRA-201',
      title: 'VPN Connection Issues - Network Team',
      source: 'Jira',
      type: 'Ticket',
      summary: 'Related network connectivity troubleshooting',
      url: '#',
      relevance: 0.90,
      timestamp: '2025-01-13',
    },
    {
      id: 'EXT-CONF-134',
      title: 'Network Architecture Diagram',
      source: 'Confluence',
      type: 'Documentation',
      summary: 'Network topology and firewall configuration',
      url: '#',
      relevance: 0.86,
      timestamp: '2025-01-05',
    },
  ],
  'access': [
    {
      id: 'EXT-JIRA-145',
      title: 'Lab Access Request - Bulk Assignment',
      source: 'Jira',
      type: 'Ticket',
      summary: 'Similar access request pattern',
      url: '#',
      relevance: 0.91,
      timestamp: '2025-01-12',
    },
    {
      id: 'EXT-CONF-098',
      title: 'Access Control Matrix',
      source: 'Confluence',
      type: 'Reference',
      summary: 'Role-based access permissions guide',
      url: '#',
      relevance: 0.88,
      timestamp: '2025-01-07',
    },
  ],
};

// Get external results for a search query
export const getExternalResults = (query) => {
  const lowerQuery = query.toLowerCase();
  const results = [];
  
  // Check each category
  for (const [category, items] of Object.entries(mockExternalResults)) {
    if (lowerQuery.includes(category)) {
      results.push(...items);
    }
  }
  
  // If no specific match, return generic results
  if (results.length === 0) {
    return [
      {
        id: 'EXT-CONF-GEN',
        title: 'General Help Documentation',
        source: 'Confluence',
        type: 'Article',
        summary: 'General help and troubleshooting resources',
        url: '#',
        relevance: 0.75,
        timestamp: '2025-01-10',
      },
    ];
  }
  
  // Sort by relevance
  return results.sort((a, b) => b.relevance - a.relevance);
};
