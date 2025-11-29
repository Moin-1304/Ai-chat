import React, { useState } from 'react';
import {
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Chip, 
  InputAdornment, 
  Snackbar, 
  Alert,
  Stack,
  Divider,
  Paper,
  alpha,
  Rating,
  CircularProgress,
  Link,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LockResetIcon from '@mui/icons-material/LockReset';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SchoolIcon from '@mui/icons-material/School';
import BugReportIcon from '@mui/icons-material/BugReport';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AIChatPanel from './AIChatPanel';
import { searchArticles } from '../data/mockKB';
import { getExternalResults } from '../data/mockSearchResults';

const SelfServicePortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null); // Track selected suggestion
  const [chatOpen, setChatOpen] = useState(true); // Always open by default
  const [ticketCreated, setTicketCreated] = useState(null);
  const [initialChatMessage, setInitialChatMessage] = useState(null);

  // Handle search
  const handleSearch = (query = null) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    setSearchResults(null);
    setSelectedSuggestion(null); // Clear selected suggestion when manually searching
    
    // Simulate AI search delay
    setTimeout(() => {
      const kbResults = searchArticles(searchTerm);
      const externalResults = getExternalResults(searchTerm);
      setSearchResults({
        kb: kbResults.slice(0, 5), // Top 5 KB results
        external: externalResults.slice(0, 3), // Top 3 external results
        query: searchTerm,
      });
      setIsSearching(false);
    }, 800);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion); // Track which suggestion was clicked
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  // Mock AI suggestions based on search
  const getAISuggestions = () => {
    if (!searchQuery || searchResults) return [];
    const suggestions = {
      password: ['Password Reset Guide', 'Account Lockout Recovery', 'MFA Setup'],
      lab: ['Lab Access Request', 'Lab Environment Setup', 'Lab Troubleshooting'],
      training: ['Training Schedule', 'Certification Paths', 'Course Materials'],
      error: ['Common Errors', 'Error Code Reference', 'Troubleshooting Guide'],
    };
    
    for (const [key, values] of Object.entries(suggestions)) {
      if (searchQuery.toLowerCase().includes(key)) return values;
    }
    return ['Getting Started', 'FAQ', 'Contact Support'];
  };

  const suggestions = getAISuggestions();
  
  const getSourceIcon = (source) => {
    switch (source) {
      case 'Jira':
        return <IntegrationInstructionsIcon sx={{ fontSize: 16 }} />;
      case 'Confluence':
        return <ArticleIcon sx={{ fontSize: 16 }} />;
      case 'MKDocs':
        return <DescriptionIcon sx={{ fontSize: 16 }} />;
      default:
        return <ArticleIcon sx={{ fontSize: 16 }} />;
    }
  };
  
  const getSourceColor = (source) => {
    switch (source) {
      case 'Jira':
        return '#0052CC';
      case 'Confluence':
        return '#0052CC'; // Changed to blue for better visibility
      case 'MKDocs':
        return '#2196F3';
      default:
        return '#999999';
    }
  };

  const quickActions = [
    { 
      icon: LockResetIcon, 
      title: 'Password Reset', 
      desc: 'Reset PCTE credentials', 
      time: '~2 min',
      chatMessage: 'I forgot my password',
    },
    { 
      icon: VpnKeyIcon, 
      title: 'Lab Access', 
      desc: 'Request environment access', 
      time: '~5 min',
      chatMessage: 'I can\'t access the lab',
    },
    { 
      icon: SchoolIcon, 
      title: 'Training Portal', 
      desc: 'Access course materials', 
      time: 'Instant',
      chatMessage: 'I need help accessing training materials',
    },
    { 
      icon: BugReportIcon, 
      title: 'Report Issue', 
      desc: 'Submit support ticket', 
      time: '~1 min',
      chatMessage: 'I want to report an issue',
    },
  ];

  const recentArticles = [
    { title: 'Getting Started with PCTE', views: 1247, rating: 4.9 },
    { title: 'Lab Access Troubleshooting', views: 892, rating: 4.8 },
    { title: 'Password Reset Guide', views: 756, rating: 4.9 },
    { title: 'Network Configuration', views: 543, rating: 4.6 },
    { title: 'Firewall Rules Reference', views: 421, rating: 4.5 },
  ];

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: '#1a1a1a', minHeight: '100vh', width: '100%' }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SupportAgentIcon sx={{ fontSize: 40, color: '#D4AF37' }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
              Self-Service Portal
            </Typography>
            <Typography variant="body1" sx={{ color: '#E0E0E0', mt: 0.5 }}>
              Resolve issues independently with AI-powered guidance
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* AI-Powered Search Section */}
      <Card
        elevation={0}
        sx={{
          mb: 4,
          border: '2px solid',
          borderColor: alpha('#D4AF37', 0.3),
          backgroundColor: alpha('#242424', 0.8),
          '&:hover': {
            borderColor: alpha('#D4AF37', 0.5),
          },
          transition: 'all 0.2s ease',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" gap={1} mb={2}>
            <SearchIcon sx={{ color: '#D4AF37' }} />
            <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
              AI-Powered Search
            </Typography>
            <Chip
              label="AI"
              size="small"
              sx={{
                backgroundColor: alpha('#0052CC', 0.2),
                color: '#0052CC',
                fontSize: '10px',
                height: '20px',
                fontWeight: 'bold',
              }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              placeholder="Search knowledge base... Ask anything about PCTE"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="large"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#D4AF37' }} />
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  handleSearch();
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#1a1a1a',
                  color: '#E0E0E0',
                  fontSize: '16px',
                  '& fieldset': {
                    borderColor: alpha('#333333', 0.5),
                  },
                  '&:hover fieldset': {
                    borderColor: alpha('#D4AF37', 0.5),
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4AF37',
                    borderWidth: '2px',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              sx={{
                minWidth: '120px',
                backgroundColor: '#D4AF37',
                color: '#1a1a1a',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#E8C547',
                },
                '&:disabled': {
                  backgroundColor: alpha('#D4AF37', 0.3),
                  color: alpha('#1a1a1a', 0.5),
                },
              }}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </Stack>
          {suggestions.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={{ color: '#999999', mb: 1, display: 'block' }}>
                AI Suggestions:
              </Typography>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {suggestions.map((sug, idx) => (
                  <Chip
                    key={idx}
                    label={sug}
                    onClick={() => handleSuggestionClick(sug)}
                    sx={{
                      backgroundColor: alpha('#333333', 0.8),
                      color: '#D4AF37',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: alpha('#D4AF37', 0.2),
                      '&:hover': {
                        backgroundColor: alpha('#D4AF37', 0.1),
                        borderColor: '#D4AF37',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
          {isSearching && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 3, justifyContent: 'center', py: 2 }}>
              <AutoAwesomeIcon sx={{ color: '#D4AF37', fontSize: 20 }} />
              <Typography variant="body2" sx={{ color: '#999999' }}>
                AI is searching knowledge base and external systems...
              </Typography>
              <CircularProgress size={20} sx={{ color: '#D4AF37' }} />
            </Box>
          )}
              {searchResults && !isSearching && (
            <Box sx={{ mt: 3 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="body2" sx={{ color: '#999999' }}>
                  Found {searchResults.kb.length + searchResults.external.length} results for "{searchResults.query}"
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    // Use selected suggestion if available, otherwise use search query
                    const chatMessage = selectedSuggestion || searchResults.query;
                    setInitialChatMessage(chatMessage);
                    setChatOpen(true);
                  }}
                  sx={{
                    borderColor: '#D4AF37',
                    color: '#D4AF37',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      borderColor: '#D4AF37',
                      bgcolor: alpha('#D4AF37', 0.1),
                    },
                  }}
                >
                  Chat about this
                </Button>
              </Stack>
              
              {/* Knowledge Base Results */}
              {searchResults.kb.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" alignItems="center" gap={1} mb={2}>
                    <DescriptionIcon sx={{ color: '#D4AF37', fontSize: 20 }} />
                    <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                      Knowledge Base Articles
                    </Typography>
                    <Chip label={searchResults.kb.length} size="small" sx={{ bgcolor: '#D4AF37', color: '#1a1a1a', fontWeight: 'bold' }} />
                  </Stack>
                  <Grid container spacing={2}>
                    {searchResults.kb.map((article) => (
                      <Grid item xs={12} md={6} key={article.id}>
                        <Card
                          sx={{
                            border: '1px solid',
                            borderColor: '#333333',
                            backgroundColor: '#1a1a1a',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: '#D4AF37',
                              transform: 'translateY(-2px)',
                              boxShadow: 4,
                            },
                          }}
                        >
                          <CardContent>
                            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
                              <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                                  <Chip
                                    label={article.id}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#D4AF37', 0.2),
                                      color: '#D4AF37',
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                  <Chip
                                    label={article.source}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#999999', 0.2),
                                      color: '#999999',
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                  <Chip
                                    label={`${(article.confidence * 100).toFixed(0)}% match`}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#4A7C59', 0.2),
                                      color: '#4A7C59',
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                </Stack>
                                <Typography variant="h6" sx={{ color: '#E0E0E0', fontWeight: 'bold', mb: 1 }}>
                                  {article.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#999999', mb: 1.5 }}>
                                  {article.summary}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="caption" sx={{ color: '#666666' }}>
                                    {article.views.toLocaleString()} views
                                  </Typography>
                                  <Typography variant="caption" sx={{ color: '#666666' }}>
                                    Updated {article.lastUpdated}
                                  </Typography>
                                </Stack>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              
              {/* External System Results */}
              {searchResults.external.length > 0 && (
                <Box>
                  <Stack direction="row" alignItems="center" gap={1} mb={2}>
                    <IntegrationInstructionsIcon sx={{ color: '#2196F3', fontSize: 20 }} />
                    <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                      External Systems
                    </Typography>
                    <Chip label={searchResults.external.length} size="small" sx={{ bgcolor: '#2196F3', color: '#1a1a1a', fontWeight: 'bold' }} />
                  </Stack>
                  <Grid container spacing={2}>
                    {searchResults.external.map((result) => (
                      <Grid item xs={12} md={6} key={result.id}>
                        <Card
                          sx={{
                            border: '1px solid',
                            borderColor: '#333333',
                            backgroundColor: '#1a1a1a',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: getSourceColor(result.source),
                              transform: 'translateY(-2px)',
                              boxShadow: 4,
                            },
                          }}
                        >
                          <CardContent>
                            <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
                              <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" gap={1} mb={1}>
                                  <Box sx={{ color: getSourceColor(result.source) }}>
                                    {getSourceIcon(result.source)}
                                  </Box>
                                  <Chip
                                    label={result.source}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha(getSourceColor(result.source), 0.2),
                                      color: getSourceColor(result.source),
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                  <Chip
                                    label={result.type}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#999999', 0.2),
                                      color: '#999999',
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                  <Chip
                                    label={`${(result.relevance * 100).toFixed(0)}% match`}
                                    size="small"
                                    sx={{
                                      bgcolor: alpha('#4A7C59', 0.2),
                                      color: '#4A7C59',
                                      fontSize: '0.7rem',
                                      height: '20px',
                                    }}
                                  />
                                </Stack>
                                <Typography variant="h6" sx={{ color: '#E0E0E0', fontWeight: 'bold', mb: 1 }}>
                                  {result.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#999999', mb: 1.5 }}>
                                  {result.summary}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="caption" sx={{ color: '#666666' }}>
                                    {result.timestamp}
                                  </Typography>
                                  <Link
                                    href={result.url}
                                    sx={{
                                      color: getSourceColor(result.source),
                                      textDecoration: 'none',
                                      fontSize: '0.875rem',
                                      '&:hover': {
                                        textDecoration: 'underline',
                                      },
                                    }}
                                  >
                                    View in {result.source} →
                                  </Link>
                                </Stack>
                              </Box>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
              
              {searchResults.kb.length === 0 && searchResults.external.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" sx={{ color: '#999999', mb: 2 }}>
                    No results found for "{searchResults.query}"
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setInitialChatMessage(searchResults.query);
                      setChatOpen(true);
                    }}
                    sx={{
                      borderColor: '#D4AF37',
                      color: '#D4AF37',
                      '&:hover': {
                        borderColor: '#D4AF37',
                        bgcolor: alpha('#D4AF37', 0.1),
                      },
                    }}
                  >
                    Ask AI Assistant instead
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" sx={{ mb: 3, color: '#D4AF37', fontWeight: 'bold' }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3}>
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  elevation={0}
                  onClick={() => {
                    // Open chat with action-specific query
                    setInitialChatMessage(action.chatMessage || action.title);
                    setChatOpen(true);
                  }}
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    border: '1px solid',
                    borderColor: '#333333',
                    backgroundColor: '#242424',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#D4AF37',
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                      backgroundColor: alpha('#242424', 0.9),
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '8px',
                          backgroundColor: alpha('#D4AF37', 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid',
                          borderColor: alpha('#D4AF37', 0.2),
                        }}
                      >
                        <Icon sx={{ color: '#D4AF37', fontSize: '28px' }} />
                      </Box>
                      <Box>
                        <Typography variant="h3" sx={{ color: '#E0E0E0', fontWeight: 'bold', mb: 0.5 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#999999', mb: 1 }}>
                          {action.desc}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <AccessTimeIcon sx={{ fontSize: '14px', color: '#4A7C59' }} />
                          <Typography variant="caption" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                            {action.time}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Recommended Articles */}
      <Box>
        <Stack direction="row" alignItems="center" gap={1} mb={3}>
          <TrendingUpIcon sx={{ color: '#D4AF37' }} />
          <Typography variant="h2" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
            Recommended Articles
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {recentArticles.map((article, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card
                elevation={0}
                onClick={() => {
                  setInitialChatMessage(article.title);
                  setChatOpen(true);
                }}
                sx={{
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: '#333333',
                  backgroundColor: '#242424',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#D4AF37',
                    transform: 'translateX(4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={2}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ color: '#E0E0E0', fontWeight: 'bold', mb: 1 }}>
                        {article.title}
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="caption" sx={{ color: '#999999' }}>
                          {article.views.toLocaleString()} views
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Rating
                            value={article.rating}
                            readOnly
                            precision={0.1}
                            size="small"
                            sx={{
                              '& .MuiRating-iconFilled': {
                                color: '#D4AF37',
                              },
                              '& .MuiRating-iconEmpty': {
                                color: '#333333',
                              },
                            }}
                          />
                          <Typography variant="caption" sx={{ color: '#D4AF37', fontWeight: 'bold', ml: 0.5 }}>
                            {article.rating.toFixed(1)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* AI Chat Panel Sidebar */}
      <AIChatPanel
        isOpen={chatOpen}
        onClose={() => {
          // Only clear initial message, keep chat open
          setInitialChatMessage(null);
        }}
        initialMessage={initialChatMessage}
        onTicketCreated={(ticketData) => {
          setTicketCreated(ticketData);
        }}
      />

      {/* Ticket Created Notification */}
      <Snackbar
        open={ticketCreated !== null}
        autoHideDuration={6000}
        onClose={() => setTicketCreated(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setTicketCreated(null)}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#4A7C59', color: '#fff' }}
        >
          Ticket {ticketCreated?.id} created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SelfServicePortal;
