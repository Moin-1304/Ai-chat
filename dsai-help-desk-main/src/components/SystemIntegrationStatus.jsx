import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  LinearProgress,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Refresh as RefreshIcon,
  Sync as SyncIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  History as HistoryIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
} from '@mui/icons-material';
import { connectors, dataFlowMetrics, integrationPerformance } from '../data/mockConnectors';
import { webhookEvents } from '../data/mockWebhooks';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

const SystemIntegrationStatus = () => {
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [webhookModalOpen, setWebhookModalOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Connected':
        return <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 20 }} />;
      case 'Disconnected':
        return <ErrorIcon sx={{ color: '#DC3545', fontSize: 20 }} />;
      case 'Warning':
        return <WarningIcon sx={{ color: '#FF9500', fontSize: 20 }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return '#4A7C59';
      case 'Failed':
        return '#DC3545';
      case 'Warning':
        return '#FF9500';
      default:
        return '#6C757D';
    }
  };

  const filteredWebhooks = webhookEvents.filter((event) => {
    if (selectedSource !== 'all' && event.sourceSystem !== selectedSource) return false;
    if (selectedStatus !== 'all' && event.status !== selectedStatus) return false;
    if (selectedEventType !== 'all' && event.eventType !== selectedEventType) return false;
    if (searchQuery && !event.eventType.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.details.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const uniqueSources = [...new Set(webhookEvents.map(e => e.sourceSystem))];
  const uniqueEventTypes = [...new Set(webhookEvents.map(e => e.eventType))];

  // Calculate stats for visual display (using all webhooks for overview)
  const totalEvents = webhookEvents.length;
  const successfulEvents = webhookEvents.filter((e) => e.status === 'Success').length;
  const failedEvents = webhookEvents.filter((e) => e.status === 'Failed').length;
  const warningEvents = webhookEvents.filter((e) => e.status === 'Warning').length;
  const successRate = totalEvents > 0 ? ((successfulEvents / totalEvents) * 100).toFixed(1) : 0;

  // Group by event type for breakdown
  const eventTypeBreakdown = webhookEvents.reduce((acc, event) => {
    acc[event.eventType] = (acc[event.eventType] || 0) + 1;
    return acc;
  }, {});
  const topEventTypes = Object.entries(eventTypeBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Group by source system for breakdown
  const sourceBreakdown = webhookEvents.reduce((acc, event) => {
    acc[event.sourceSystem] = (acc[event.sourceSystem] || 0) + 1;
    return acc;
  }, {});
  const topSources = Object.entries(sourceBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Recent activity (last 10)
  const recentActivity = webhookEvents.slice(0, 10);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', maxWidth: '1920px', mx: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <IntegrationInstructionsIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              System Integration Status
            </Typography>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Monitor COTS connector health and webhook activity
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 10 }}>
          <Chip
            icon={<SyncIcon />}
            label="Real-time"
            color="success"
            size="small"
          />
          <Button
            variant="outlined"
            startIcon={<SettingsInputComponentIcon />}
            sx={{ borderColor: '#2196F3', color: '#2196F3' }}
            onClick={() => setOnboardingOpen(true)}
          >
            Onboard System
          </Button>
        </Box>
      </Box>

      {/* Connector Status Panel */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {connectors.map((connector) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={connector.id}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {connector.name}
                  </Typography>
                  {getStatusIcon(connector.status)}
                </Box>
                <Chip
                  label={connector.status}
                  sx={{
                    bgcolor: connector.statusColor,
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2,
                  }}
                  size="small"
                />
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Last Sync
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {connector.lastSync}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Sync Count
                  </Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={`${connector.syncCount.toLocaleString()} ${connector.syncCountLabel}`}
                      sx={{
                        bgcolor: '#D4AF37',
                        color: '#1a1a1a',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                      }}
                      size="small"
                    />
                  </Box>
                </Box>
                {connector.syncThroughput && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Throughput
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      <Chip
                        label={`${connector.syncThroughput} ${connector.throughputLabel}`}
                        sx={{
                          bgcolor: '#4A7C59',
                          color: '#1a1a1a',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                        }}
                        size="small"
                      />
                    </Box>
                  </Box>
                )}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Connection Type
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {connector.connectionType}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {connector.actionButtons.map((btn, idx) => (
                    <Button
                      key={idx}
                      size="small"
                      variant="contained"
                      startIcon={<SyncIcon />}
                      sx={{ 
                        textTransform: 'none',
                        bgcolor: '#D4AF37',
                        color: '#1a1a1a',
                        '&:hover': {
                          bgcolor: '#E8C547',
                        },
                      }}
                    >
                      {btn}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Data Flow Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Total Records Synced
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={`${dataFlowMetrics.totalRecordsSynced.toLocaleString()}+`}
                  sx={{
                    bgcolor: '#D4AF37',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Sync Success Rate
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={`${dataFlowMetrics.syncSuccessRate}%`}
                  sx={{
                    bgcolor: '#4A7C59',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Avg Sync Latency
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={`${dataFlowMetrics.averageSyncLatency}s`}
                  sx={{
                    bgcolor: '#2196F3',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Webhook Success Rate
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={`${dataFlowMetrics.webhookDeliverySuccessRate}%`}
                  sx={{
                    bgcolor: '#4A7C59',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Avg Webhook Latency
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={`${dataFlowMetrics.averageWebhookLatency}ms`}
                  sx={{
                    bgcolor: '#2196F3',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary">
                Queue Depth
              </Typography>
              <Box sx={{ mt: 0.5 }}>
                <Chip
                  label={dataFlowMetrics.queueDepth}
                  sx={{
                    bgcolor: '#FF9500',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '0.875rem',
                  }}
                  size="small"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Webhook Activity Log Overview */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimelineIcon sx={{ color: '#D4AF37' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Webhook Activity Overview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              icon={<SyncIcon />}
              label="Auto-refresh"
              size="small"
              color="success"
              variant="outlined"
            />
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => setWebhookModalOpen(true)}
              sx={{
                borderColor: '#D4AF37',
                color: '#D4AF37',
                '&:hover': {
                  borderColor: '#D4AF37',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              View Full Log
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{
                borderColor: '#D4AF37',
                color: '#D4AF37',
                '&:hover': {
                  borderColor: '#D4AF37',
                  bgcolor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              Export
            </Button>
          </Box>
        </Box>

        {/* Visual Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Total Events */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(212, 175, 55, 0.2)',
                  borderColor: '#D4AF37',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#999999', fontWeight: 'medium' }}>
                    Total Events
                  </Typography>
                  <Avatar sx={{ bgcolor: 'rgba(212, 175, 55, 0.2)', width: 48, height: 48 }}>
                    <AssessmentIcon sx={{ color: '#D4AF37', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#D4AF37', mb: 0.5 }}>
                  {totalEvents.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  Webhook events
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Success Rate */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.1) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(74, 124, 89, 0.2)',
                  borderColor: '#4A7C59',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#999999', fontWeight: 'medium' }}>
                    Success Rate
                  </Typography>
                  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                      variant="determinate"
                      value={successRate}
                      size={48}
                      thickness={4}
                      sx={{
                        color: '#4A7C59',
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" component="div" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                        {successRate}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4A7C59', mb: 1 }}>
                  {successRate}%
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={successRate}
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#333333',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#4A7C59',
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: '#666666', whiteSpace: 'nowrap', fontSize: '0.7rem' }}>
                    {successfulEvents}/{totalEvents}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Successful Events */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(74, 124, 89, 0.15) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(74, 124, 89, 0.2)',
                  borderColor: '#4A7C59',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#999999', fontWeight: 'medium' }}>
                    Successful
                  </Typography>
                  <Avatar sx={{ bgcolor: 'rgba(74, 124, 89, 0.2)', width: 48, height: 48 }}>
                    <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4A7C59', mb: 0.5 }}>
                  {successfulEvents.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  {(totalEvents > 0 ? ((successfulEvents / totalEvents) * 100).toFixed(1) : 0)}% of total
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Failed/Warning Events */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: (failedEvents + warningEvents) > 0
                  ? 'linear-gradient(135deg, rgba(220, 53, 69, 0.15) 0%, rgba(26, 26, 26, 1) 100%)'
                  : 'linear-gradient(135deg, rgba(102, 102, 102, 0.1) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (failedEvents + warningEvents) > 0 ? '0 8px 24px rgba(220, 53, 69, 0.2)' : '0 8px 24px rgba(102, 102, 102, 0.1)',
                  borderColor: (failedEvents + warningEvents) > 0 ? '#DC3545' : '#666666',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#999999', fontWeight: 'medium' }}>
                    Failed & Warning
                  </Typography>
                  <Avatar sx={{ bgcolor: (failedEvents + warningEvents) > 0 ? 'rgba(220, 53, 69, 0.2)' : 'rgba(102, 102, 102, 0.2)', width: 48, height: 48 }}>
                    <ErrorIcon sx={{ color: (failedEvents + warningEvents) > 0 ? '#DC3545' : '#666666', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: (failedEvents + warningEvents) > 0 ? '#DC3545' : '#666666', mb: 0.5 }}>
                  {(failedEvents + warningEvents).toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  {(totalEvents > 0 ? (((failedEvents + warningEvents) / totalEvents) * 100).toFixed(1) : 0)}% of total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Visual Breakdown Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Status Breakdown */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                  <PieChartIcon sx={{ color: '#D4AF37' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                    Status Breakdown
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', width: 160, height: 160 }}>
                    {/* Background circle (gray) */}
                    <CircularProgress
                      variant="determinate"
                      value={100}
                      size={160}
                      thickness={6}
                      sx={{
                        color: '#333333',
                        transform: 'rotate(-90deg)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      }}
                    />
                    {/* Success portion (green) */}
                    <CircularProgress
                      variant="determinate"
                      value={totalEvents > 0 ? ((successfulEvents / totalEvents) * 100) : 0}
                      size={160}
                      thickness={6}
                      sx={{
                        color: '#4A7C59',
                        transform: 'rotate(-90deg)',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        '& .MuiCircularProgress-circle': {
                          strokeLinecap: 'round',
                        },
                      }}
                    />
                    {/* Failed/Warning portion (red/orange) - starts where success ends */}
                    {(failedEvents + warningEvents) > 0 && (
                      <CircularProgress
                        variant="determinate"
                        value={totalEvents > 0 ? (((failedEvents + warningEvents) / totalEvents) * 100) : 0}
                        size={160}
                        thickness={6}
                        sx={{
                          color: '#DC3545',
                          transform: `rotate(${-90 + (totalEvents > 0 ? (successfulEvents / totalEvents) * 360 : 0)}deg)`,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          zIndex: 1,
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 3,
                      }}
                    >
                      <Typography variant="h4" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                        {totalEvents}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#999999' }}>
                        Total Events
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 3, width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: '#4A7C59', borderRadius: '50%' }} />
                        <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'medium' }}>
                          Success
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                        {successfulEvents}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666666' }}>
                        {successRate}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box sx={{ width: 12, height: 12, bgcolor: '#DC3545', borderRadius: '50%' }} />
                        <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'medium' }}>
                          Failed/Warning
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                        {failedEvents + warningEvents}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666666' }}>
                        {totalEvents > 0 ? (((failedEvents + warningEvents) / totalEvents) * 100).toFixed(1) : 0}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Event Types */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <BarChartIcon sx={{ color: '#D4AF37' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                    Top Event Types
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {topEventTypes.map(([eventType, count]) => {
                    const percentage = totalEvents > 0 ? ((count / totalEvents) * 100).toFixed(1) : 0;
                    return (
                      <Box key={eventType}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                            <Box sx={{ width: 4, height: 4, bgcolor: '#D4AF37', borderRadius: '50%', flexShrink: 0 }} />
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#E0E0E0',
                                fontWeight: 'medium',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {eventType}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                            <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold', minWidth: '40px', textAlign: 'right' }}>
                              {count}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666666', minWidth: '35px' }}>
                              ({percentage}%)
                            </Typography>
                          </Box>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: '#333333',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: '#D4AF37',
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(26, 26, 26, 1) 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <HistoryIcon sx={{ color: '#D4AF37' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                    Recent Activity
                  </Typography>
                </Box>
                <List sx={{ p: 0, maxHeight: 400, overflow: 'auto', '&::-webkit-scrollbar': { width: '6px' }, '&::-webkit-scrollbar-thumb': { bgcolor: '#333333', borderRadius: '3px' } }}>
                  {recentActivity.map((event, idx) => (
                    <React.Fragment key={event.id}>
                      <ListItem
                        sx={{
                          px: 0,
                          py: 1.5,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(212, 175, 55, 0.05)',
                            borderRadius: '4px',
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 44 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: event.status === 'Success' ? 'rgba(74, 124, 89, 0.2)' : event.status === 'Failed' ? 'rgba(220, 53, 69, 0.2)' : 'rgba(255, 149, 0, 0.2)',
                            }}
                          >
                            {event.status === 'Success' ? (
                              <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 18 }} />
                            ) : event.status === 'Failed' ? (
                              <ErrorIcon sx={{ color: '#DC3545', fontSize: 18 }} />
                            ) : (
                              <WarningIcon sx={{ color: '#FF9500', fontSize: 18 }} />
                            )}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'medium', mb: 0.5 }}>
                              {event.eventType}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999999', display: 'block' }}>
                                {event.sourceSystem} → {event.destination} • {event.timestamp}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 0.5 }}>
                                {event.latency > 0 ? `${event.latency}ms` : 'N/A'}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {idx < recentActivity.length - 1 && <Divider sx={{ bgcolor: '#333333', my: 0.5 }} />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Full Webhook Activity Log Modal */}
      <Dialog
        open={webhookModalOpen}
        onClose={() => setWebhookModalOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#242424',
            color: '#E0E0E0',
            maxHeight: '90vh',
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid #333333', pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Complete Webhook Activity Log
            </Typography>
            <IconButton
              onClick={() => setWebhookModalOpen(false)}
              sx={{ color: '#999999', '&:hover': { color: '#E0E0E0' } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {/* Filters in Modal */}
          <Box sx={{ p: 2, borderBottom: '1px solid #333333' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  sx={{
                    bgcolor: '#1a1a1a',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#333333' },
                      '&:hover fieldset': { borderColor: '#555555' },
                    },
                    '& .MuiInputBase-input': { color: '#E0E0E0' },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: '#999999' }}>Source System</InputLabel>
                  <Select
                    value={selectedSource}
                    label="Source System"
                    onChange={(e) => setSelectedSource(e.target.value)}
                    sx={{
                      bgcolor: '#1a1a1a',
                      color: '#E0E0E0',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555555' },
                    }}
                  >
                    <MenuItem value="all">All Sources</MenuItem>
                    {uniqueSources.map((source) => (
                      <MenuItem key={source} value={source}>
                        {source}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: '#999999' }}>Status</InputLabel>
                  <Select
                    value={selectedStatus}
                    label="Status"
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    sx={{
                      bgcolor: '#1a1a1a',
                      color: '#E0E0E0',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555555' },
                    }}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="Success">Success</MenuItem>
                    <MenuItem value="Failed">Failed</MenuItem>
                    <MenuItem value="Warning">Warning</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: '#999999' }}>Event Type</InputLabel>
                  <Select
                    value={selectedEventType}
                    label="Event Type"
                    onChange={(e) => setSelectedEventType(e.target.value)}
                    sx={{
                      bgcolor: '#1a1a1a',
                      color: '#E0E0E0',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#555555' },
                    }}
                  >
                    <MenuItem value="all">All Events</MenuItem>
                    {uniqueEventTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <TableContainer sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: '#1a1a1a', borderBottom: '2px solid #333333' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Event Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Source System</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Destination</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Response Code</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Latency</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWebhooks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                      <Typography sx={{ color: '#999999' }}>No webhook events found</Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredWebhooks.map((event) => (
                    <TableRow
                      key={event.id}
                      sx={{
                        bgcolor: '#242424',
                        borderBottom: '1px solid #333333',
                        '&:hover': {
                          bgcolor: '#2a2a2a',
                        },
                      }}
                    >
                      <TableCell sx={{ color: '#E0E0E0' }}>{event.timestamp}</TableCell>
                      <TableCell sx={{ color: '#E0E0E0' }}>{event.eventType}</TableCell>
                      <TableCell sx={{ color: '#E0E0E0' }}>{event.sourceSystem}</TableCell>
                      <TableCell sx={{ color: '#E0E0E0' }}>{event.destination}</TableCell>
                      <TableCell>
                        <Chip
                          label={event.status}
                          size="small"
                          sx={{
                            bgcolor: event.statusColor,
                            color: 'white',
                            fontWeight: 'medium',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={event.responseCode}
                          size="small"
                          variant={event.responseCode >= 200 && event.responseCode < 300 ? 'default' : 'outlined'}
                          color={event.responseCode >= 200 && event.responseCode < 300 ? 'success' : 'error'}
                        />
                      </TableCell>
                      <TableCell sx={{ color: '#E0E0E0' }}>
                        {event.latency > 0 ? `${event.latency}ms` : '-'}
                      </TableCell>
                      <TableCell sx={{ color: '#999999', fontSize: '0.875rem' }}>{event.details}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
          <Button
            onClick={() => setWebhookModalOpen(false)}
            sx={{
              color: '#999999',
              '&:hover': { color: '#E0E0E0' },
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={() => alert('Exporting webhook log...')}
            sx={{
              bgcolor: '#D4AF37',
              color: '#1a1a1a',
              '&:hover': { bgcolor: '#C4A027' },
            }}
          >
            Export Log
          </Button>
        </DialogActions>
      </Dialog>

      {/* Onboard System Dialog */}
      <Dialog
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#242424',
            border: '1px solid #333333',
            borderRadius: '8px',
          },
        }}
      >
        <DialogTitle sx={{ color: '#D4AF37', fontWeight: 'bold', borderBottom: '1px solid #333333', pb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
              Onboard New System
            </Typography>
            <IconButton onClick={() => setOnboardingOpen(false)} sx={{ color: '#999999' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ color: '#999999', mb: 3 }}>
            Select a system to integrate or view active connections:
          </Typography>
          
          {/* Unified Systems List */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Active Systems */}
            {connectors.filter(c => c.status === 'Connected').map((system) => (
              <Box
                key={system.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #D4AF37',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#242424',
                    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)',
                  },
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(33, 150, 243, 0.15)',
                      borderRadius: '6px',
                      border: '2px solid #2196F3',
                    }}
                  >
                    <ElectricalServicesIcon sx={{ color: '#2196F3', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      {system.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999999' }}>
                      {system.lastSync}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label="Active"
                  size="small"
                  sx={{
                    backgroundColor: '#4A7C59',
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    height: '24px',
                  }}
                />
              </Box>
            ))}

            {/* Available Systems */}
            {['SharePoint', 'Salesforce', 'ServiceNow', 'GitHub', 'Slack'].map((system) => (
              <Box
                key={system}
                onClick={() => {
                  alert(`Onboarding ${system}... This would initiate the integration process.`);
                  setOnboardingOpen(false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#242424',
                    borderColor: '#2196F3',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)',
                  },
                  cursor: 'pointer',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: 'rgba(33, 150, 243, 0.1)',
                      borderRadius: '6px',
                      border: '2px solid #333333',
                    }}
                  >
                    <ElectricalServicesIcon sx={{ color: '#999999', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'medium' }}>
                      {system}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Available to connect
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label="Onboard"
                  size="small"
                  sx={{
                    backgroundColor: 'transparent',
                    borderColor: '#2196F3',
                    color: '#2196F3',
                    fontWeight: 'bold',
                    height: '24px',
                  }}
                  variant="outlined"
                />
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
          <Button onClick={() => setOnboardingOpen(false)} sx={{ color: '#999999' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemIntegrationStatus;

