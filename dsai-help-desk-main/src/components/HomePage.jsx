import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h1" sx={{ mb: 2, color: '#0052CC' }}>
            PCTE AI Help Desk
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '18px', color: '#666', mb: 4 }}>
            Select your role to view the system
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Trainee Role */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate('/trainee')}
            >
              <CardContent>
                <Typography variant="h2" sx={{ mb: 2, color: '#0052CC' }}>
                  👤 Trainee
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                  Access the self-service portal to find answers, chat with the AI assistant, and resolve issues independently.
                </Typography>
                <Button variant="contained" fullWidth sx={{ backgroundColor: '#0052CC' }}>
                  View as Trainee
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Instructor Role */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate('/instructor')}
            >
              <CardContent>
                <Typography variant="h2" sx={{ mb: 2, color: '#0052CC' }}>
                  👨‍🏫 Instructor
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                  Monitor training impact, view analytics dashboards, and understand system architecture and escalation workflows.
                </Typography>
                <Button variant="contained" fullWidth sx={{ backgroundColor: '#0052CC' }}>
                  View as Instructor
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Help Desk Staff Role */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate('/staff')}
            >
              <CardContent>
                <Typography variant="h2" sx={{ mb: 2, color: '#0052CC' }}>
                  👨‍💼 Help Desk Staff
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                  Manage AI-enriched tickets, view analytics, monitor system integration status, and track model performance.
                </Typography>
                <Button variant="contained" fullWidth sx={{ backgroundColor: '#0052CC' }}>
                  View as Staff
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Admin Role */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                cursor: 'pointer',
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate('/admin')}
            >
              <CardContent>
                <Typography variant="h2" sx={{ mb: 2, color: '#0052CC' }}>
                  🔐 Administrator
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>
                  Full system access: configuration, security controls, compliance monitoring, model versioning, and integration management.
                </Typography>
                <Button variant="contained" fullWidth sx={{ backgroundColor: '#0052CC' }}>
                  View as Admin
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, p: 3, backgroundColor: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            This is a static demonstration of the PCTE AI Help Desk system. All data is representative and for evaluation purposes only.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
