// Mock Chatbot Performance Metrics and Query Analytics
// For Requirements 9 and 10: Management & Monitoring Dashboard and Analytics & Predictive Insights

// Requirement 9: Chatbot Performance Metrics
export const chatbotPerformanceMetrics = {
  responseTime: {
    average: 1.2,
    p95: 2.1,
    p99: 3.5,
    unit: 'seconds',
    trend: 'down',
    change: -15,
    period: 'vs last week',
  },
  accuracy: {
    value: 91.3,
    trend: 'up',
    change: 2.1,
    period: 'vs last week',
    unit: '%',
  },
  userSatisfaction: {
    value: 4.6,
    trend: 'up',
    change: 0.3,
    period: 'vs last week',
    unit: '/5.0',
    totalRatings: 1247,
  },
  resolutionRate: {
    tier0: 58.2,
    tier1: 72.5,
    overall: 65.8,
    trend: 'up',
    change: 5.2,
    period: 'vs last week',
    unit: '%',
  },
  activeConversations: {
    current: 247,
    peak: 312,
    average: 189,
    capacity: 1000,
    percentage: 24.7,
  },
  uptime: {
    value: 99.8,
    period: 'last 30 days',
    unit: '%',
    incidents: 2,
    lastIncident: '2025-01-10 14:23',
  },
};

// Requirement 9: Recent Queries Monitoring
export const recentQueries = [
  {
    id: 'Q-2025-001',
    query: 'How do I reset my password?',
    timestamp: '2025-01-15 10:45:23',
    user: 'user@example.com',
    responseTime: 1.2,
    confidence: 0.95,
    resolved: true,
    clarifications: 0,
    source: 'KB-2024-003',
    satisfaction: 5,
  },
  {
    id: 'Q-2025-002',
    query: 'Lab access not working',
    timestamp: '2025-01-15 10:42:15',
    user: 'operator@example.com',
    responseTime: 2.3,
    confidence: 0.88,
    resolved: true,
    clarifications: 1,
    source: 'KB-2024-002',
    satisfaction: 4,
  },
  {
    id: 'Q-2025-003',
    query: 'What is PCTE?',
    timestamp: '2025-01-15 10:38:52',
    user: 'newuser@example.com',
    responseTime: 0.9,
    confidence: 0.97,
    resolved: true,
    clarifications: 0,
    source: 'KB-2024-001',
    satisfaction: 5,
  },
  {
    id: 'Q-2025-004',
    query: 'Training portal login issue',
    timestamp: '2025-01-15 10:35:11',
    user: 'manager@example.com',
    responseTime: 3.1,
    confidence: 0.72,
    resolved: false,
    clarifications: 2,
    source: null,
    escalated: true,
    satisfaction: 3,
  },
  {
    id: 'Q-2025-005',
    query: 'SSO configuration help',
    timestamp: '2025-01-15 10:30:44',
    user: 'admin@example.com',
    responseTime: 1.8,
    confidence: 0.92,
    resolved: true,
    clarifications: 0,
    source: 'KB-2024-015',
    satisfaction: 5,
  },
];

// Requirement 10: Frequent Query Topics
export const frequentQueryTopics = [
  {
    topic: 'Password Reset',
    count: 342,
    percentage: 28.5,
    trend: 'down',
    avgClarifications: 0.2,
    resolutionRate: 94.5,
    avgResponseTime: 1.1,
  },
  {
    topic: 'Lab Access',
    count: 298,
    percentage: 24.8,
    trend: 'up',
    avgClarifications: 1.3,
    resolutionRate: 78.2,
    avgResponseTime: 2.3,
  },
  {
    topic: 'Account Setup',
    count: 187,
    percentage: 15.6,
    trend: 'stable',
    avgClarifications: 0.8,
    resolutionRate: 85.6,
    avgResponseTime: 1.8,
  },
  {
    topic: 'Training Portal',
    count: 156,
    percentage: 13.0,
    trend: 'up',
    avgClarifications: 1.5,
    resolutionRate: 72.4,
    avgResponseTime: 2.7,
  },
  {
    topic: 'Network Issues',
    count: 134,
    percentage: 11.2,
    trend: 'down',
    avgClarifications: 2.1,
    resolutionRate: 65.3,
    avgResponseTime: 3.2,
  },
  {
    topic: 'SSO Configuration',
    count: 87,
    percentage: 7.2,
    trend: 'stable',
    avgClarifications: 0.5,
    resolutionRate: 91.2,
    avgResponseTime: 1.5,
  },
];

// Requirement 10: Resolution Path Metrics
export const resolutionPathMetrics = {
  // Totals for past 7 days
  totalChats7d: 1109,
  // Deflection = resolved without human escalation
  exchanges1: {
    count: 444,
    percentage: 40.0,
    avgResolutionTime: 1.1,
    satisfaction: 4.8,
  },
  exchanges2: {
    count: 124,
    percentage: 11.2,
    avgResolutionTime: 2.4,
    satisfaction: 4.5,
  },
  exchanges3: {
    count: 40,
    percentage: 3.6,
    avgResolutionTime: 3.8,
    satisfaction: 4.1,
  },
  exchanges4Plus: {
    count: 52,
    percentage: 4.7,
    avgResolutionTime: 5.1,
    satisfaction: 3.8,
  },
  escalated: {
    count: 449,
    percentage: 40.5,
    escalated: true,
  },
};

// Requirement 10: Clarification Patterns
export const clarificationPatterns = [
  // Among 216 chats resolved with >1 exchange over the past 7 days
  {
    pattern: 'User needs more context',
    frequency: 54,
    percentage: 25.0,
    avgOccurrences: 0,
    commonTopics: ['Lab Access', 'Training Portal'],
  },
  {
    pattern: 'Ambiguous query',
    frequency: 58,
    percentage: 27.0,
    avgOccurrences: 0,
    commonTopics: ['Network Issues', 'Account Setup'],
  },
  {
    pattern: 'Technical details needed',
    frequency: 50,
    percentage: 23.0,
    avgOccurrences: 0,
    commonTopics: ['SSO Configuration', 'Network Issues'],
  },
  {
    pattern: 'Multiple issues in one query',
    frequency: 54,
    percentage: 25.0,
    avgOccurrences: 0,
    commonTopics: ['Lab Access', 'Training Portal'],
  },
];

// Requirement 9: Chatbot Data Sources (for managing outdated information)
export const chatbotDataSources = [
  {
    id: 'source-001',
    name: 'Knowledge Base Articles',
    type: 'KB',
    articleCount: 1247,
    lastUpdated: '2025-01-15 10:00',
    status: 'active',
    outdatedCount: 12,
    accuracy: 0.95,
  },
  {
    id: 'source-002',
    name: 'Confluence Documentation',
    type: 'Confluence',
    articleCount: 892,
    lastUpdated: '2025-01-15 09:45',
    status: 'active',
    outdatedCount: 23,
    accuracy: 0.88,
  },
  {
    id: 'source-003',
    name: 'MKDocs User Guides',
    type: 'MKDocs',
    articleCount: 156,
    lastUpdated: '2025-01-15 09:30',
    status: 'active',
    outdatedCount: 5,
    accuracy: 0.92,
  },
  {
    id: 'source-004',
    name: 'Historical Tickets',
    type: 'Jira',
    articleCount: 54000,
    lastUpdated: '2025-01-15 08:00',
    status: 'active',
    outdatedCount: 1247,
    accuracy: 0.78,
    note: 'Includes resolved tickets for pattern learning',
  },
];

// Requirement 10: Query Volume Trend (chatbot-specific)
export const chatbotQueryVolumeTrend = [
  { date: '2025-01-01', queries: 142, resolved: 128, escalated: 14 },
  { date: '2025-01-02', queries: 158, resolved: 145, escalated: 13 },
  { date: '2025-01-03', queries: 167, resolved: 152, escalated: 15 },
  { date: '2025-01-04', queries: 173, resolved: 162, escalated: 11 },
  { date: '2025-01-05', queries: 189, resolved: 178, escalated: 11 },
  { date: '2025-01-06', queries: 201, resolved: 187, escalated: 14 },
  { date: '2025-01-07', queries: 215, resolved: 198, escalated: 17 },
  { date: '2025-01-08', queries: 223, resolved: 208, escalated: 15 },
  { date: '2025-01-09', queries: 234, resolved: 219, escalated: 15 },
  { date: '2025-01-10', queries: 247, resolved: 231, escalated: 16 },
  { date: '2025-01-11', queries: 256, resolved: 241, escalated: 15 },
  { date: '2025-01-12', queries: 268, resolved: 252, escalated: 16 },
  { date: '2025-01-13', queries: 274, resolved: 258, escalated: 16 },
  { date: '2025-01-14', queries: 281, resolved: 265, escalated: 16 },
  { date: '2025-01-15', queries: 289, resolved: 273, escalated: 16 },
];

// Requirement 10: Frequent Keywords
export const frequentKeywords = [
  { keyword: 'password', count: 342, percentage: 28.5 },
  { keyword: 'reset', count: 298, percentage: 24.8 },
  { keyword: 'access', count: 267, percentage: 22.3 },
  { keyword: 'login', count: 234, percentage: 19.5 },
  { keyword: 'lab', count: 198, percentage: 16.5 },
  { keyword: 'error', count: 187, percentage: 15.6 },
  { keyword: 'account', count: 156, percentage: 13.0 },
  { keyword: 'network', count: 134, percentage: 11.2 },
  { keyword: 'portal', count: 123, percentage: 10.3 },
  { keyword: 'configuration', count: 98, percentage: 8.2 },
  { keyword: 'training', count: 87, percentage: 7.3 },
  { keyword: 'environment', count: 76, percentage: 6.3 },
  { keyword: 'setup', count: 72, percentage: 6.0 },
  { keyword: 'troubleshoot', count: 68, percentage: 5.7 },
  { keyword: 'connection', count: 65, percentage: 5.4 },
  { keyword: 'permission', count: 61, percentage: 5.1 },
  { keyword: 'dashboard', count: 58, percentage: 4.8 },
  { keyword: 'deployment', count: 54, percentage: 4.5 },
  { keyword: 'integration', count: 51, percentage: 4.3 },
  { keyword: 'authentication', count: 48, percentage: 4.0 },
  { keyword: 'session', count: 45, percentage: 3.8 },
  { keyword: 'timeout', count: 42, percentage: 3.5 },
  { keyword: 'credentials', count: 39, percentage: 3.3 },
  { keyword: 'firewall', count: 37, percentage: 3.1 },
  { keyword: 'certificate', count: 35, percentage: 2.9 },
  { keyword: 'backup', count: 33, percentage: 2.8 },
  { keyword: 'restore', count: 31, percentage: 2.6 },
  { keyword: 'migration', count: 29, percentage: 2.4 },
  { keyword: 'update', count: 27, percentage: 2.3 },
  { keyword: 'install', count: 25, percentage: 2.1 },
  { keyword: 'uninstall', count: 23, percentage: 1.9 },
  { keyword: 'performance', count: 21, percentage: 1.8 },
  { keyword: 'latency', count: 19, percentage: 1.6 },
  { keyword: 'bandwidth', count: 17, percentage: 1.4 },
  { keyword: 'storage', count: 15, percentage: 1.3 },
  { keyword: 'recovery', count: 13, percentage: 1.1 },
  { keyword: 'security', count: 11, percentage: 0.9 },
  { keyword: 'encryption', count: 9, percentage: 0.8 },
  { keyword: 'compliance', count: 7, percentage: 0.6 },
  { keyword: 'monitoring', count: 5, percentage: 0.4 },
];

// Sentiment associations with topics
export const topicSentiments = [
  {
    topic: 'Password Reset',
    neutral: 285,
    frustrated: 28,
    satisfied: 12,
    total: 325,
    frustratedPercentage: 8.6,
  },
  {
    topic: 'Lab Access',
    neutral: 198,
    frustrated: 30,
    satisfied: 22,
    total: 250,
    frustratedPercentage: 12.0,
  },
  {
    topic: 'Account Setup',
    neutral: 145,
    frustrated: 32,
    satisfied: 10,
    total: 187,
    frustratedPercentage: 17.1,
  },
  {
    topic: 'Training Portal',
    neutral: 98,
    frustrated: 25,
    satisfied: 13,
    total: 136,
    frustratedPercentage: 18.4,
  },
  {
    topic: 'Network Issues',
    neutral: 67,
    frustrated: 54,
    satisfied: 13,
    total: 134,
    frustratedPercentage: 40.3,
  },
  {
    topic: 'SSO Configuration',
    neutral: 72,
    frustrated: 12,
    satisfied: 3,
    total: 87,
    frustratedPercentage: 13.8,
  },
];

// User Context/Corrective Prompts Metrics
export const correctivePromptMetrics = {
  totalQueries: 1247,
  queriesNeedingContext: 505,
  queriesNeedingCorrection: 187,
  avgContextPrompts: 1.2,
  avgCorrectionPrompts: 0.8,
  breakdown: {
    zeroPrompts: {
      count: 555,
      percentage: 44.5,
      resolutionRate: 94.2,
    },
    onePrompt: {
      count: 312,
      percentage: 25.0,
      resolutionRate: 85.6,
    },
    twoPrompts: {
      count: 234,
      percentage: 18.8,
      resolutionRate: 72.3,
    },
    threePlusPrompts: {
      count: 146,
      percentage: 11.7,
      resolutionRate: 58.9,
      escalated: true,
    },
  },
};
export const chatbotPredictiveInsights = [
  {
    type: 'escalation_risk',
    message: 'Rising 3+ clarification cases for "Training Portal" indicate elevated escalation risk',
    confidence: 84,
    window: 'Last 14 days',
    recommendedAction: 'Publish a guided runbook for Training Portal access issues and auto-route low-confidence cases to Tier 1',
    severity: 'warning',
  },
  {
    type: 'knowledge_gap',
    message: 'High clarification rate (2.1 avg) detected for "Network Issues" queries',
    confidence: 92,
    recommendedAction: 'Create comprehensive KB article for common network troubleshooting steps',
    severity: 'info',
  },
  {
    type: 'accuracy_trend',
    message: 'Response accuracy improving for "Password Reset" queries (94.5% resolution rate)',
    confidence: 95,
    recommendedAction: 'Consider promoting Password Reset to Tier 0 self-service',
    severity: 'success',
  },
];

