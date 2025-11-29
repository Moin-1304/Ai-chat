import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Alert,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import ChatbotPerformanceMetrics from './ChatbotPerformanceMetrics';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TimerIcon from '@mui/icons-material/Timer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  kpiMetrics,
  ticketVolumeTrend,
  topIssueCategories,
  predictiveAlert,
  systemPerformance,
  pcteMetrics,
} from '../data/mockAnalytics';
import { metricsAPI } from '../utils/apiClient';
import {
  frequentQueryTopics,
  resolutionPathMetrics,
  clarificationPatterns,
  chatbotQueryVolumeTrend,
  chatbotPredictiveInsights,
  chatbotPerformanceMetrics,
  topicSentiments,
  correctivePromptMetrics,
} from '../data/mockChatbotMetrics';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsDashboard = () => {
  const [summaryMetrics, setSummaryMetrics] = useState(null);
  const [trendsData, setTrendsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch metrics from API
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch summary and trends in parallel
        const [summary, trends] = await Promise.all([
          metricsAPI.getSummary(),
          metricsAPI.getTrends(30) // Last 30 days
        ]);
        
        setSummaryMetrics(summary);
        setTrendsData(trends);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Failed to load metrics. Using fallback data.');
        // Keep null to use mock data as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  // Transform API trends data to chart format
  const ticketVolumeTrendData = React.useMemo(() => {
    if (trendsData && trendsData.length > 0) {
      return trendsData.map(trend => ({
        date: trend.date,
        tickets: trend.tickets
      }));
    }
    // Fallback to mock data
    return ticketVolumeTrend;
  }, [trendsData]);

  // Transform API summary to top issue categories
  const topIssueCategoriesData = React.useMemo(() => {
    if (summaryMetrics && summaryMetrics.mostCommonIssues && summaryMetrics.mostCommonIssues.length > 0) {
      const total = summaryMetrics.mostCommonIssues.reduce((sum, issue) => sum + issue.count, 0);
      return summaryMetrics.mostCommonIssues.map(issue => ({
        category: issue.issue,
        count: issue.count,
        percentage: total > 0 ? Math.round((issue.count / total) * 100) : 0
      }));
    }
    // Fallback to mock data
    return topIssueCategories;
  }, [summaryMetrics]);

  // Calculate KPI metrics from API data
  const kpiMetricsData = React.useMemo(() => {
    if (summaryMetrics) {
      const totalTickets = summaryMetrics.totalTickets || 0;
      const totalConversations = summaryMetrics.totalConversations || 0;
      const deflectionRate = summaryMetrics.deflectionRate || 0;
      const escalationCount = summaryMetrics.escalationCount || 0;
      const escalationRate = totalTickets > 0 ? (escalationCount / totalTickets) * 100 : 0;
      
      return {
        ticketsResolved: {
          value: totalTickets,
          label: 'Tickets Resolved',
          change: 0, // Would need historical data to calculate
          trend: 'up',
          period: 'vs last period',
          unit: ''
        },
        slaCompliance: {
          value: 95,
          label: 'SLA Compliance',
          change: 2,
          trend: 'up',
          period: 'vs last period',
          unit: '%'
        },
        avgResolutionTime: {
          value: summaryMetrics.averageResponseTime || 2.5,
          label: 'Avg Resolution Time',
          change: -5,
          trend: 'down',
          period: 'vs last period',
          unit: 's'
        },
        aiAccuracy: {
          value: 87,
          label: 'AI Accuracy',
          change: 3,
          trend: 'up',
          period: 'vs last period',
          unit: '%'
        },
        tier0Resolution: {
          value: deflectionRate,
          label: 'Tier 0 Resolution',
          change: 5,
          trend: 'up',
          period: 'vs last period',
          unit: '%'
        },
        escalationRate: {
          value: Math.round(escalationRate),
          label: 'Escalation Rate',
          change: -2,
          trend: 'down',
          period: 'vs last period',
          unit: '%'
        }
      };
    }
    // Fallback to mock data
    return kpiMetrics;
  }, [summaryMetrics]);

  // KPI Card Component
  const KPICard = ({ metric, icon: Icon }) => {
    // Determine if the trend is positive based on the metric type
    // For most metrics: up is good, down is bad
    // For Resolution Time and Escalation Rate: down is good, up is bad
    const isNegativeMetric = metric.label.includes('Resolution Time') || metric.label.includes('Escalation Rate');
    const isPositive = isNegativeMetric ? metric.trend === 'down' : metric.trend === 'up';
    
    return (
      <Card
        sx={{
          height: '100%',
          backgroundColor: '#242424',
          border: '1px solid #333333',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: 4,
            borderColor: '#D4AF37',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            {Icon && <Icon sx={{ fontSize: '28px', color: '#D4AF37' }} />}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {metric.trend === 'up' ? (
                <TrendingUpIcon sx={{ fontSize: '20px', color: isPositive ? '#4A7C59' : '#FF9500' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: '20px', color: isPositive ? '#4A7C59' : '#FF9500' }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: isPositive ? '#4A7C59' : '#FF9500',
                  fontWeight: 'bold',
                }}
              >
                {metric.change > 0 ? '+' : ''}{metric.change}%
              </Typography>
            </Box>
          </Box>
          <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
            {metric.value.toLocaleString()}{metric.unit || ''}
          </Typography>
          <Typography variant="body2" sx={{ color: '#999999', mb: 1 }}>
            {metric.label}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666666' }}>
            {metric.change > 0 ? '+' : ''}{metric.change}% {metric.period}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  // Line chart configuration for ticket volume trend
  const lineChartData = React.useMemo(() => ({
    labels: ticketVolumeTrendData.map(d => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: 'Ticket Volume',
        data: ticketVolumeTrendData.map(d => d.tickets),
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: '#D4AF37',
        pointBorderColor: '#1a1a1a',
        pointBorderWidth: 2,
      },
    ],
  }), [ticketVolumeTrendData]);

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#999999',
          boxWidth: 12,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#242424',
        titleColor: '#D4AF37',
        bodyColor: '#E0E0E0',
        borderColor: '#333333',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#999999',
          font: { size: 12 },
        },
        grid: {
          color: '#333333',
          drawBorder: false,
        },
        ticks: {
          color: '#999999',
          font: {
            size: 11,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tickets',
          color: '#999999',
          font: { size: 12 },
        },
        grid: {
          color: '#333333',
          drawBorder: false,
        },
        ticks: {
          color: '#999999',
          font: {
            size: 11,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  };

  // Bar chart configuration for top issue categories
  const barChartData = React.useMemo(() => ({
    labels: topIssueCategoriesData.map(c => c.category),
    datasets: [
      {
        label: 'Ticket Count',
        data: topIssueCategoriesData.map(c => c.count),
        backgroundColor: topIssueCategoriesData.map((c, idx) => {
          if (idx === 0) return '#D4AF37';
          if (idx === 1) return '#FF9500';
          if (idx === 2) return '#4A7C59';
          return `rgba(212, 175, 55, ${0.6 - idx * 0.1})`;
        }),
        borderColor: '#333333',
        borderWidth: 1,
      },
    ],
  }), [topIssueCategoriesData]);

  const barChartOptions = React.useMemo(() => ({
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#999999',
          boxWidth: 12,
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#242424',
        titleColor: '#D4AF37',
        bodyColor: '#E0E0E0',
        borderColor: '#333333',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: function(context) {
            const category = topIssueCategoriesData[context.dataIndex];
            return [`Count: ${category.count}`, `Percentage: ${category.percentage}%`];
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Count',
          color: '#999999',
          font: { size: 12 },
        },
        grid: {
          color: '#333333',
          drawBorder: false,
        },
        ticks: {
          color: '#999999',
          font: {
            size: 11,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Category',
          color: '#999999',
          font: { size: 12 },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#999999',
          font: {
            size: 11,
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  }), [topIssueCategoriesData]);

  // Show loading state
  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AnalyticsIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Executive Analytics Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Real-time insights, trend analysis, and predictive forecasting for Help Desk operations
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', ml: 10 }}>
          <Chip
            label="Real-time"
            sx={{
              backgroundColor: '#2196F3',
              color: '#1a1a1a',
              fontWeight: 'bold',
              height: '32px',
            }}
          />
          <Chip
            label={`Last updated: ${new Date().toLocaleString()}`}
            sx={{
              backgroundColor: '#333333',
              color: '#E0E0E0',
              height: '32px',
            }}
          />
          {error && (
            <Chip
              label="Using fallback data"
              sx={{
                backgroundColor: '#FF9500',
                color: '#1a1a1a',
                fontWeight: 'bold',
                height: '32px',
              }}
            />
          )}
        </Box>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* KPI Metrics Section */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#242424',
          border: '1px solid #333333',
          width: '100%',
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
          Key Performance Indicators (KPIs)
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KPICard metric={kpiMetricsData.ticketsResolved} icon={CheckCircleIcon} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KPICard metric={kpiMetricsData.slaCompliance} icon={ScheduleIcon} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KPICard metric={kpiMetricsData.avgResolutionTime} icon={TimerIcon} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KPICard metric={kpiMetricsData.aiAccuracy} icon={PsychologyIcon} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KPICard metric={kpiMetricsData.tier0Resolution} icon={SelfImprovementIcon} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <KPICard metric={kpiMetricsData.escalationRate} icon={ArrowDownwardIcon} />
          </Grid>
        </Grid>
      </Paper>

      {/* Predictive Alert Banner */}
      <Alert
        severity="warning"
        sx={{
          mb: 4,
          backgroundColor: '#2A2417',
          border: '1px solid #FF9500',
          color: '#E0E0E0',
          '& .MuiAlert-icon': {
            color: '#FF9500',
          },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Predictive Alert: {predictiveAlert.message}
        </Typography>
        <Typography variant="body2" sx={{ color: '#999999' }}>
          Forecast Date: {predictiveAlert.forecastDate} | Confidence: {predictiveAlert.confidence}% | 
          Recommended: {predictiveAlert.recommendedAction}
        </Typography>
      </Alert>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4, width: '100%' }} data-testid="charts-grid">
        {/* Ticket Volume Trend Chart */}
        <Grid size={{ xs: 12, lg: 4 }} data-testid="chart-card">
          <Paper
            sx={{
              p: 3,
              backgroundColor: '#242424',
              border: '1px solid #333333',
              height: '400px',
              width: '100%',
            }}
          >
            <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
              Ticket Volume Trend (Last 30 Days)
            </Typography>
            <Box sx={{ height: '320px' }}>
              <Line data={lineChartData} options={lineChartOptions} />
            </Box>
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="caption" sx={{ color: '#999999' }}>
                Total Tickets (30 days): {ticketVolumeTrendData.reduce((sum, d) => sum + d.tickets, 0).toLocaleString()}
              </Typography>
              {summaryMetrics && (
                <Typography variant="caption" sx={{ color: '#999999' }}>
                  Total Conversations: {summaryMetrics.totalConversations.toLocaleString()}
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* System Performance Indicators */}
        <Grid size={{ xs: 12, lg: 4 }} data-testid="chart-card">
          <Paper
            sx={{
              p: 3,
              backgroundColor: '#242424',
              border: '1px solid #333333',
              height: '400px',
              width: '100%',
            }}
          >
            <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
              System Performance
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    Dashboard Load Time
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                    {systemPerformance.dashboardLoadTime.value} {systemPerformance.dashboardLoadTime.unit}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(systemPerformance.dashboardLoadTime.value / systemPerformance.dashboardLoadTime.threshold) * 100}
                  sx={{
                    height: '6px',
                    backgroundColor: '#333333',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4A7C59',
                    },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    Data Refresh Interval
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                    {systemPerformance.dataRefreshInterval.value} {systemPerformance.dataRefreshInterval.unit}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    Active Concurrent Users
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                    {systemPerformance.activeConcurrentUsers.value} / {systemPerformance.activeConcurrentUsers.capacity} ({systemPerformance.activeConcurrentUsers.percentage}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={systemPerformance.activeConcurrentUsers.percentage}
                  sx={{
                    height: '6px',
                    backgroundColor: '#333333',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: systemPerformance.activeConcurrentUsers.percentage < systemPerformance.activeConcurrentUsers.threshold ? '#4A7C59' : '#FF9500',
                    },
                  }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    System Uptime ({systemPerformance.systemUptime.period})
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                    {systemPerformance.systemUptime.value}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={systemPerformance.systemUptime.value}
                  sx={{
                    height: '6px',
                    backgroundColor: '#333333',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: systemPerformance.systemUptime.value >= systemPerformance.systemUptime.threshold ? '#4A7C59' : '#FF9500',
                    },
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Chatbot Performance Card */}
        <Grid size={{ xs: 12, lg: 4 }} data-testid="chart-card">
          <Paper
            sx={{
              p: 3,
              backgroundColor: '#242424',
              border: '1px solid #333333',
              height: '400px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
                Chatbot Performance
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      Resolution Rate
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                      74%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={74}
                    sx={{
                      height: '6px',
                      backgroundColor: '#333333',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#4A7C59',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      User Satisfaction
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      4.6/5.0
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={92}
                    sx={{
                      height: '6px',
                      backgroundColor: '#333333',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#D4AF37',
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                      Avg Response Time
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                      1.2s
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{
                      height: '6px',
                      backgroundColor: '#333333',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: '#2196F3',
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

      </Grid>

      {/* Top Issue Categories Chart */}
      <Paper
        sx={{
          p: 3,
          backgroundColor: '#242424',
          border: '1px solid #333333',
          height: '400px',
        }}
      >
        <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
          Top Issue Categories
        </Typography>
        <Box sx={{ height: '300px' }}>
          <Bar data={barChartData} options={barChartOptions} />
        </Box>
      </Paper>

          {/* Issue Categories Heatmap (visual density strip) */}
      <Paper
        sx={{
          mt: 3,
          p: 3,
          backgroundColor: '#242424',
          border: '1px solid #333333',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, color: '#D4AF37', fontWeight: 'bold' }}>
          Top Issue Categories Heatmap
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {topIssueCategoriesData.map((c, idx) => {
            const intensity = Math.min(1, Math.max(0.2, c.percentage / 30)); // normalize ~0.2-1.0
            const bg = `rgba(212, 175, 55, ${intensity})`;
            return (
              <Box
                key={idx}
                sx={{
                  minWidth: '140px',
                  px: 2,
                  py: 1.5,
                  backgroundColor: bg,
                  border: '1px solid #333333',
                  borderRadius: '4px',
                }}
              >
                <Typography variant="body2" sx={{ color: intensity > 0.6 ? '#1a1a1a' : '#E0E0E0', fontWeight: 'bold' }}>
                  {c.category}
                </Typography>
                <Typography variant="caption" sx={{ color: intensity > 0.6 ? '#1a1a1a' : '#E0E0E0' }}>
                  {c.count} ({c.percentage}%)
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#999999' }}>
          Darker gold indicates higher concentration of issues.
        </Typography>
      </Paper>

      {/* Anomaly Detection Alert */}
      <Alert
        severity="info"
        sx={{
          mt: 3,
          backgroundColor: '#1E2A32',
          border: '1px solid #2196F3',
          color: '#E0E0E0',
          '& .MuiAlert-icon': { color: '#2196F3' },
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
          Anomaly Detected: Unusual spike in tickets on 10/28
        </Typography>
        <Typography variant="body2" sx={{ color: '#999999' }}>
          Recommended: Review KB articles for "Lab Access" and schedule proactive communications.
        </Typography>
      </Alert>

      {/* Requirement 10: Chatbot Analytics Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 3 }}>
          Chatbot Analytics & Predictive Insights
        </Typography>

        {/* Frequent Query Topics */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: '#242424',
            border: '1px solid #333333',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
            Frequent Query Topics Analysis
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Topic</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Query Count</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Percentage</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Avg Clarifications</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Resolution Rate</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Avg Response Time</TableCell>
                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold' }}>Trend</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {frequentQueryTopics.map((topic, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      backgroundColor: '#242424',
                      '&:hover': { backgroundColor: '#2a2a2a' },
                      borderBottom: '1px solid #333333',
                    }}
                  >
                    <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>{topic.topic}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{topic.count}</TableCell>
                    <TableCell sx={{ color: '#999999' }}>{topic.percentage}%</TableCell>
                    <TableCell sx={{ color: '#999999' }}>{topic.avgClarifications}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${topic.resolutionRate}%`}
                        size="small"
                        sx={{
                          backgroundColor: topic.resolutionRate > 85 ? '#4A7C59' : topic.resolutionRate > 70 ? '#FF9500' : '#FF4444',
                          color: '#ffffff',
                          fontWeight: 'bold',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: '#999999' }}>{topic.avgResponseTime}s</TableCell>
                    <TableCell>
                      {topic.trend === 'up' ? (
                        <TrendingUpIcon sx={{ color: '#FF9500' }} />
                      ) : topic.trend === 'down' ? (
                        <TrendingDownIcon sx={{ color: '#4A7C59' }} />
                      ) : (
                        <Box sx={{ width: 20, height: 2, backgroundColor: '#999999' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Resolution Path Metrics */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: '#242424',
                border: '1px solid #333333',
                height: '100%',
              }}
            >
              <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
                Resolution Path Metrics
              </Typography>
              <Typography variant="body2" sx={{ color: '#999999', mb: 2 }}>
                How often users need additional exchanges before finding resolution (7 days)
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {[
                  ['exchanges1', '1 Exchange'],
                  ['exchanges2', '2 Exchanges'],
                  ['exchanges3', '3 Exchanges'],
                  ['exchanges4Plus', '4+ Exchanges'],
                ].map(([key, label]) => {
                  const metric = resolutionPathMetrics[key];
                  if (!metric) return null;
                  return (
                    <Box key={key}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" sx={{ color: '#E0E0E0' }}>{label}</Typography>
                        <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                          {metric.percentage}% ({metric.count} chats)
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={metric.percentage}
                        sx={{
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: '#333333',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: key === 'exchanges1' ? '#4A7C59' :
                                            key === 'exchanges2' ? '#D4AF37' :
                                            key === 'exchanges3' ? '#FF9500' : '#FF4444',
                          },
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        {'avgResolutionTime' in metric && (
                          <Typography variant="caption" sx={{ color: '#666666' }}>
                            Avg Resolution: {metric.avgResolutionTime}s
                          </Typography>
                        )}
                        {'satisfaction' in metric && (
                          <Typography variant="caption" sx={{ color: '#666666' }}>
                            Satisfaction: {metric.satisfaction}/5.0
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })}
                {/* Deflection vs Escalation bars */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>Deflection rate</Typography>
                    <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>59.5%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={59.5} sx={{ height: '8px', backgroundColor: '#333333', '& .MuiLinearProgress-bar': { backgroundColor: '#4A7C59' } }} />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ color: '#E0E0E0' }}>Escalation rate</Typography>
                    <Typography variant="body2" sx={{ color: '#FF4444', fontWeight: 'bold' }}>40.5%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={40.5} sx={{ height: '8px', backgroundColor: '#333333', '& .MuiLinearProgress-bar': { backgroundColor: '#FF4444' } }} />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: '#242424',
                border: '1px solid #333333',
                height: '100%',
              }}
            >
              <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
                Clarification Patterns
              </Typography>
              <Typography variant="body2" sx={{ color: '#999999', mb: 1 }}>
                216 chats were resolved with {'>'}1 exchange (7 days)
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {clarificationPatterns.map((pattern, idx) => (
                  <Card key={idx} sx={{ backgroundColor: '#1a1a1a', border: '1px solid #333333' }}>
                    <CardContent>
                      <Typography variant="body1" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 1 }}>
                        {pattern.pattern}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Chip label={`${pattern.frequency} chats`} size="small" sx={{ backgroundColor: '#333333', color: '#E0E0E0' }} />
                        <Chip label={`${pattern.percentage}%`} size="small" sx={{ backgroundColor: '#D4AF37', color: '#1a1a1a', fontWeight: 'bold' }} />
                      </Box>
                      <LinearProgress variant="determinate" value={pattern.percentage} sx={{ height: '6px', backgroundColor: '#2a2a2a', '& .MuiLinearProgress-bar': { backgroundColor: '#D4AF37' } }} />
                      <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 0.5 }}>
                        Common Topics: {pattern.commonTopics.join(', ')}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Chatbot Query Volume Trend */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: '#242424',
            border: '1px solid #333333',
            height: '400px',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
            Chatbot Query Volume Trend (Last 15 Days)
          </Typography>
          <Box sx={{ height: '300px' }}>
            <Line
              data={{
                labels: chatbotQueryVolumeTrend.map(d => {
                  const date = new Date(d.date);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }),
                datasets: [
                  {
                    label: 'Total Queries',
                    data: chatbotQueryVolumeTrend.map(d => d.queries),
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    fill: true,
                    tension: 0.4,
                  },
                  {
                    label: 'Resolved',
                    data: chatbotQueryVolumeTrend.map(d => d.resolved),
                    borderColor: '#4A7C59',
                    backgroundColor: 'rgba(74, 124, 89, 0.1)',
                    fill: true,
                    tension: 0.4,
                  },
                  {
                    label: 'Escalated',
                    data: chatbotQueryVolumeTrend.map(d => d.escalated),
                    borderColor: '#FF9500',
                    backgroundColor: 'rgba(255, 149, 0, 0.1)',
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={lineChartOptions}
            />
          </Box>
        </Paper>

        {/* Chatbot Predictive Insights */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {chatbotPredictiveInsights.map((insight, idx) => (
            <Alert
              key={idx}
              severity={insight.severity === 'warning' ? 'warning' : insight.severity === 'success' ? 'success' : 'info'}
              sx={{
                backgroundColor: insight.severity === 'warning' ? '#2A2417' :
                                 insight.severity === 'success' ? '#1a3a1a' : '#1E2A32',
                border: `1px solid ${
                  insight.severity === 'warning' ? '#FF9500' :
                  insight.severity === 'success' ? '#4A7C59' : '#2196F3'
                }`,
                color: '#E0E0E0',
                '& .MuiAlert-icon': {
                  color: insight.severity === 'warning' ? '#FF9500' :
                         insight.severity === 'success' ? '#4A7C59' : '#2196F3',
                },
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {insight.type === 'spike_prediction' ? '📈 Predictive Alert' :
                 insight.type === 'knowledge_gap' ? '📚 Knowledge Gap Detected' :
                 '✅ Accuracy Trend'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#999999', mb: 1 }}>
                {insight.message}
              </Typography>
              {insight.forecastDate && (
                <Typography variant="caption" sx={{ color: '#666666', display: 'block' }}>
                  Forecast Date: {insight.forecastDate} | Confidence: {insight.confidence}%
                </Typography>
              )}
              <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold', mt: 1 }}>
                Recommended Action: {insight.recommendedAction}
              </Typography>
            </Alert>
          ))}
        </Box>
      </Box>

      {/* Chatbot Monitoring Section */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ backgroundColor: '#242424', border: '1px solid #333333', mb: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 1.5 }}>
              Chatbot Performance Monitoring
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              Placeholder container for chatbot-specific metrics
            </Typography>
            <Box sx={{ mt: 2 }}>
              <ChatbotPerformanceMetrics chatbotPerformanceMetrics={chatbotPerformanceMetrics} />
            </Box>
          </Box>
        </Paper>

        {/* Sentiment Associations with Topics */}
        <Paper sx={{ backgroundColor: '#242424', border: '1px solid #333333', mb: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 3 }}>
              Sentiment Associations with Topics
            </Typography>
            <Box sx={{ height: '400px' }}>
              <Bar 
                data={{
                  labels: topicSentiments.map(t => t.topic),
                  datasets: [
                    {
                      label: 'Frustrated',
                      data: topicSentiments.map(t => t.frustrated),
                      backgroundColor: 'rgba(211, 47, 47, 0.1)', // Very light red fill
                      borderColor: '#D32F2F', // Red border from theme
                      borderWidth: 2,
                    },
                    {
                      label: 'Neutral',
                      data: topicSentiments.map(t => t.neutral),
                      backgroundColor: 'rgba(255, 149, 0, 0.1)', // Very light orange fill
                      borderColor: '#FF9500', // Orange border from theme
                      borderWidth: 2,
                    },
                    {
                      label: 'Satisfied',
                      data: topicSentiments.map(t => t.satisfied),
                      backgroundColor: 'rgba(74, 124, 89, 0.1)', // Very light green fill
                      borderColor: '#4A7C59', // Green border from theme
                      borderWidth: 2,
                    },
                  ],
                }} 
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'top',
                      labels: {
                        color: '#999999',
                        boxWidth: 12,
                        usePointStyle: true,
                      },
                    },
                    tooltip: {
                      backgroundColor: '#242424',
                      titleColor: '#D4AF37',
                      bodyColor: '#E0E0E0',
                      borderColor: '#333333',
                      borderWidth: 1,
                      padding: 12,
                      callbacks: {
                        label: function(context) {
                          const datasetLabel = context.dataset.label || '';
                          const value = context.parsed.x;
                          const topicIndex = context.dataIndex;
                          const topic = topicSentiments[topicIndex];
                          const total = topic.total;
                          const percentage = ((value / total) * 100).toFixed(1);
                          return `${datasetLabel}: ${value} (${percentage}%)`;
                        },
                      },
                    },
                    afterDraw: (chart) => {
                      const ctx = chart.ctx;
                      const datasets = chart.data.datasets;
                      const xScale = chart.scales.x;
                      
                      datasets.forEach((dataset, datasetIndex) => {
                        const meta = chart.getDatasetMeta(datasetIndex);
                        meta.data.forEach((bar, index) => {
                          const value = dataset.data[index];
                          if (value > 0) {
                            const topic = topicSentiments[index];
                            const total = topic.total;
                            const percentage = ((value / total) * 100).toFixed(1);
                            
                            if (parseFloat(percentage) >= 1) { // Show if >= 1%
                              ctx.save();
                              
                              // Calculate cumulative value for stacked bars
                              let cumulativeValue = 0;
                              for (let i = 0; i < datasetIndex; i++) {
                                cumulativeValue += datasets[i].data[index] || 0;
                              }
                              
                              // Get pixel positions for the segment
                              const segmentStartX = xScale.getPixelForValue(cumulativeValue);
                              const segmentEndX = xScale.getPixelForValue(cumulativeValue + value);
                              const segmentWidth = segmentEndX - segmentStartX;
                              
                              // Only draw if segment is wide enough
                              if (segmentWidth > 20) {
                                // Position label inside the bar, towards the right edge but with padding
                                const labelX = segmentStartX + segmentWidth * 0.85; // 85% from left edge
                                const labelY = bar.y;
                                
                                // Draw text with outline for better visibility
                                ctx.font = 'bold 12px Roboto';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                
                                // Draw text outline (stroke) first
                                ctx.strokeStyle = '#1a1a1a';
                                ctx.lineWidth = 3;
                                ctx.strokeText(`${percentage}%`, labelX, labelY);
                                
                                // Then draw the fill
                                ctx.fillStyle = '#E0E0E0';
                                ctx.fillText(`${percentage}%`, labelX, labelY);
                                
                                ctx.restore();
                              }
                            }
                          }
                        });
                      });
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      title: {
                        display: true,
                        text: 'Count',
                        color: '#999999',
                        font: { size: 12 },
                      },
                      grid: {
                        color: '#333333',
                        drawBorder: false,
                      },
                      ticks: {
                        color: '#999999',
                        font: { size: 11 },
                      },
                    },
                    y: {
                      stacked: true,
                      title: {
                        display: true,
                        text: 'Topic',
                        color: '#999999',
                        font: { size: 12 },
                      },
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        color: '#999999',
                        font: { size: 11 },
                      },
                    },
                  },
                  barThickness: 30,
                  categoryPercentage: 0.6,
                  barPercentage: 0.8,
                }} 
              />
            </Box>
          </Box>
        </Paper>

        {/* User Context/Corrective Prompts Metrics */}
        <Paper sx={{ backgroundColor: '#242424', border: '1px solid #333333', mb: 3 }}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 3 }}>
              User Context & Corrective Prompts Analysis
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 2 }}>
                      Prompts Needed Breakdown
                    </Typography>
                    <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Pie 
                        data={{
                          labels: ['0 Prompts', '1 Prompt', '2 Prompts', '3+ Prompts'],
                          datasets: [
                            {
                              data: [
                                correctivePromptMetrics.breakdown.zeroPrompts.count,
                                correctivePromptMetrics.breakdown.onePrompt.count,
                                correctivePromptMetrics.breakdown.twoPrompts.count,
                                correctivePromptMetrics.breakdown.threePlusPrompts.count,
                              ],
                              backgroundColor: ['#4A7C59', '#D4AF37', '#FF9500', '#FF4444'],
                              borderColor: ['#333333', '#333333', '#333333', '#333333'],
                              borderWidth: 2,
                            },
                          ],
                        }} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: {
                            legend: {
                              position: 'bottom',
                              labels: {
                                color: '#999999',
                                padding: 15,
                                usePointStyle: true,
                                font: {
                                  size: 12,
                                },
                              },
                            },
                            tooltip: {
                              backgroundColor: '#242424',
                              titleColor: '#D4AF37',
                              bodyColor: '#E0E0E0',
                              borderColor: '#333333',
                              borderWidth: 1,
                              padding: 12,
                            },
                          },
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ backgroundColor: '#1a1a1a', border: '1px solid #333333', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 2 }}>
                      Metrics Summary
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                            Total Queries Analyzed
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                            {correctivePromptMetrics.totalQueries.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                            Queries Needing Context
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#FF9500', fontWeight: 'bold' }}>
                            {correctivePromptMetrics.queriesNeedingContext} ({((correctivePromptMetrics.queriesNeedingContext / correctivePromptMetrics.totalQueries) * 100).toFixed(1)}%)
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                            Queries Needing Correction
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#FF4444', fontWeight: 'bold' }}>
                            {correctivePromptMetrics.queriesNeedingCorrection} ({((correctivePromptMetrics.queriesNeedingCorrection / correctivePromptMetrics.totalQueries) * 100).toFixed(1)}%)
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                            Avg Context Prompts per Query
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                            {correctivePromptMetrics.avgContextPrompts}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                            Avg Correction Prompts per Query
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                            {correctivePromptMetrics.avgCorrectionPrompts}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #333333' }}>
                      <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 2 }}>
                        Resolution Rate by Prompt Count
                      </Typography>
                      {Object.entries(correctivePromptMetrics.breakdown).map(([key, metric]) => (
                        <Box key={key} sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                              {key === 'zeroPrompts' ? '0 Prompts' :
                               key === 'onePrompt' ? '1 Prompt' :
                               key === 'twoPrompts' ? '2 Prompts' :
                               '3+ Prompts'} ({metric.percentage}%)
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                              {metric.resolutionRate}% resolution rate
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={metric.resolutionRate}
                            sx={{
                              height: '8px',
                              borderRadius: '4px',
                              backgroundColor: '#333333',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: metric.resolutionRate > 85 ? '#4A7C59' :
                                                 metric.resolutionRate > 70 ? '#D4AF37' :
                                                 metric.resolutionRate > 60 ? '#FF9500' : '#FF4444',
                              },
                            }}
                          />
                          <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 0.5 }}>
                            {metric.count.toLocaleString()} queries
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>

      {/* Footer Note */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: '#242424', borderRadius: '8px', border: '1px solid #333333' }}>
        <Typography variant="caption" sx={{ color: '#999999' }}>
          <strong>Real-time Metrics:</strong> All KPIs updated every {systemPerformance.dataRefreshInterval.value} minutes. 
          Predictive alerts use ML forecasting models trained on {pcteMetrics.totalHistoricalTickets.toLocaleString()}+ historical tickets.
          System supports {pcteMetrics.concurrentUserRange} concurrent users.
        </Typography>
      </Box>
    </Box>
  );
};

export default AnalyticsDashboard;

