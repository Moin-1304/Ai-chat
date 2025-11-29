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
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  History as HistoryIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {
  currentModel,
  modelVersions,
  retrainingEvents,
  dataIncorporationSources,
  rollbackHistory,
  obsoleteInformation,
} from '../data/mockModelVersions';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const ModelVersioning = () => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Prepare chart data - cumulative accuracy values
  const calculateCumulativeAccuracy = () => {
    // Start with base accuracy and add improvements
    let overall = 84.7;
    let classification = 86.5;
    let sentiment = 82.0;
    
    const overallData = [overall];
    const classificationData = [classification];
    const sentimentData = [sentiment];
    
    retrainingEvents.slice().reverse().forEach((event) => {
      overall += event.metricsImprovement.overallAccuracy;
      classification += event.metricsImprovement.classificationAccuracy;
      sentiment += event.metricsImprovement.sentimentAccuracy;
      
      overallData.push(overall);
      classificationData.push(classification);
      sentimentData.push(sentiment);
    });
    
    return { overallData, classificationData, sentimentData };
  };

  const { overallData, classificationData, sentimentData } = calculateCumulativeAccuracy();

  const chartData = {
    labels: retrainingEvents.map((e) => formatDate(e.date)).reverse(),
    datasets: [
      {
        label: 'Overall Accuracy',
        data: overallData,
        borderColor: '#D4AF37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Classification Accuracy',
        data: classificationData,
        borderColor: '#4A7C59',
        backgroundColor: 'rgba(74, 124, 89, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Sentiment Accuracy',
        data: sentimentData,
        borderColor: '#FF9500',
        backgroundColor: 'rgba(255, 149, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E0E0E0',
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#999999',
        },
        grid: {
          color: '#333333',
        },
      },
      y: {
        ticks: {
          color: '#999999',
        },
        grid: {
          color: '#333333',
        },
      },
    },
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', maxWidth: '1920px', mx: 'auto' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <PsychologyIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                Model Versioning & Continuous Learning
              </Typography>
              <Chip
                label={currentModel.version}
                sx={{
                  bgcolor: '#D4AF37',
                  color: '#1a1a1a',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              />
            </Box>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Track model improvements and retraining history
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Current Model Status Card */}
      <Card sx={{ mb: 4, bgcolor: '#242424', border: '1px solid #333333' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Current Version
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                  {currentModel.version}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Release Date
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {currentModel.releaseDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Chip
                  icon={<CheckCircleIcon />}
                  label={currentModel.status}
                  sx={{
                    bgcolor: currentModel.statusColor,
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  size="small"
                />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Next Retraining Scheduled
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {currentModel.nextRetraining}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: '#D4AF37', fontWeight: 'bold' }}>
                Model Performance Metrics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Overall Accuracy
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                        {currentModel.performance.overallAccuracy}%
                      </Typography>
                      <Chip
                        icon={<TrendingUpIcon />}
                        label={`+${currentModel.performance.overallAccuracyChange}%`}
                        size="small"
                        sx={{ bgcolor: '#4A7C59', color: 'white' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Classification Accuracy
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A7C59' }}>
                      {currentModel.performance.classificationAccuracy}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Sentiment Detection
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF9500' }}>
                      {currentModel.performance.sentimentDetectionAccuracy}%
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Response Relevance
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                      {currentModel.performance.responseRelevance}%
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Model Version Timeline */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#D4AF37' }}>
          Model Version Timeline
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          {modelVersions.map((version, index) => (
            <React.Fragment key={version.version}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 120,
                }}
              >
                <Chip
                  label={version.version}
                  sx={{
                    bgcolor: version.status === 'Active' ? '#D4AF37' : version.statusColor,
                    color: version.status === 'Active' ? '#1a1a1a' : 'white',
                    fontWeight: 'bold',
                    mb: 1,
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {formatDate(version.releaseDate)}
                </Typography>
                <Typography variant="caption" sx={{ color: version.statusColor, mt: 0.5 }}>
                  {version.status}
                </Typography>
              </Box>
              {index < modelVersions.length - 1 && (
                <Box
                  sx={{
                    width: 40,
                    height: 2,
                    bgcolor: '#333333',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: -6,
                      top: -4,
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid #333333',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent',
                    },
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Paper>

      {/* Retraining Events Table */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#D4AF37' }}>
          Retraining Events (Last 6 Months)
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#1a1a1a', borderBottom: '2px solid #333333' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Version</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Data Incorporated</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Training Duration</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Metrics Improvement</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#D4AF37' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {retrainingEvents.map((event) => (
                <React.Fragment key={event.id}>
                  <TableRow
                    sx={{
                      bgcolor: '#242424',
                      borderBottom: '1px solid #333333',
                      '&:hover': { bgcolor: '#2a2a2a' },
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleRow(event.id)}
                  >
                    <TableCell sx={{ color: '#E0E0E0' }}>{formatDate(event.date)}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>{event.version}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>
                      {event.dataIncorporated.newTickets} tickets, {event.dataIncorporated.kbArticles} KB articles
                    </TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>{event.trainingDuration}</TableCell>
                    <TableCell sx={{ color: '#E0E0E0' }}>
                      {event.status === 'Rolled back' ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingDownIcon sx={{ color: '#DC3545', fontSize: 16 }} />
                          <Typography component="span" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                            {event.accuracyDrop}%
                          </Typography>
                          <Typography component="span" sx={{ color: '#999999', fontSize: '0.75rem', ml: 0.5 }}>
                            (Expected: +{event.metricsImprovement.overallAccuracy}%)
                          </Typography>
                        </Box>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <TrendingUpIcon sx={{ color: '#4A7C59', fontSize: 16 }} />
                          <Typography component="span" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                            +{event.metricsImprovement.overallAccuracy}%
                          </Typography>
                        </Box>
                      )}
                    </TableCell>
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
                      <IconButton size="small">
                        {expandedRows[event.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 0, borderBottom: expandedRows[event.id] ? '1px solid #333333' : 'none' }}>
                      <Collapse in={expandedRows[event.id]} timeout="auto" unmountOnExit>
                        <Box sx={{ p: 2, bgcolor: '#1a1a1a' }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" sx={{ mb: 1, color: '#D4AF37', fontWeight: 'bold' }}>
                                Data Breakdown
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                                • New Tickets: {event.dataIncorporated.newTickets.toLocaleString()}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                                • KB Articles: {event.dataIncorporated.kbArticles}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                                • User Feedback: {event.dataIncorporated.userFeedback} ratings
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                                • Staff Corrections: {event.dataIncorporated.staffCorrections} tags
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography variant="subtitle2" sx={{ mb: 1, color: '#D4AF37', fontWeight: 'bold' }}>
                                Performance Improvements
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                                • Overall Accuracy: +{event.metricsImprovement.overallAccuracy}%
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                                • Classification: +{event.metricsImprovement.classificationAccuracy}%
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 0.5 }}>
                                • Sentiment: +{event.metricsImprovement.sentimentAccuracy}%
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                                • Response Relevance: +{event.metricsImprovement.responseRelevance}%
                              </Typography>
                              {event.rollbackReason && (
                                <Box sx={{ mt: 2, p: 2, bgcolor: '#1a1a1a', border: '2px solid #FF9500', borderRadius: 1 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                    <WarningIcon sx={{ color: '#FF9500' }} />
                                    <Typography variant="subtitle2" sx={{ color: '#FF9500', fontWeight: 'bold' }}>
                                      Rollback Required
                                    </Typography>
                                  </Box>
                                  <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 2 }}>
                                    {event.rollbackReason}
                                  </Typography>
                                  <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" sx={{ color: '#999999' }}>
                                        Expected Accuracy
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                                        {event.expectedAccuracy}%
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="caption" sx={{ color: '#999999' }}>
                                        Actual Accuracy
                                      </Typography>
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <TrendingDownIcon sx={{ color: '#DC3545', fontSize: 16 }} />
                                        <Typography variant="body2" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                                          {event.accuracyBeforeRollback}%
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography variant="caption" sx={{ color: '#999999' }}>
                                        Accuracy Drop
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                                        {event.accuracyDrop > 0 ? '+' : ''}{event.accuracyDrop}%
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography variant="caption" sx={{ color: '#999999' }}>
                                        Rolled Back To
                                      </Typography>
                                      <Chip
                                        label={event.rolledBackTo}
                                        size="small"
                                        sx={{ bgcolor: '#4A7C59', color: 'white', fontWeight: 'bold', mt: 0.5 }}
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Typography variant="caption" sx={{ color: '#999999' }}>
                                        Rollback Date
                                      </Typography>
                                      <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                                        {formatDate(event.rollbackDate)}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Box>
                              )}
                            </Grid>
                          </Grid>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Data Incorporation Sources & Model Performance Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', bgcolor: '#242424', border: '1px solid #333333' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#D4AF37' }}>
              Data Incorporation Sources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Historical Tickets
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                  {dataIncorporationSources.historicalTickets.toLocaleString()}+
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  User Feedback
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A7C59' }}>
                  {dataIncorporationSources.userFeedback.toLocaleString()}+ ratings
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  KB Updates
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FF9500' }}>
                  {dataIncorporationSources.kbUpdates} articles
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Support Staff Corrections
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                  {dataIncorporationSources.staffCorrections} manual tags
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Failed Query Patterns
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                  {dataIncorporationSources.failedQueryPatterns} patterns
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%', bgcolor: '#242424', border: '1px solid #333333' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#D4AF37' }}>
              Model Performance Over Time
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Retraining Configuration & Rollback Capability */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: '#242424', border: '1px solid #333333' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon sx={{ color: '#FF9500' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
                  Rollback Capability
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                sx={{
                  borderColor: '#FF9500',
                  color: '#FF9500',
                  '&:hover': {
                    borderColor: '#FF9500',
                    bgcolor: 'rgba(255, 149, 0, 0.1)',
                  },
                }}
              >
                Rollback to Previous Version
              </Button>
            </Box>
            <Box sx={{ mb: 2, p: 2, bgcolor: '#1a1a1a', borderRadius: 1, borderLeft: '3px solid #FF9500' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <InfoIcon sx={{ color: '#FF9500', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ color: '#FF9500', fontWeight: 'bold' }}>
                  What is Rollback?
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#E0E0E0', lineHeight: 1.6 }}>
                Rollback reverts the model to a previous stable version when performance degradation is detected in production. 
                This ensures system reliability by quickly restoring proven model performance when new versions underperform.
              </Typography>
            </Box>
            {rollbackHistory.length > 0 ? (
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, color: '#D4AF37', fontWeight: 'bold' }}>
                  Rollback History
                </Typography>
                {rollbackHistory.map((rollback) => {
                  const rolledBackEvent = retrainingEvents.find(e => e.version === rollback.fromVersion);
                  return (
                    <Box
                      key={rollback.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        bgcolor: '#1a1a1a',
                        borderRadius: 1,
                        borderLeft: '3px solid #FF9500',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <WarningIcon sx={{ color: '#FF9500' }} />
                        <Typography variant="body1" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                          {formatDate(rollback.date)} - {rollback.fromVersion} → {rollback.toVersion}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#999999', mb: 1 }}>
                        {rollback.reason}
                      </Typography>
                      {rolledBackEvent && (
                        <Box sx={{ mt: 1, p: 1, bgcolor: '#242424', borderRadius: 1 }}>
                          <Typography variant="caption" sx={{ color: '#999999' }}>
                            Performance Impact:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999999' }}>
                                Expected
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                                {rolledBackEvent.expectedAccuracy}%
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999999' }}>
                                Actual
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <TrendingDownIcon sx={{ color: '#DC3545', fontSize: 16 }} />
                                <Typography variant="body2" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                                  {rolledBackEvent.accuracyBeforeRollback}%
                                </Typography>
                              </Box>
                            </Box>
                            <Box>
                              <Typography variant="caption" sx={{ color: '#999999' }}>
                                Drop
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#DC3545', fontWeight: 'bold' }}>
                                {rolledBackEvent.accuracyDrop}%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      )}
                      <Typography variant="caption" sx={{ color: '#666666', mt: 1, display: 'block' }}>
                        Performed by: {rollback.performedBy}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No rollback history - All model versions performing as expected
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Forget Obsolete Information */}
      <Paper sx={{ p: 3, bgcolor: '#242424', border: '1px solid #333333' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <DeleteIcon sx={{ color: '#FF9500' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
            Forget Obsolete Information
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Deprecated features and outdated information that have been removed from training data:
        </Typography>
        {obsoleteInformation.map((item) => (
          <Box
            key={item.id}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: '#1a1a1a',
              borderRadius: 1,
              borderLeft: '3px solid #FF9500',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#E0E0E0' }}>
                {item.name}
              </Typography>
              <Chip
                label={item.type}
                size="small"
                sx={{ bgcolor: '#FF9500', color: '#1a1a1a', fontWeight: 'bold' }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#999999', mb: 0.5 }}>
              Removed: {formatDate(item.removedDate)}
            </Typography>
            <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
              {item.reason}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default ModelVersioning;

