// Mock Configuration Data for Screen 5: Configuration Interface
// Based on Build Plan requirements

export const kbArticles = [
  {
    id: 'KB-2024-001',
    title: 'Getting Started with PCTE',
    status: 'Live',
    source: 'Confluence',
    lastUpdated: '2025-01-10 14:30',
    views: 1247,
    confidence: 0.98,
    version: '2.3',
  },
  {
    id: 'KB-2024-002',
    title: 'Lab Access Troubleshooting Guide',
    status: 'Live',
    source: 'MKDocs',
    lastUpdated: '2025-01-08 09:15',
    views: 892,
    confidence: 0.95,
    version: '1.5',
  },
  {
    id: 'KB-2024-003',
    title: 'Password Reset Procedures',
    status: 'Live',
    source: 'Confluence',
    lastUpdated: '2025-01-05 11:22',
    views: 756,
    confidence: 0.97,
    version: '3.1',
  },
  {
    id: 'KB-2024-015',
    title: 'SSO Configuration Guide',
    status: 'Live',
    source: 'MKDocs',
    lastUpdated: '2024-12-20 16:45',
    views: 543,
    confidence: 0.92,
    version: '1.2',
  },
  {
    id: 'KB-2023-128',
    title: 'Legacy VPN Setup Instructions',
    status: 'Old',
    source: 'Confluence',
    lastUpdated: '2023-11-15 10:00',
    views: 234,
    confidence: 0.65,
    version: '1.0',
  },
  {
    id: 'KB-2022-045',
    title: 'Deprecated Training Portal Access',
    status: 'Archive',
    source: 'Confluence',
    lastUpdated: '2022-08-10 08:30',
    views: 12,
    confidence: 0.20,
    version: '0.9',
  },
];

export const escalationRules = [
  {
    id: 'rule-001',
    name: 'High Priority Auto-Escalate',
    description: 'Automatically escalate to Tier 2 if ticket priority is Critical and SLA risk detected',
    conditions: [
      { field: 'Priority', operator: 'equals', value: 'Critical' },
      { field: 'SLA Risk', operator: 'equals', value: 'High' },
    ],
    action: 'Escalate to Tier 2',
    enabled: true,
  },
  {
    id: 'rule-002',
    name: 'Sentiment-Based Routing',
    description: 'Route frustrated users to Tier 1 for faster response',
    conditions: [
      { field: 'Sentiment', operator: 'equals', value: 'Frustrated' },
      { field: 'Sentiment Score', operator: 'greater_than', value: '0.75' },
    ],
    action: 'Route to Tier 1',
    enabled: true,
  },
];

export const modelSettings = {
  confidenceThreshold: 0.85,
  sentimentSensitivity: 0.70,
  retrainingFrequency: 'weekly',
  lastRetraining: '2025-01-08 03:00',
  nextRetraining: '2025-01-15 03:00',
  dataRetentionDays: 90,
  privacyControls: {
    piiRedaction: true,
    sensitiveDataMasking: true,
    dataMinimization: true,
  },
  compliance: {
    cuiCompliant: true,
    nist800171: true,
    iso27001: true,
    fedramp: true,
  },
};

export const auditLogs = [
  {
    timestamp: '2025-01-15 10:23',
    user: 'Adam Admin',
    action: 'KB Article Updated',
    resource: 'KB-2024-001',
    status: 'Success',
  },
  {
    timestamp: '2025-01-15 09:45',
    user: 'Adam Admin',
    action: 'Escalation Rule Modified',
    resource: 'rule-002',
    status: 'Success',
  },
  {
    timestamp: '2025-01-15 08:12',
    user: 'System',
    action: 'Model Retraining Completed',
    resource: 'v2.3.1',
    status: 'Success',
  },
  {
    timestamp: '2025-01-14 16:30',
    user: 'Adam Admin',
    action: 'Configuration Exported',
    resource: 'config-backup-2025-01-14.json',
    status: 'Success',
  },
  {
    timestamp: '2025-01-14 14:15',
    user: 'Alex Analyst',
    action: 'KB Article Viewed',
    resource: 'KB-2024-003',
    status: 'Success',
  },
];

export const integrationSettings = {
  mkdocs: {
    enabled: true,
    lastSync: '2025-01-15 09:00',
    syncInterval: '1 hour',
    articleCount: 156,
    autoImport: true,
  },
  confluence: {
    enabled: true,
    lastSync: '2025-01-15 10:00',
    syncInterval: '5 minutes',
    articleCount: 892,
    autoImport: true,
  },
  sso: {
    provider: 'Red Hat SSO',
    enabled: true,
    lastTest: '2025-01-15 10:15',
    status: 'Connected',
  },
  deployment: {
    type: 'Containerized',
    platform: 'Kubernetes (TKG)',
    containers: 'Docker',
    namespace: 'pcte-help-desk',
    version: '2.3.1',
  },
};

