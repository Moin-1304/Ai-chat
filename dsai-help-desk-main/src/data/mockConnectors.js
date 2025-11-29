// Mock Connector Data for Screen 7: System Integration Status
// Based on Build Plan requirements

export const connectors = [
  {
    id: 'jira',
    name: 'Jira',
    logo: 'jira', // Will use icon or placeholder
    status: 'Connected',
    statusColor: '#4A7C59',
    lastSync: '2 min ago',
    lastSyncTimestamp: '2025-01-15 14:28',
    syncCount: 1247,
    syncCountLabel: 'tickets synced',
    syncThroughput: 847,
    throughputLabel: 'records/hour',
    connectionType: 'REST API',
    actionButtons: ['Sync Now'],
  },
  {
    id: 'confluence',
    name: 'Confluence',
    logo: 'confluence',
    status: 'Connected',
    statusColor: '#4A7C59',
    lastSync: '5 min ago',
    lastSyncTimestamp: '2025-01-15 14:25',
    syncCount: 892,
    syncCountLabel: 'articles synced',
    syncThroughput: 156,
    throughputLabel: 'records/hour',
    connectionType: 'REST API',
    actionButtons: ['Sync Now'],
  },
  {
    id: 'mkdocs',
    name: 'MKDocs',
    logo: 'mkdocs',
    status: 'Connected',
    statusColor: '#4A7C59',
    lastSync: '1 hour ago',
    lastSyncTimestamp: '2025-01-15 13:30',
    syncCount: 156,
    syncCountLabel: 'articles synced',
    syncThroughput: 12,
    throughputLabel: 'records/hour',
    connectionType: 'Git Sync',
    autoSync: true,
    actionButtons: ['Sync Now'],
  },
  {
    id: 'mattermost',
    name: 'Mattermost',
    logo: 'mattermost',
    status: 'Connected',
    statusColor: '#4A7C59',
    lastSync: 'Real-time',
    lastSyncTimestamp: '2025-01-15 14:30',
    syncCount: 3421,
    syncCountLabel: 'messages processed',
    connectionType: 'WebSocket',
    realTime: true,
    actionButtons: [],
  },
];

export const dataFlowMetrics = {
  totalRecordsSynced: 54000,
  syncSuccessRate: 99.8,
  averageSyncLatency: 2.3, // seconds
  webhookDeliverySuccessRate: 99.8,
  averageWebhookLatency: 340, // milliseconds
  queueDepth: 12,
};

export const integrationPerformance = {
  jira: {
    throughput: 847,
    unit: 'records/hour',
    avgLatency: 2.1,
  },
  confluence: {
    throughput: 156,
    unit: 'records/hour',
    avgLatency: 4.2,
  },
  mkdocs: {
    throughput: 12,
    unit: 'records/hour',
    avgLatency: 85.5,
  },
  mattermost: {
    throughput: 3421,
    unit: 'messages/hour',
    avgLatency: 0.15,
  },
};

