// Mock Analytics Data for Screen 4: Executive Analytics Dashboard
// Based on Build Plan requirements

export const kpiMetrics = {
  ticketsResolved: {
    value: 1247,
    change: 12,
    trend: 'up',
    label: 'Tickets Resolved',
    period: 'vs last month',
    icon: 'CheckCircle',
  },
  slaCompliance: {
    value: 94.2,
    change: 3,
    trend: 'up',
    label: 'SLA Compliance',
    period: 'vs last month',
    icon: 'Schedule',
    unit: '%',
  },
  avgResolutionTime: {
    value: 2.3,
    change: -8,
    trend: 'down',
    label: 'Avg Resolution Time',
    period: 'vs last month',
    icon: 'Timer',
    unit: 'h',
  },
  aiAccuracy: {
    value: 91.3,
    change: 2,
    trend: 'up',
    label: 'AI Accuracy',
    period: 'vs last month',
    icon: 'Psychology',
    unit: '%',
  },
  tier0Resolution: {
    value: 59.5,
    change: 5,
    trend: 'up',
    label: 'Tier 0 Resolution',
    period: 'vs last month',
    icon: 'SelfImprovement',
    unit: '%',
  },
  escalationRate: {
    value: 12,
    change: 2,
    trend: 'up',
    label: 'Escalation Rate',
    period: 'vs last month',
    icon: 'TrendingUp',
    unit: '%',
  },
};

// Ticket volume trend data (last 30 days - leading up to November 12, 2025)
export const ticketVolumeTrend = [
  { date: '2025-10-13', tickets: 42 },
  { date: '2025-10-14', tickets: 38 },
  { date: '2025-10-15', tickets: 45 },
  { date: '2025-10-16', tickets: 51 },
  { date: '2025-10-17', tickets: 48 },
  { date: '2025-10-18', tickets: 52 },
  { date: '2025-10-19', tickets: 49 },
  { date: '2025-10-20', tickets: 35 },
  { date: '2025-10-21', tickets: 28 },
  { date: '2025-10-22', tickets: 47 },
  { date: '2025-10-23', tickets: 53 },
  { date: '2025-10-24', tickets: 55 },
  { date: '2025-10-25', tickets: 58 },
  { date: '2025-10-26', tickets: 61 },
  { date: '2025-10-27', tickets: 59 },
  { date: '2025-10-28', tickets: 32 },
  { date: '2025-10-29', tickets: 54 },
  { date: '2025-10-30', tickets: 62 },
  { date: '2025-10-31', tickets: 67 },
  { date: '2025-11-01', tickets: 71 },
  { date: '2025-11-02', tickets: 68 },
  { date: '2025-11-03', tickets: 74 },
  { date: '2025-11-04', tickets: 76 },
  { date: '2025-11-05', tickets: 73 },
  { date: '2025-11-06', tickets: 79 },
  { date: '2025-11-07', tickets: 82 },
  { date: '2025-11-08', tickets: 85 },
  { date: '2025-11-09', tickets: 88 },
  { date: '2025-11-10', tickets: 91 },
  { date: '2025-11-11', tickets: 94 },
  { date: '2025-11-12', tickets: 96 },
];

// Top issue categories (for horizontal bar chart)
export const topIssueCategories = [
  { category: 'Lab Access', count: 342, percentage: 28.5, trend: 'up' },
  { category: 'Password Reset', count: 298, percentage: 24.8, trend: 'down' },
  { category: 'Network Issues', count: 187, percentage: 15.6, trend: 'stable' },
  { category: 'Account Setup', count: 156, percentage: 13.0, trend: 'up' },
  { category: 'Training Portal', count: 134, percentage: 11.2, trend: 'stable' },
  { category: 'Integration Errors', count: 87, percentage: 7.2, trend: 'down' },
];

// Predictive alert
export const predictiveAlert = {
  active: true,
  message: '35% increase forecasted before training event',
  forecastDate: '2025-11-20',
  confidence: 87,
  severity: 'warning',
  recommendedAction: 'Increase Tier 0 staffing and verify KB articles are current',
};

// System Performance Indicators
export const systemPerformance = {
  dashboardLoadTime: {
    value: 1.2,
    unit: 'seconds',
    status: 'good',
    threshold: 2.0,
  },
  dataRefreshInterval: {
    value: 5,
    unit: 'minutes',
    status: 'good',
  },
  activeConcurrentUsers: {
    value: 247,
    capacity: 1000,
    percentage: 24.7,
    status: 'good',
    threshold: 80,
  },
  systemUptime: {
    value: 99.8,
    unit: '%',
    status: 'good',
    threshold: 99.5,
    period: 'last 30 days',
  },
};

// Realistic PCTE metrics context
export const pcteMetrics = {
  totalHistoricalTickets: 54000,
  concurrentUserRange: '250-1,000',
  dateRange: 'Last 30 days',
};

