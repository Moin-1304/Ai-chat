import React from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SecurityIcon from '@mui/icons-material/Security';
import GroupsIcon from '@mui/icons-material/Groups';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (user) => {
    onLogin(user);
    // Navigate to role-specific dashboard
    navigate(`/${user.id}`);
  };

  const handleTitleClick = () => {
    // Hidden easter egg: open demo script navigator in new tab
    window.open('/demo-script', '_blank');
  };

  const users = [
    {
      id: 'operator',
      name: 'Charlie Operator',
      username: 'charlie.operator',
      role: 'Cyber Operator',
      description: 'Cyber specialist maintaining and advancing operational readiness. Access self-service portal and AI chatbot to resolve issues, find guidance, and expand expertise through training.',
      icon: SecurityIcon,
    },
    {
      id: 'manager',
      name: 'Morgan Manager',
      username: 'morgan.manager',
      role: 'Training Manager',
      description: 'Overseeing training exercises. Monitor training impact, view analytics, and understand escalation workflows.',
      icon: GroupsIcon,
    },
    {
      id: 'analyst',
      name: 'Alex Analyst',
      username: 'alex.analyst',
      role: 'Help Desk Analyst',
      description: 'Support personnel managing Help Desk operations. Manage AI-enriched tickets, monitor integrations, and track model performance.',
      icon: SupportAgentIcon,
    },
    {
      id: 'admin',
      name: 'Adam Admin',
      username: 'adam.admin',
      role: 'Administrator',
      description: 'Setting up training environments. Full system access: configuration, security, compliance, and model management.',
      icon: AdminPanelSettingsIcon,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a' }}>
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h1" 
            onClick={handleTitleClick}
            sx={{ 
              mb: 2, 
              color: '#D4AF37',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                opacity: 0.8,
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
              }
            }}
          >
            PCTE AI Help Desk
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '18px', color: '#999999', mb: 4 }}>
            Select a user to login and explore the system
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid size={{ xs: 12, md: 6 }} key={user.id}>
              <Card
                sx={{
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                  },
                }}
                onClick={() => handleLogin(user)}
              >
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {React.createElement(user.icon, { sx: { fontSize: '28px', color: '#D4AF37' } })}
                    <Typography variant="h2" sx={{ color: '#D4AF37' }}>
                      {user.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#999999' }}>
                    @{user.username}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: '#E0E0E0', flex: 1 }}>
                    {user.description}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 'auto' }}
                  >
                    Login as {user.role}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, p: 3, backgroundColor: '#242424', borderRadius: '8px', textAlign: 'center', border: '1px solid #333333' }}>
          <Typography variant="body2" sx={{ color: '#999999' }}>
            This is a static demonstration of the PCTE AI Help Desk system. All data is representative and for evaluation purposes only.
          </Typography>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#121212', borderTop: '1px solid #333333', py: 2, mt: 'auto' }}>
        <Container maxWidth="lg">
          <Typography variant="caption" sx={{ color: '#999999' }}>
            © 2025 BBInfotech. PCTE AI Help Desk Demo.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
