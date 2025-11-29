// Mock Model Versioning Data for Screen 8: Model Versioning & Continuous Learning
// Based on Build Plan requirements

export const currentModel = {
  version: 'v2.3.1',
  releaseDate: 'October 29, 2025',
  status: 'Active',
  statusColor: '#4A7C59',
  nextRetraining: 'November 15, 2025',
  performance: {
    overallAccuracy: 91.3,
    overallAccuracyChange: 2.1,
    classificationAccuracy: 94.2,
    sentimentDetectionAccuracy: 88.7,
    responseRelevance: 92.5,
  },
};

export const modelVersions = [
  {
    version: 'v2.3.1',
    releaseDate: '2025-10-29',
    status: 'Active',
    statusColor: '#4A7C59',
    accuracy: 91.3,
    improvement: 2.1,
  },
  {
    version: 'v2.3.0',
    releaseDate: '2025-10-15',
    status: 'Rolled back',
    statusColor: '#FF9500',
    accuracy: 89.2,
    improvement: 1.8,
  },
  {
    version: 'v2.2.5',
    releaseDate: '2025-09-28',
    status: 'Archived',
    statusColor: '#6C757D',
    accuracy: 87.4,
    improvement: 1.5,
  },
  {
    version: 'v2.2.0',
    releaseDate: '2025-09-10',
    status: 'Archived',
    statusColor: '#6C757D',
    accuracy: 85.9,
    improvement: 1.2,
  },
  {
    version: 'v2.1.0',
    releaseDate: '2025-08-15',
    status: 'Archived',
    statusColor: '#6C757D',
    accuracy: 84.7,
    improvement: 0.8,
  },
];

export const retrainingEvents = [
  {
    id: 'rt-001',
    date: '2025-10-29',
    version: 'v2.3.1',
    dataIncorporated: {
      newTickets: 500,
      kbArticles: 50,
      userFeedback: 120,
      staffCorrections: 25,
    },
    trainingDuration: '4h 32m',
    metricsImprovement: {
      overallAccuracy: 2.1,
      classificationAccuracy: 1.8,
      sentimentAccuracy: 2.3,
      responseRelevance: 1.9,
    },
    status: 'Active',
    statusColor: '#4A7C59',
  },
  {
    id: 'rt-002',
    date: '2025-10-15',
    version: 'v2.3.0',
    dataIncorporated: {
      newTickets: 1200,
      kbArticles: 120,
      userFeedback: 250,
      staffCorrections: 45,
    },
    trainingDuration: '6h 15m',
    metricsImprovement: {
      overallAccuracy: 1.8,
      classificationAccuracy: 1.5,
      sentimentAccuracy: 2.0,
      responseRelevance: 1.6,
    },
    status: 'Rolled back',
    statusColor: '#FF9500',
    rollbackReason: 'Performance degradation detected in production: Overall accuracy dropped to 87.2% (from 89.2% expected) due to new training data causing classification errors on ticket priority.',
    rollbackDate: '2025-10-20',
    rolledBackTo: 'v2.2.5',
    accuracyBeforeRollback: 87.2,
    expectedAccuracy: 89.2,
    accuracyDrop: -2.0,
  },
  {
    id: 'rt-003',
    date: '2025-09-28',
    version: 'v2.2.5',
    dataIncorporated: {
      newTickets: 800,
      kbArticles: 80,
      userFeedback: 180,
      staffCorrections: 32,
    },
    trainingDuration: '5h 20m',
    metricsImprovement: {
      overallAccuracy: 1.5,
      classificationAccuracy: 1.3,
      sentimentAccuracy: 1.7,
      responseRelevance: 1.4,
    },
    status: 'Archived',
    statusColor: '#6C757D',
  },
  {
    id: 'rt-004',
    date: '2025-09-10',
    version: 'v2.2.0',
    dataIncorporated: {
      newTickets: 600,
      kbArticles: 60,
      userFeedback: 150,
      staffCorrections: 28,
    },
    trainingDuration: '4h 48m',
    metricsImprovement: {
      overallAccuracy: 1.2,
      classificationAccuracy: 1.1,
      sentimentAccuracy: 1.4,
      responseRelevance: 1.2,
    },
    status: 'Archived',
    statusColor: '#6C757D',
  },
  {
    id: 'rt-005',
    date: '2025-08-15',
    version: 'v2.1.0',
    dataIncorporated: {
      newTickets: 450,
      kbArticles: 45,
      userFeedback: 110,
      staffCorrections: 20,
    },
    trainingDuration: '3h 55m',
    metricsImprovement: {
      overallAccuracy: 0.8,
      classificationAccuracy: 0.9,
      sentimentAccuracy: 1.0,
      responseRelevance: 0.8,
    },
    status: 'Archived',
    statusColor: '#6C757D',
  },
  {
    id: 'rt-006',
    date: '2025-07-15',
    version: 'v2.0.5',
    dataIncorporated: {
      newTickets: 350,
      kbArticles: 35,
      userFeedback: 90,
      staffCorrections: 15,
    },
    trainingDuration: '3h 30m',
    metricsImprovement: {
      overallAccuracy: 0.6,
      classificationAccuracy: 0.7,
      sentimentAccuracy: 0.8,
      responseRelevance: 0.6,
    },
    status: 'Archived',
    statusColor: '#6C757D',
  },
];

export const dataIncorporationSources = {
  historicalTickets: 54000,
  userFeedback: 1200,
  kbUpdates: 892,
  staffCorrections: 340,
  failedQueryPatterns: 156,
};

export const retrainingConfig = {
  frequency: 'Weekly',
  lastRetraining: '2025-10-29 03:00',
  nextRetraining: '2025-11-15 03:00',
  triggerConditions: {
    newTickets: 500,
    kbUpdates: 50,
    logic: 'OR',
  },
};

export const rollbackHistory = [
  {
    id: 'rb-001',
    date: '2025-10-20',
    fromVersion: 'v2.3.0',
    toVersion: 'v2.2.5',
    reason: 'Accuracy drop detected in production',
    performedBy: 'Admin User',
  },
];

export const obsoleteInformation = [
  {
    id: 'obs-001',
    type: 'KB Article',
    name: 'Legacy VPN Setup Instructions',
    removedDate: '2025-10-25',
    reason: 'Deprecated feature - replaced with new authentication system',
  },
  {
    id: 'obs-002',
    type: 'Training Data',
    name: 'Old ticket patterns (Pre-2024)',
    removedDate: '2025-10-20',
    reason: 'Training data outdated - system architecture changed',
  },
];

// Performance chart data for visualization
export const performanceChartData = {
  labels: retrainingEvents.map((e) => e.date).reverse(),
  datasets: [
    {
      label: 'Overall Accuracy',
      data: retrainingEvents.map((e) => e.metricsImprovement.overallAccuracy + (retrainingEvents[retrainingEvents.indexOf(e) + 1]?.metricsImprovement.overallAccuracy || 0)).reverse(),
      borderColor: '#D4AF37',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      fill: true,
    },
    {
      label: 'Classification Accuracy',
      data: retrainingEvents.map((e) => e.metricsImprovement.classificationAccuracy + (retrainingEvents[retrainingEvents.indexOf(e) + 1]?.metricsImprovement.classificationAccuracy || 0)).reverse(),
      borderColor: '#4A7C59',
      backgroundColor: 'rgba(74, 124, 89, 0.1)',
      fill: true,
    },
    {
      label: 'Sentiment Accuracy',
      data: retrainingEvents.map((e) => e.metricsImprovement.sentimentAccuracy + (retrainingEvents[retrainingEvents.indexOf(e) + 1]?.metricsImprovement.sentimentAccuracy || 0)).reverse(),
      borderColor: '#FF9500',
      backgroundColor: 'rgba(255, 149, 0, 0.1)',
      fill: true,
    },
  ],
};

