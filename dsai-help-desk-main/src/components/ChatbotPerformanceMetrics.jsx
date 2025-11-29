import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TimerIcon from '@mui/icons-material/Timer';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Cards-only grid. No Paper/title so it can be embedded inside a container.
const ChatbotPerformanceMetrics = ({ chatbotPerformanceMetrics }) => {
  return (
    <Grid container spacing={3}>
      {/* Avg Response Time */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ backgroundColor: '#242424', border: '1px solid #333333', height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <TimerIcon sx={{ fontSize: '28px', color: '#D4AF37' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {chatbotPerformanceMetrics.responseTime.trend === 'down' ? (
                  <TrendingDownIcon sx={{ fontSize: '20px', color: '#4A7C59' }} />
                ) : (
                  <TrendingUpIcon sx={{ fontSize: '20px', color: '#FF9500' }} />
                )}
                <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                  {chatbotPerformanceMetrics.responseTime.change > 0 ? '+' : ''}{chatbotPerformanceMetrics.responseTime.change}%
                </Typography>
              </Box>
            </Box>
            <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
              {chatbotPerformanceMetrics.responseTime.average} {chatbotPerformanceMetrics.responseTime.unit}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              Avg Response Time
            </Typography>
            <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 1 }}>
              P95: {chatbotPerformanceMetrics.responseTime.p95}s | P99: {chatbotPerformanceMetrics.responseTime.p99}s
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* AI Accuracy */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ backgroundColor: '#242424', border: '1px solid #333333', height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <PsychologyIcon sx={{ fontSize: '28px', color: '#D4AF37' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon sx={{ fontSize: '20px', color: '#4A7C59' }} />
                <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                  +{chatbotPerformanceMetrics.accuracy.change}%
                </Typography>
              </Box>
            </Box>
            <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
              {chatbotPerformanceMetrics.accuracy.value}{chatbotPerformanceMetrics.accuracy.unit}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              AI Accuracy
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* User Satisfaction */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ backgroundColor: '#242424', border: '1px solid #333333', height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <ThumbUpIcon sx={{ fontSize: '28px', color: '#D4AF37' }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TrendingUpIcon sx={{ fontSize: '20px', color: '#4A7C59' }} />
                <Typography variant="body2" sx={{ color: '#4A7C59', fontWeight: 'bold' }}>
                  +{chatbotPerformanceMetrics.userSatisfaction.change}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
              {chatbotPerformanceMetrics.userSatisfaction.value}{chatbotPerformanceMetrics.userSatisfaction.unit}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              User Satisfaction
            </Typography>
            <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 1 }}>
              {chatbotPerformanceMetrics.userSatisfaction.totalRatings.toLocaleString()} ratings
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Active Conversations */}
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card sx={{ backgroundColor: '#242424', border: '1px solid #333333', height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <VisibilityIcon sx={{ fontSize: '28px', color: '#D4AF37' }} />
              <Chip
                label="Active"
                size="small"
                sx={{
                  backgroundColor: '#4A7C59',
                  color: '#ffffff',
                  fontWeight: 'bold',
                }}
              />
            </Box>
            <Typography variant="h4" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
              {chatbotPerformanceMetrics.activeConversations.current}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999999' }}>
              Active Conversations
            </Typography>
            <Typography variant="caption" sx={{ color: '#666666', display: 'block', mt: 1 }}>
              Peak: {chatbotPerformanceMetrics.activeConversations.peak} | Capacity: {chatbotPerformanceMetrics.activeConversations.capacity}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChatbotPerformanceMetrics;
