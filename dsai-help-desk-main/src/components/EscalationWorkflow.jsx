import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Switch,
  Pagination,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EscalatorIcon from '@mui/icons-material/Escalator';
import { escalationTiers, escalationMetrics } from '../data/mockEscalation';
import { escalationRules } from '../data/mockConfiguration';

const EscalationWorkflow = () => {
  const [expandedTiers, setExpandedTiers] = useState({});
  const [showAllTickets, setShowAllTickets] = useState({});
  const [currentPage, setCurrentPage] = useState({});

  const handleToggleTickets = (tierIndex) => {
    setExpandedTiers((prev) => ({
      ...prev,
      [tierIndex]: !prev[tierIndex],
    }));
    // Reset showAllTickets and currentPage when collapsing
    if (expandedTiers[tierIndex]) {
      setShowAllTickets((prev) => ({
        ...prev,
        [tierIndex]: false,
      }));
      setCurrentPage((prev) => ({
        ...prev,
        [tierIndex]: 1,
      }));
    }
  };

  const handleShowMore = (tierIndex, e) => {
    e.stopPropagation();
    setShowAllTickets((prev) => ({
      ...prev,
      [tierIndex]: !prev[tierIndex],
    }));
    // Set to page 1 when showing more
    if (!showAllTickets[tierIndex]) {
      setCurrentPage((prev) => ({
        ...prev,
        [tierIndex]: 1,
      }));
    }
  };

  const handlePageChange = (tierIndex, e, page) => {
    e.stopPropagation();
    setCurrentPage((prev) => ({
      ...prev,
      [tierIndex]: page,
    }));
  };
  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', maxWidth: '1920px', mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <EscalatorIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Escalation Workflow
            </Typography>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Ticket routing through support tiers with success rates and context preservation
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Overall Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Paper sx={{ p: 2, backgroundColor: '#242424', borderLeft: '4px solid #D4AF37' }}>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Total Tickets (30 days)
            </Typography>
            <Typography variant="h5" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
              {escalationMetrics.totalTickets.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, backgroundColor: '#242424', borderLeft: '4px solid #4A7C59' }}>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Avg Resolution Time
            </Typography>
            <Typography variant="h5" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
              {escalationMetrics.avgTimeToResolution}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, backgroundColor: '#242424', borderLeft: '4px solid #FF9500' }}>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Total Escalations
            </Typography>
            <Typography variant="h5" sx={{ color: '#FF9500', fontWeight: 'bold' }}>
              {escalationMetrics.totalEscalations}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, backgroundColor: '#242424', borderLeft: '4px solid #2196F3' }}>
            <Typography variant="caption" sx={{ color: '#999999' }}>
              Context Preservation
            </Typography>
            <Typography variant="h5" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
              {escalationMetrics.contextPreservationRate}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Escalation Flowchart */}
      <Paper sx={{ p: 4, backgroundColor: '#242424', border: '1px solid #333333' }}>
        <Typography variant="h2" sx={{ mb: 4, color: '#D4AF37', fontWeight: 'bold', textAlign: 'center' }}>
          Support Tier Escalation Flow
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          {escalationTiers.map((tier, idx) => (
            <Box key={idx} sx={{ width: '100%', maxWidth: '900px' }}>
              {/* Tier Card */}
              <Card
                sx={{
                  backgroundColor: '#1a1a1a',
                  border: `3px solid ${tier.color}`,
                  borderRadius: '8px',
                  boxShadow: `0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 1px ${tier.color}40`,
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Tier Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography
                          variant="h3"
                          sx={{
                            color: tier.color,
                            fontWeight: 'bold',
                            fontSize: '24px',
                          }}
                        >
                          {tier.tier}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            color: '#E0E0E0',
                            fontWeight: 'bold',
                            fontSize: '18px',
                          }}
                        >
                          {tier.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#999999' }}>
                        {tier.description}
                      </Typography>
                    </Box>
                    <Chip
                      label={`${tier.successRate}% Success`}
                      sx={{
                        backgroundColor: tier.color,
                        color: '#1a1a1a',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        height: '32px',
                      }}
                    />
                  </Box>

                  {/* Metrics Row */}
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1.5, backgroundColor: '#242424', borderRadius: '4px' }}>
                        <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 0.5 }}>
                          Avg Resolution Time
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                          {tier.avgResolutionTime}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box sx={{ p: 1.5, backgroundColor: '#242424', borderRadius: '4px' }}>
                        <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 0.5 }}>
                          Resolved This Month
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                          {tier.resolutionCount.toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                    {tier.escalationTo && (
                      <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ p: 1.5, backgroundColor: '#242424', borderRadius: '4px' }}>
                          <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 0.5 }}>
                            Escalation Rate
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#FF9500', fontWeight: 'bold' }}>
                            {tier.escalationRate}% → {tier.escalationTo}
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                  </Grid>

                  {/* Context Preservation & Integration */}
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
                    {tier.contextPreservation && (
                      <Box>
                        <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 0.5 }}>
                          Context Preservation
                        </Typography>
                        <Chip
                          label="✓ Context Preserved"
                          size="small"
                          sx={{
                            backgroundColor: '#4A7C59',
                            color: '#ffffff',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                    )}
                    <Box>
                      <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 0.5 }}>
                        Integration Points
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {tier.integrationPoints.map((point, pIdx) => (
                          <Chip
                            key={pIdx}
                            label={point}
                            size="small"
                            sx={{
                              backgroundColor: '#333333',
                              color: '#E0E0E0',
                              fontSize: '11px',
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>

                  {/* Escalation Triggers */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 1 }}>
                      Escalation Triggers:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {tier.triggers.map((trigger, tIdx) => (
                        <Chip
                          key={tIdx}
                          label={trigger}
                          size="small"
                          sx={{
                            backgroundColor: '#2A2A2A',
                            color: '#D4AF37',
                            border: '1px solid #D4AF37',
                            fontSize: '11px',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Resolved Tickets - Expandable Section */}
                  {tier.sampleTickets && (
                    <Box>
                      <Button
                        onClick={() => handleToggleTickets(idx)}
                        endIcon={expandedTiers[idx] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{
                          color: '#D4AF37',
                          textTransform: 'none',
                          fontSize: '12px',
                          p: 0,
                          minWidth: 'auto',
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                        }}
                      >
                        <Typography variant="caption" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                          View Resolved Tickets
                        </Typography>
                      </Button>
                      <Collapse in={expandedTiers[idx]}>
                        <Box sx={{ mt: 2 }}>
                          <TableContainer sx={{ backgroundColor: '#242424', borderRadius: '4px', border: '1px solid #333333' }}>
                            <Table size="small">
                              <TableHead>
                                <TableRow sx={{ backgroundColor: '#1a1a1a' }}>
                                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '11px', py: 1 }}>
                                    Ticket ID
                                  </TableCell>
                                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '11px', py: 1 }}>
                                    Title
                                  </TableCell>
                                  <TableCell sx={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '11px', py: 1 }}>
                                    Resolved
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {(showAllTickets[idx] ? tier.sampleTickets : tier.sampleTickets.slice(0, 3)).map((ticket, ticketIdx) => (
                                  <TableRow
                                    key={ticketIdx}
                                    sx={{
                                      backgroundColor: '#242424',
                                      '&:hover': { backgroundColor: '#2a2a2a' },
                                      '&:last-child td': { borderBottom: 0 },
                                    }}
                                  >
                                    <TableCell sx={{ color: '#E0E0E0', fontSize: '11px', py: 1 }}>
                                      {ticket.id}
                                    </TableCell>
                                    <TableCell sx={{ color: '#E0E0E0', fontSize: '11px', py: 1 }}>
                                      {ticket.title}
                                    </TableCell>
                                    <TableCell sx={{ color: '#999999', fontSize: '11px', py: 1 }}>
                                      {ticket.resolved}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ color: '#666666' }}>
                                Showing {showAllTickets[idx] ? tier.sampleTickets.length : 3} of {tier.resolutionCount.toLocaleString()} resolved tickets
                              </Typography>
                              {tier.sampleTickets.length > 3 && (
                                <Button
                                  onClick={(e) => handleShowMore(idx, e)}
                                  sx={{
                                    color: '#D4AF37',
                                    textTransform: 'none',
                                    fontSize: '11px',
                                    p: 0,
                                    minWidth: 'auto',
                                    '&:hover': {
                                      backgroundColor: 'transparent',
                                      textDecoration: 'underline',
                                    },
                                  }}
                                >
                                  {showAllTickets[idx] ? 'Show Less' : 'Show More'}
                                </Button>
                              )}
                            </Box>
                            {showAllTickets[idx] && (
                              <Stack spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                <Pagination
                                  count={Math.ceil(tier.sampleTickets.length / 10)}
                                  page={currentPage[idx] || 1}
                                  onChange={(e, page) => handlePageChange(idx, e, page)}
                                  size="small"
                                  sx={{
                                    '& .MuiPaginationItem-root': {
                                      color: '#999999',
                                      fontSize: '11px',
                                      '&.Mui-selected': {
                                        backgroundColor: '#D4AF37',
                                        color: '#1a1a1a',
                                        fontWeight: 'bold',
                                        '&:hover': {
                                          backgroundColor: '#E8C547',
                                        },
                                      },
                                      '&:hover': {
                                        backgroundColor: '#333333',
                                        color: '#D4AF37',
                                      },
                                    },
                                  }}
                                />
                              </Stack>
                            )}
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Arrow to next tier */}
              {tier.escalationTo && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 2,
                    color: tier.color,
                  }}
                >
                  <Box
                    sx={{
                      width: '4px',
                      height: '40px',
                      backgroundColor: tier.color,
                      borderRadius: '2px',
                    }}
                  />
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Flow Summary */}
        <Box sx={{ mt: 4, p: 3, backgroundColor: '#1a1a1a', borderRadius: '8px', border: '1px solid #333333' }}>
          <Typography variant="h3" sx={{ mb: 2, color: '#D4AF37', fontWeight: 'bold' }}>
            Workflow Summary
          </Typography>
          <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 2 }}>
            Tickets flow through support tiers based on complexity and urgency. Each tier preserves context from previous interactions,
            ensuring seamless escalation. The AI system routes tickets automatically using ML classification, while maintaining full
            audit trail and context preservation throughout the support lifecycle.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={`Tier 0 Resolves: ${((escalationMetrics.tier0Resolutions / escalationMetrics.totalTickets) * 100).toFixed(1)}%`}
              sx={{ backgroundColor: '#D4AF37', color: '#1a1a1a', fontWeight: 'bold' }}
            />
            <Chip
              label={`Total Escalations: ${escalationMetrics.totalEscalations}`}
              sx={{ backgroundColor: '#FF9500', color: '#1a1a1a', fontWeight: 'bold' }}
            />
            <Chip
              label={`Context Preservation: ${escalationMetrics.contextPreservationRate}%`}
              sx={{ backgroundColor: '#4A7C59', color: '#1a1a1a', fontWeight: 'bold' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Escalation Rules Section */}
      <Paper sx={{ p: 4, backgroundColor: '#242424', border: '1px solid #333333', mt: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
            Escalation Rules
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ backgroundColor: '#D4AF37', color: '#1a1a1a' }}
          >
            Create New Rule
          </Button>
        </Box>

        <Grid container spacing={3}>
          {escalationRules.map((rule) => (
            <Grid item xs={12} md={6} key={rule.id}>
              <Card
                sx={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #333333',
                  '&:hover': {
                    borderColor: '#D4AF37',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                    <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      {rule.name}
                    </Typography>
                    <FormControlLabel
                      control={<Switch checked={rule.enabled} sx={{ color: '#4A7C59' }} />}
                      label=""
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 2 }}>
                    {rule.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ color: '#999999', display: 'block', mb: 1 }}>
                      Conditions:
                    </Typography>
                    {rule.conditions.map((condition, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          p: 1,
                          mb: 0.5,
                          backgroundColor: '#333333',
                          borderRadius: '4px',
                          display: 'inline-block',
                          mr: 1,
                        }}
                      >
                        <Typography variant="caption" sx={{ color: '#E0E0E0' }}>
                          {condition.field} {condition.operator} {condition.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: '#999999' }}>
                      Action:
                    </Typography>
                    <Chip
                      label={rule.action}
                      size="small"
                      sx={{ backgroundColor: '#4A7C59', color: '#ffffff', fontWeight: 'bold' }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<EditIcon />} sx={{ color: '#D4AF37' }}>
                      Edit
                    </Button>
                    <Button size="small" startIcon={<DeleteIcon />} sx={{ color: '#FF9500' }}>
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default EscalationWorkflow;

