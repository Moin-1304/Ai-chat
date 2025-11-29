import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloudIcon from '@mui/icons-material/Cloud';
import ApiIcon from '@mui/icons-material/Api';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import StorageIcon from '@mui/icons-material/Storage';
import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SpeedIcon from '@mui/icons-material/Speed';

const ArchitectureDiagram = () => {
  const layers = [
    {
      name: 'Client Layer',
      icon: CloudIcon,
      color: '#D4AF37',
      components: [
        { name: 'Web Browser', health: 100, latency: 45, icon: CloudIcon },
        { name: 'Mobile App', health: 98, latency: 52, icon: CloudIcon },
        { name: 'CLI Tools', health: 100, latency: 38, icon: CloudIcon },
      ],
    },
    {
      name: 'API Gateway',
      icon: ApiIcon,
      color: '#4A7C59',
      components: [
        { name: 'REST API', health: 99, latency: 12, icon: ApiIcon },
        { name: 'WebSocket', health: 97, latency: 8, icon: ApiIcon },
        { name: 'gRPC', health: 100, latency: 5, icon: ApiIcon },
      ],
    },
    {
      name: 'Core Services',
      icon: IntegrationInstructionsIcon,
      color: '#FF9500',
      components: [
        { name: 'Chatbot Service', health: 96, latency: 245, icon: IntegrationInstructionsIcon },
        { name: 'ML Pipeline', health: 94, latency: 320, icon: IntegrationInstructionsIcon },
        { name: 'Ticket Service', health: 99, latency: 85, icon: IntegrationInstructionsIcon },
        { name: 'Analytics Engine', health: 98, latency: 156, icon: IntegrationInstructionsIcon },
      ],
    },
    {
      name: 'Data Layer',
      icon: StorageIcon,
      color: '#666666',
      components: [
        { name: 'PostgreSQL', health: 100, latency: 18, icon: StorageIcon },
        { name: 'Redis Cache', health: 99, latency: 3, icon: StorageIcon },
        { name: 'Vector DB', health: 97, latency: 42, icon: StorageIcon },
      ],
    },
    {
      name: 'External Systems',
      icon: LinkIcon,
      color: '#4A7C59',
      components: [
        { name: 'Jira', health: 95, latency: 520, icon: LinkIcon },
        { name: 'Confluence', health: 98, latency: 380, icon: LinkIcon },
        { name: 'Mattermost', health: 99, latency: 210, icon: LinkIcon },
        { name: 'Red Hat SSO', health: 100, latency: 95, icon: LinkIcon },
      ],
    },
  ];

  const getHealthColor = (health) => {
    if (health >= 98) return '#4A7C59'; // Green
    if (health >= 95) return '#FF9500'; // Orange
    return '#D32F2F'; // Red
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" sx={{ mb: 1, color: '#D4AF37' }}>
          System Architecture
        </Typography>
        <Typography variant="body1" sx={{ color: '#999999' }}>
          PCTE AI Help Desk technical architecture and data flow
        </Typography>
      </Box>

      {/* Architecture Layers */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 6 }}>
        {layers.map((layer, idx) => (
          <Box key={idx} sx={{ width: '100%' }}>
            {/* Layer Card */}
            <Paper
              sx={{
                p: 3,
                backgroundColor: '#242424',
                border: `2px solid ${layer.color}`,
                borderRadius: '8px',
              }}
            >
              {/* Layer Name with Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box component={layer.icon} sx={{ fontSize: '20px', color: layer.color }} />
                <Typography
                  variant="h3"
                  sx={{
                    color: layer.color,
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  {layer.name}
                </Typography>
              </Box>

              {/* Components Grid */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 2,
                }}
              >
                {layer.components.map((component, compIdx) => {
                  const ComponentIcon = component.icon;
                  const healthColor = getHealthColor(component.health);
                  return (
                    <Box
                      key={compIdx}
                      sx={{
                        width: '160px',
                        backgroundColor: '#333333',
                        border: `2px solid ${healthColor}`,
                        borderRadius: '6px',
                        p: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      {/* Icon and Name */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Box component={ComponentIcon} sx={{ fontSize: '16px', color: healthColor }} />
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#E0E0E0',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            flex: 1,
                          }}
                        >
                          {component.name}
                        </Typography>
                      </Box>

                      {/* Health Bar */}
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                          <FavoriteBorderIcon sx={{ fontSize: '12px', color: healthColor }} />
                          <Typography variant="caption" sx={{ color: '#999999', fontSize: '10px' }}>
                            {component.health}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={component.health}
                          sx={{
                            height: '4px',
                            backgroundColor: '#555555',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: healthColor,
                            },
                          }}
                        />
                      </Box>

                      {/* Latency */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <SpeedIcon sx={{ fontSize: '12px', color: '#D4AF37' }} />
                        <Typography variant="caption" sx={{ color: '#999999', fontSize: '10px' }}>
                          {component.latency}ms
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            {/* Arrow between layers */}
            {idx < layers.length - 1 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  py: 1,
                  color: '#D4AF37',
                }}
              >
                <KeyboardArrowDownIcon sx={{ fontSize: '32px' }} />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* Data Flow Description */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h2" sx={{ mb: 3, color: '#D4AF37' }}>
          Data Flow Example
        </Typography>
        <Paper sx={{ p: 3, backgroundColor: '#242424', border: '1px solid #333333' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#333333',
                borderLeft: `4px solid #D4AF37`,
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                User Query
              </Typography>
            </Box>
            <Typography sx={{ color: '#D4AF37', fontWeight: 'bold' }}>→</Typography>
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#333333',
                borderLeft: `4px solid #FF9500`,
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                Chatbot (NLP)
              </Typography>
            </Box>
            <Typography sx={{ color: '#D4AF37', fontWeight: 'bold' }}>→</Typography>
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#333333',
                borderLeft: `4px solid #666666`,
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                Vector DB
              </Typography>
            </Box>
            <Typography sx={{ color: '#D4AF37', fontWeight: 'bold' }}>→</Typography>
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#333333',
                borderLeft: `4px solid #FF9500`,
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                ML Pipeline
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#333333',
                borderLeft: `4px solid #FF9500`,
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                Ticket Service
              </Typography>
            </Box>
            <Typography sx={{ color: '#D4AF37', fontWeight: 'bold' }}>→</Typography>
            <Box
              sx={{
                px: 2,
                py: 1,
                backgroundColor: '#333333',
                borderLeft: `4px solid #4A7C59`,
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" sx={{ color: '#E0E0E0', fontWeight: 'bold' }}>
                Response
              </Typography>
            </Box>
          </Box>
          <Typography variant="caption" sx={{ color: '#999999', mt: 2, display: 'block' }}>
            End-to-end latency: ~900ms | Throughput: 1,000 req/s | Availability: 99.8%
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ArchitectureDiagram;
