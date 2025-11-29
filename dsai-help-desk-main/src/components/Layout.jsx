import React from 'react';
import { AppBar, Toolbar, Box, Container, Typography, Button, Divider } from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SecurityIcon from '@mui/icons-material/Security';
import GroupsIcon from '@mui/icons-material/Groups';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// Map roles to icons
const getRoleIcon = (role) => {
  switch (role) {
    case 'Cyber Operator':
      return SecurityIcon;
    case 'Training Manager':
      return GroupsIcon;
    case 'Help Desk Analyst':
      return SupportAgentIcon;
    case 'Administrator':
      return AdminPanelSettingsIcon;
    default:
      return null;
  }
};

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  console.log('Layout render - user:', user);
  if (user) {
    console.log('user.icon type:', typeof user.icon);
    console.log('user.icon:', user.icon);
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Helper function to check if a route is active
  const isActiveRoute = (path) => {
    if (path === '/kb') {
      // Handle both /kb and /admin routes for KB page
      return location.pathname === '/kb' || location.pathname === '/admin';
    }
    return location.pathname === path;
  };

  // Navigation button style with active state
  const getNavButtonStyle = (path) => ({
    textTransform: 'none',
    fontSize: '14px',
    position: 'relative',
    color: isActiveRoute(path) ? '#D4AF37' : 'rgba(255, 255, 255, 0.9)',
    fontWeight: isActiveRoute(path) ? 'bold' : 'normal',
    backgroundColor: isActiveRoute(path) ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
    borderRadius: '4px 4px 0 0',
    px: 1.5,
    py: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: isActiveRoute(path) ? 'translateX(-50%)' : 'translateX(-50%) scaleX(0)',
      width: isActiveRoute(path) ? '85%' : '0%',
      height: '3px',
      backgroundColor: '#D4AF37',
      borderRadius: '2px 2px 0 0',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isActiveRoute(path) ? '0 0 8px rgba(212, 175, 55, 0.6)' : 'none',
    },
    '&:hover': {
      backgroundColor: isActiveRoute(path) ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.1)',
      color: isActiveRoute(path) ? '#D4AF37' : '#D4AF37',
      '&::after': {
        width: isActiveRoute(path) ? '85%' : '50%',
        transform: 'translateX(-50%)',
      },
    },
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  });

  // Don't show layout on login page
  if (location.pathname === '/') {
    return children;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#121212', borderBottom: '1px solid #333333', width: '100%' }}>
        <Toolbar sx={{ py: 1, minHeight: '64px !important', width: '100%', px: 3 }}>
          <Button
            component={RouterLink}
            to="/"
            sx={{ color: 'white', textDecoration: 'none', mr: 2 }}
          >
            <Typography variant="h2" sx={{ color: 'white' }}>
              PCTE AI Help Desk
            </Typography>
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {/* Navigation - role-based */}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              {/* Portal - for ALL users (Screen 1) */}
              <Button
                component={RouterLink}
                to="/operator"
                color="inherit"
                sx={getNavButtonStyle('/operator')}
              >
                Portal
              </Button>
              {/* Tickets - for Help Desk Analyst and Administrator */}
              {(user.role === 'Help Desk Analyst' || user.role === 'Administrator') && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/tickets"
                    color="inherit"
                    sx={getNavButtonStyle('/tickets')}
                  >
                    Tickets
                  </Button>
                </>
              )}
              {/* Analytics - for Training Manager, Help Desk Analyst, and Administrator */}
              {(user.role === 'Training Manager' || user.role === 'Help Desk Analyst' || user.role === 'Administrator') && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/analytics"
                    color="inherit"
                    sx={getNavButtonStyle('/analytics')}
                  >
                    Analytics
                  </Button>
                </>
              )}
              {/* Escalation - for Training Manager, Help Desk Analyst, and Administrator */}
              {(user.role === 'Training Manager' || user.role === 'Help Desk Analyst' || user.role === 'Administrator') && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/escalation"
                    color="inherit"
                    sx={getNavButtonStyle('/escalation')}
                  >
                    Escalation
                  </Button>
                </>
              )}
              {/* Integration - for Help Desk Analyst and Administrator */}
              {(user.role === 'Help Desk Analyst' || user.role === 'Administrator') && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/integration"
                    color="inherit"
                    sx={getNavButtonStyle('/integration')}
                  >
                    Integration
                  </Button>
                </>
              )}
              {/* Model Versioning - for Help Desk Analyst and Administrator */}
              {(user.role === 'Help Desk Analyst' || user.role === 'Administrator') && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/model-versioning"
                    color="inherit"
                    sx={getNavButtonStyle('/model-versioning')}
                  >
                    Model Versioning
                  </Button>
                </>
              )}
              {/* Security - for Administrator only */}
              {user.role === 'Administrator' && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/security"
                    color="inherit"
                    sx={getNavButtonStyle('/security')}
                  >
                    Security
                  </Button>
                </>
              )}
              {/* KB - for Administrator only */}
              {user.role === 'Administrator' && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ mx: 0.5, borderColor: 'rgba(255, 255, 255, 0.2)', height: '24px', alignSelf: 'center' }} />
                  <Button
                    component={RouterLink}
                    to="/kb"
                    color="inherit"
                    sx={getNavButtonStyle('/kb')}
                  >
                    KB
                  </Button>
                </>
              )}
            </Box>
          )}
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
              {getRoleIcon(user.role) && <Box component={getRoleIcon(user.role)} sx={{ fontSize: '20px', color: 'white' }} />}
              <Box>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {user.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, width: '100%', overflow: 'auto' }}>
        {children}
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#121212', borderTop: '1px solid #333333', py: 2, mt: 4, width: '100%', flexShrink: 0 }}>
        <Box sx={{ px: 3 }}>
          <Typography variant="caption" sx={{ color: '#999999' }}>
            © 2025 BBInfotech. PCTE AI Help Desk Demo.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
