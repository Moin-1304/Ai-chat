// Mock Security & Compliance Data for Screen 9: Security & Compliance Dashboard

export const securityKPIs = {
  activeUsers: {
    count: 247,
    trend: 'up',
    trendValue: 12,
  },
  failedLoginAttempts24h: {
    count: 3,
    threshold: 10,
    isAlert: false,
  },
  auditEvents24h: {
    count: 1247,
    breakdown: {
      successful: 1244,
      failed: 3,
    },
  },
  cuiComplianceStatus: {
    status: 'Compliant',
    isCompliant: true,
  },
};

export const rbacRoles = [
  {
    id: 'role-admin',
    name: 'Administrator',
    userCount: 3,
    permissions: [
      'View Tickets',
      'Edit Tickets',
      'Manage KB',
      'Configure System',
      'View Analytics',
      'Export Reports',
      'Manage Users',
      'Manage Roles',
      'View Audit Logs',
      'Generate Compliance Reports',
    ],
    description: 'Full system access with all permissions',
  },
  {
    id: 'role-helpdesk',
    name: 'Help Desk Staff',
    userCount: 15,
    permissions: [
      'View Tickets',
      'Edit Tickets',
      'Manage KB',
      'View Analytics',
      'Export Reports',
    ],
    description: 'Standard help desk operations',
  },
  {
    id: 'role-user',
    name: 'User',
    userCount: 220,
    permissions: [
      'View Tickets',
      'Create Tickets',
      'View KB Articles',
    ],
    description: 'Standard user access',
  },
  {
    id: 'role-viewer',
    name: 'Viewer',
    userCount: 9,
    permissions: [
      'View Tickets',
      'View KB Articles',
      'View Analytics',
    ],
    description: 'Read-only access',
  },
];

export const permissionsMatrix = {
  permissions: [
    'View Tickets',
    'Edit Tickets',
    'Create Tickets',
    'Manage KB',
    'Configure System',
    'View Analytics',
    'Export Reports',
    'Manage Users',
    'Manage Roles',
    'View Audit Logs',
    'Generate Compliance Reports',
  ],
  roles: rbacRoles,
};

export const userAssignments = {
  'Administrator': [
    'Adam Admin',
    'System Admin',
    'Security Admin',
  ],
  'Help Desk Staff': [
    'Alex Analyst',
    'Sarah Support',
    'Mike Manager',
    'Jane Junior',
    'Tom Technician',
    'Lisa Lead',
    'Bob Backup',
    'Chris Consultant',
    'Diana Desk',
    'Eve Expert',
    'Frank Frontline',
    'Grace Guide',
    'Henry Helper',
    'Ivy Informant',
    'Jack Junior',
  ],
  'User': [
    // Sample user names (total 220 users)
    'User1', 'User2', 'User3', /* ... 217 more users */],
  'Viewer': [
    'Viewer1',
    'Viewer2',
    'Viewer3',
    'Viewer4',
    'Viewer5',
    'Viewer6',
    'Viewer7',
    'Viewer8',
    'Viewer9',
  ],
};

export const dataProtection = {
  encryption: {
    atRest: {
      status: 'Enabled',
      algorithm: 'AES-256',
      isCompliant: true,
    },
    inTransit: {
      status: 'Enabled',
      protocol: 'TLS 1.3',
      isCompliant: true,
    },
    keyRotation: {
      lastRotated: 'January 1, 2025',
      nextRotation: 'April 1, 2025',
      frequency: 'Quarterly',
    },
  },
  dataRetention: {
    auditLogs: {
      duration: '90 days',
      configurable: true,
    },
    tickets: {
      duration: '2 years',
      configurable: true,
    },
    userSessions: {
      duration: '30 days',
      configurable: false,
    },
    kbArticles: {
      duration: 'Permanent',
      configurable: false,
    },
  },
  privacyControls: {
    piiRedaction: {
      status: 'Enabled',
      isCompliant: true,
    },
    sensitiveDataMasking: {
      status: 'Enabled',
      isCompliant: true,
    },
    dataMinimization: {
      status: 'Enabled',
      isCompliant: true,
    },
    gdprCompliance: {
      status: 'Compliant',
      isCompliant: true,
    },
  },
};

export const complianceStatus = {
  cui: {
    status: 'Compliant',
    isCompliant: true,
    lastAudit: 'November 15, 2024',
    nextAudit: 'May 15, 2025',
    complianceScore: 100,
  },
  nist800171: {
    status: 'Implemented',
    isCompliant: true,
    controlsImplemented: 110,
    controlsTotal: 110,
    complianceScore: 100,
    lastAssessment: 'October 15, 2024',
    nextAssessment: 'April 15, 2025',
  },
  iso27001: {
    status: 'Certified',
    isCompliant: true,
    certificateNumber: 'ISO-27001-2024-001',
    issueDate: 'January 15, 2024',
    expiryDate: 'December 31, 2026',
    complianceScore: 100,
  },
  fedramp: {
    status: 'Ready',
    isCompliant: true,
    assessmentLevel: 'Moderate',
    assessmentDate: 'October 10, 2024',
    nextAssessment: 'October 10, 2025',
    complianceScore: 95,
  },
};

export const securityAlerts = [
  {
    id: 'alert-001',
    type: 'warning',
    severity: 'low',
    title: 'Failed Login Attempts',
    message: '3 failed login attempts detected in the last 24 hours from IP 192.168.1.99',
    timestamp: '2025-01-15 14:15:08',
    resolved: false,
  },
  {
    id: 'alert-002',
    type: 'info',
    severity: 'low',
    title: 'Compliance Audit Reminder',
    message: 'Next CUI compliance audit scheduled for May 15, 2025',
    timestamp: '2025-01-15 00:00:00',
    resolved: false,
  },
];

export const complianceReports = [
  {
    id: 'report-001',
    type: 'NIST 800-171',
    generatedDate: '2025-01-10',
    generatedBy: 'Adam Admin',
    status: 'Completed',
    downloadUrl: '#',
  },
  {
    id: 'report-002',
    type: 'ISO 27001',
    generatedDate: '2025-01-05',
    generatedBy: 'Adam Admin',
    status: 'Completed',
    downloadUrl: '#',
  },
  {
    id: 'report-003',
    type: 'FedRAMP',
    generatedDate: '2024-12-20',
    generatedBy: 'System Admin',
    status: 'Completed',
    downloadUrl: '#',
  },
  {
    id: 'report-004',
    type: 'Custom',
    generatedDate: '2024-12-15',
    generatedBy: 'Security Admin',
    status: 'Completed',
    downloadUrl: '#',
  },
];

export const availableReportTypes = [
  'NIST 800-171',
  'ISO 27001',
  'FedRAMP',
  'Custom',
];

