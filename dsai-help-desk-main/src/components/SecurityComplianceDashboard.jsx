import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Collapse,
  IconButton,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Tooltip,
  Avatar,
} from '@mui/material';
import {
  Security as SecurityIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  FilterList as FilterListIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Lock as LockIcon,
  Shield as ShieldIcon,
  VerifiedUser as VerifiedUserIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import {
  securityKPIs,
  rbacRoles,
  permissionsMatrix,
  userAssignments,
  dataProtection,
  complianceStatus,
  securityAlerts,
  complianceReports,
  availableReportTypes,
} from '../data/mockSecurity';
import { auditLogs, auditLogStats } from '../data/mockAuditLogs';

const SecurityComplianceDashboard = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRoles, setExpandedRoles] = useState({});
  const [selectedReportType, setSelectedReportType] = useState('');
  const [auditLogModalOpen, setAuditLogModalOpen] = useState(false);

  const handleToggleRole = (roleId) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [roleId]: !prev[roleId],
    }));
  };

  const handleGenerateReport = () => {
    // Mock report generation
    alert(`Generating ${selectedReportType || 'Custom'} compliance report...`);
  };

  // Filter audit logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesUser = !selectedUser || log.user.toLowerCase().includes(selectedUser.toLowerCase());
    const matchesAction = !selectedAction || log.action === selectedAction;
    const matchesStatus = !selectedStatus || log.status === selectedStatus;
    const matchesSearch =
      !searchQuery ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUser && matchesAction && matchesStatus && matchesSearch;
  });

  // Get unique values for filters
  const uniqueUsers = [...new Set(auditLogs.map((log) => log.user))];
  const uniqueActions = [...new Set(auditLogs.map((log) => log.action))];
  const uniqueStatuses = [...new Set(auditLogs.map((log) => log.status))];

  // Calculate stats for visual display (using all logs for overview)
  const totalEvents = auditLogs.length;
  const successfulEvents = auditLogs.filter((log) => log.status === 'Success').length;
  const failedEvents = auditLogs.filter((log) => log.status === 'Failed').length;
  const successRate = totalEvents > 0 ? ((successfulEvents / totalEvents) * 100).toFixed(1) : 0;

  // Group by action type for breakdown
  const actionBreakdown = auditLogs.reduce((acc, log) => {
    acc[log.action] = (acc[log.action] || 0) + 1;
    return acc;
  }, {});
  const topActions = Object.entries(actionBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Recent activity (last 10)
  const recentActivity = auditLogs.slice(0, 10);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', maxWidth: '1920px', mx: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <SecurityIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Security & Compliance Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Monitor security controls and compliance status
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 24 }} /> */}
          <Typography variant="h6" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
            Overall Compliance Status: Compliant
          </Typography>
        </Box>
      </Box>

      {/* Security Overview KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#242424', border: '1px solid #333333', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Active Users
                </Typography>
                <VerifiedUserIcon sx={{ color: '#D4AF37' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E0E0E0', mb: 1 }}>
                {securityKPIs.activeUsers.count}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {securityKPIs.activeUsers.trend === 'up' ? (
                  <TrendingUpIcon sx={{ color: '#4A7C59', fontSize: 16 }} />
                ) : (
                  <TrendingDownIcon sx={{ color: '#DC3545', fontSize: 16 }} />
                )}
                <Typography variant="caption" sx={{ color: securityKPIs.activeUsers.trend === 'up' ? '#4A7C59' : '#DC3545' }}>
                  {securityKPIs.activeUsers.trendValue}% from last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#242424', border: '1px solid #333333', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Failed Login Attempts (24h)
                </Typography>
                <ErrorIcon sx={{ color: securityKPIs.failedLoginAttempts24h.isAlert ? '#DC3545' : '#FF9500' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E0E0E0', mb: 1 }}>
                {securityKPIs.failedLoginAttempts24h.count}
              </Typography>
              <Typography variant="caption" sx={{ color: '#999999' }}>
                Threshold: {securityKPIs.failedLoginAttempts24h.threshold}
                {securityKPIs.failedLoginAttempts24h.count >= securityKPIs.failedLoginAttempts24h.threshold && (
                  <Chip label="Alert" size="small" sx={{ ml: 1, bgcolor: '#DC3545', color: 'white' }} />
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#242424', border: '1px solid #333333', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Audit Events (24h)
                </Typography>
                <ShieldIcon sx={{ color: '#D4AF37' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E0E0E0', mb: 1 }}>
                {securityKPIs.auditEvents24h.count.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip
                  label={`✓ ${securityKPIs.auditEvents24h.breakdown.successful}`}
                  size="small"
                  sx={{ bgcolor: '#4A7C59', color: 'white', fontSize: '0.7rem' }}
                />
                <Chip
                  label={`✗ ${securityKPIs.auditEvents24h.breakdown.failed}`}
                  size="small"
                  sx={{ bgcolor: '#DC3545', color: 'white', fontSize: '0.7rem' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: '#242424', border: '1px solid #333333', height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  CUI Compliance Status
                </Typography>
                <CheckCircleIcon sx={{ color: '#4A7C59' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 32 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A7C59' }}>
                  ✓ Compliant
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Security Alerts */}
      {securityAlerts.length > 0 && (
        <Box sx={{ mb: 4 }}>
          {securityAlerts.map((alert) => (
            <Alert
              key={alert.id}
              severity={alert.severity === 'low' ? 'warning' : alert.severity === 'medium' ? 'error' : 'info'}
              sx={{ mb: 2, bgcolor: '#242424', border: '1px solid #333333' }}
            >
              <AlertTitle sx={{ fontWeight: 'bold' }}>{alert.title}</AlertTitle>
              {alert.message}
            </Alert>
          ))}
        </Box>
      )}

      {/* Audit Log Visual Stats */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TimelineIcon sx={{ color: '#D4AF37' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Audit Log Overview
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<VisibilityIcon />}
              onClick={() => setAuditLogModalOpen(true)}
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
                position: 'relative',
                overflow: 'hidden',
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
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(212, 175, 55, 0.2)',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <AssessmentIcon sx={{ color: '#D4AF37', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#D4AF37', mb: 0.5 }}>
                  {totalEvents.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  Filtered results
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
                position: 'relative',
                overflow: 'hidden',
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
                position: 'relative',
                overflow: 'hidden',
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
                  <Avatar
                    sx={{
                      bgcolor: 'rgba(74, 124, 89, 0.2)',
                      width: 48,
                      height: 48,
                    }}
                  >
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

          {/* Failed Events */}
          <Grid item xs={12} sm={6} lg={3}>
            <Card
              sx={{
                bgcolor: '#1a1a1a',
                border: '1px solid #333333',
                height: '100%',
                background: failedEvents > 0
                  ? 'linear-gradient(135deg, rgba(220, 53, 69, 0.15) 0%, rgba(26, 26, 26, 1) 100%)'
                  : 'linear-gradient(135deg, rgba(102, 102, 102, 0.1) 0%, rgba(26, 26, 26, 1) 100%)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: failedEvents > 0 ? '0 8px 24px rgba(220, 53, 69, 0.2)' : '0 8px 24px rgba(102, 102, 102, 0.1)',
                  borderColor: failedEvents > 0 ? '#DC3545' : '#666666',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="caption" sx={{ color: '#999999', fontWeight: 'medium' }}>
                    Failed
                  </Typography>
                  <Avatar
                    sx={{
                      bgcolor: failedEvents > 0 ? 'rgba(220, 53, 69, 0.2)' : 'rgba(102, 102, 102, 0.2)',
                      width: 48,
                      height: 48,
                    }}
                  >
                    <ErrorIcon sx={{ color: failedEvents > 0 ? '#DC3545' : '#666666', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: failedEvents > 0 ? '#DC3545' : '#666666', mb: 0.5 }}>
                  {failedEvents.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: '#666666' }}>
                  {(totalEvents > 0 ? ((failedEvents / totalEvents) * 100).toFixed(1) : 0)}% of total
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Visual Breakdown Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Success/Failure Breakdown Pie Chart */}
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
                    {/* Failed portion (red) - starts where success ends */}
                    {failedEvents > 0 && (
                      <CircularProgress
                        variant="determinate"
                        value={totalEvents > 0 ? ((failedEvents / totalEvents) * 100) : 0}
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
                  <Box sx={{ display: 'flex', gap: 3, width: '100%', justifyContent: 'center' }}>
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
                          Failed
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                        {failedEvents}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666666' }}>
                        {totalEvents > 0 ? ((failedEvents / totalEvents) * 100).toFixed(1) : 0}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Top Actions Breakdown */}
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
                    Top Actions
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {topActions.map(([action, count], idx) => {
                    const percentage = totalEvents > 0 ? ((count / totalEvents) * 100).toFixed(1) : 0;
                    return (
                      <Box key={action}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                bgcolor: '#D4AF37',
                                borderRadius: '50%',
                                flexShrink: 0,
                              }}
                            />
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
                              {action}
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
                  {recentActivity.map((log, idx) => (
                    <React.Fragment key={log.id}>
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
                              bgcolor: log.status === 'Success' ? 'rgba(74, 124, 89, 0.2)' : 'rgba(220, 53, 69, 0.2)',
                            }}
                          >
                            {log.status === 'Success' ? (
                              <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 18 }} />
                            ) : (
                              <ErrorIcon sx={{ color: '#DC3545', fontSize: 18 }} />
                            )}
                          </Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'medium', mb: 0.5 }}>
                              {log.action}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999999', display: 'block' }}>
                                {log.user} • {log.timestamp}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 0.5 }}>
                                {log.resource}
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

      {/* Full Audit Log Modal */}
      <Dialog
        open={auditLogModalOpen}
        onClose={() => setAuditLogModalOpen(false)}
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
              Complete Audit Log
            </Typography>
            <IconButton
              onClick={() => setAuditLogModalOpen(false)}
              sx={{ color: '#999999', '&:hover': { color: '#E0E0E0' } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <TableContainer sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ bgcolor: '#1a1a1a', borderBottom: '2px solid #333333' }}>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Timestamp</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>User</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Action</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Resource</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>IP Address</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id} sx={{ bgcolor: '#242424', borderBottom: '1px solid #333333', '&:hover': { bgcolor: '#2a2a2a' } }}>
                    <TableCell sx={{ color: '#E0E0E0' }}>{log.timestamp}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{log.user}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{log.action}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{log.resource}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{log.ipAddress}</TableCell>
                    <TableCell>
                      <Chip
                        label={log.status}
                        size="small"
                        sx={{
                          bgcolor: log.status === 'Success' ? '#4A7C59' : '#DC3545',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#999999', fontSize: '0.875rem' }}>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #333333', p: 2 }}>
          <Button
            onClick={() => setAuditLogModalOpen(false)}
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
            onClick={() => alert('Exporting audit log...')}
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

      {/* Access Control (RBAC) Section */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
            Access Control (RBAC)
          </Typography>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#D4AF37',
              color: '#D4AF37',
              '&:hover': {
                borderColor: '#D4AF37',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
              },
            }}
          >
            Manage Roles
          </Button>
        </Box>

        {/* Roles Table */}
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1a1a1a', borderBottom: '2px solid #333333' }}>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Role</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Users Count</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Permissions Summary</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rbacRoles.map((role) => (
                <React.Fragment key={role.id}>
                  <TableRow sx={{ bgcolor: '#242424', borderBottom: '1px solid #333333', '&:hover': { bgcolor: '#2a2a2a' } }}>
                    <TableCell sx={{ color: '#E0E0E0', fontWeight: 'medium' }}>{role.name}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{role.userCount}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>
                      {role.permissions.length} permissions
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleToggleRole(role.id)}
                        sx={{ color: '#D4AF37' }}
                      >
                        {expandedRoles[role.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4} sx={{ py: 0, borderBottom: 'none' }}>
                      <Collapse in={expandedRoles[role.id]} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2, bgcolor: '#1a1a1a', borderTop: '1px solid #333333' }}>
                          <Typography variant="subtitle2" sx={{ color: '#D4AF37', mb: 1 }}>
                            Description: {role.description}
                          </Typography>
                          <Typography variant="subtitle2" sx={{ color: '#D4AF37', mb: 1 }}>
                            Permissions:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {role.permissions.map((permission) => (
                              <Chip
                                key={permission}
                                label={permission}
                                size="small"
                                sx={{ bgcolor: '#333333', color: '#E0E0E0' }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Permissions Matrix */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#D4AF37', mb: 2 }}>
          Permissions Matrix
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#1a1a1a', borderBottom: '2px solid #333333' }}>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Permission</TableCell>
                {rbacRoles.map((role) => (
                  <TableCell key={role.id} align="center" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                    {role.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {permissionsMatrix.permissions.map((permission) => (
                <TableRow key={permission} sx={{ bgcolor: '#242424', borderBottom: '1px solid #333333', '&:hover': { bgcolor: '#2a2a2a' } }}>
                  <TableCell sx={{ color: '#E0E0E0' }}>{permission}</TableCell>
                  {rbacRoles.map((role) => (
                    <TableCell key={role.id} align="center">
                      {role.permissions.includes(permission) ? (
                        <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 20 }} />
                      ) : (
                        <Typography sx={{ color: '#666666' }}>-</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Data Protection Card */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: '#242424', border: '1px solid #333333', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <LockIcon sx={{ color: '#D4AF37' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                Data Protection
              </Typography>
            </Box>

            {/* Encryption Status */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#D4AF37', mb: 1, fontWeight: 'bold' }}>
                Encryption Status
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    At Rest: <strong>{dataProtection.encryption.atRest.algorithm}</strong>
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    In Transit: <strong>{dataProtection.encryption.inTransit.protocol}</strong>
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#999999', fontSize: '0.875rem' }}>
                  Key Rotation: Last rotated {dataProtection.encryption.keyRotation.lastRotated}
                </Typography>
              </Box>
            </Box>

            {/* Data Retention Policies */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: '#D4AF37', mb: 1, fontWeight: 'bold' }}>
                Data Retention Policies
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    Audit logs: <strong>{dataProtection.dataRetention.auditLogs.duration}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    Tickets: <strong>{dataProtection.dataRetention.tickets.duration}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    User sessions: <strong>{dataProtection.dataRetention.userSessions.duration}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    KB articles: <strong>{dataProtection.dataRetention.kbArticles.duration}</strong>
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            {/* Privacy Controls */}
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#D4AF37', mb: 1, fontWeight: 'bold' }}>
                Privacy Controls
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      PII Redaction: <strong>Enabled</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      Data Masking: <strong>Enabled</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      Data Minimization: <strong>Enabled</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleIcon sx={{ color: '#4A7C59', fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      GDPR Compliance: <strong>Compliant</strong>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Compliance Indicators */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, bgcolor: '#242424', border: '1px solid #333333', height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <ShieldIcon sx={{ color: '#D4AF37' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                Compliance Indicators
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {/* CUI Compliance */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333333' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                        CUI Compliance
                      </Typography>
                      <CheckCircleIcon sx={{ color: '#4A7C59' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#999999', mb: 0.5 }}>
                      Status: <strong style={{ color: '#4A7C59' }}>✓ Compliant</strong>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Last audit: {complianceStatus.cui.lastAudit} | Next audit: {complianceStatus.cui.nextAudit}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* NIST 800-171 */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333333' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                        NIST 800-171
                      </Typography>
                      <CheckCircleIcon sx={{ color: '#4A7C59' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#999999', mb: 0.5 }}>
                      Status: <strong style={{ color: '#4A7C59' }}>✓ Implemented</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                      Controls: {complianceStatus.nist800171.controlsImplemented}/{complianceStatus.nist800171.controlsTotal} implemented
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Compliance score: {complianceStatus.nist800171.complianceScore}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* ISO 27001 */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333333' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                        ISO 27001
                      </Typography>
                      <CheckCircleIcon sx={{ color: '#4A7C59' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#999999', mb: 0.5 }}>
                      Status: <strong style={{ color: '#4A7C59' }}>✓ Certified</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                      Certificate: {complianceStatus.iso27001.certificateNumber}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Expiry: {complianceStatus.iso27001.expiryDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* FedRAMP */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: '#1a1a1a', border: '1px solid #333333' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                        FedRAMP
                      </Typography>
                      <CheckCircleIcon sx={{ color: '#4A7C59' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#999999', mb: 0.5 }}>
                      Status: <strong style={{ color: '#4A7C59' }}>✓ Ready</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                      Assessment Level: {complianceStatus.fedramp.assessmentLevel}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666666' }}>
                      Assessment date: {complianceStatus.fedramp.assessmentDate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Compliance Reports Section */}
      <Paper sx={{ p: 3, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
            Compliance Reports
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: '#999999' }}>Report Type</InputLabel>
              <Select
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                label="Report Type"
                sx={{
                  bgcolor: '#1a1a1a',
                  color: '#E0E0E0',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333333' },
                }}
              >
                <MenuItem value="">Select Report Type</MenuItem>
                {availableReportTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleGenerateReport}
              disabled={!selectedReportType}
              sx={{
                bgcolor: '#D4AF37',
                color: '#1a1a1a',
                '&:hover': { bgcolor: '#C4A027' },
                '&:disabled': { bgcolor: '#666666', color: '#999999' },
              }}
            >
              Generate Compliance Report
            </Button>
          </Box>
        </Box>

        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#D4AF37', mb: 2 }}>
          Report History
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1a1a1a', borderBottom: '2px solid #333333' }}>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Report Type</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Generated Date</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Generated By</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complianceReports.map((report) => (
                <TableRow key={report.id} sx={{ bgcolor: '#242424', borderBottom: '1px solid #333333', '&:hover': { bgcolor: '#2a2a2a' } }}>
                  <TableCell sx={{ color: '#E0E0E0' }}>{report.type}</TableCell>
                  <TableCell sx={{ color: '#E0E0E0' }}>{report.generatedDate}</TableCell>
                  <TableCell sx={{ color: '#E0E0E0' }}>{report.generatedBy}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      size="small"
                      sx={{ bgcolor: '#4A7C59', color: 'white', fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<DownloadIcon />}
                      sx={{ color: '#D4AF37' }}
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SecurityComplianceDashboard;

