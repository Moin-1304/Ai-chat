// SourceAttribution component - displays KB source information
import React from 'react';
import { Box, Typography, Chip, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const AttributionBox = styled(Box)(({ theme }) => ({
  marginTop: '8px',
  padding: '8px',
  backgroundColor: '#1a1a1a',
  borderRadius: '8px',
  border: '1px solid #333333',
}));

const SourceAttribution = ({ source, sourceName, confidence, articleId }) => {
  if (!source && !sourceName) return null;

  return (
    <AttributionBox>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        {source && (
          <Chip
            label={source}
            size="small"
            sx={{
              backgroundColor: '#4A7C59',
              color: '#fff',
              fontSize: '11px',
              height: '22px',
            }}
          />
        )}
        {sourceName && (
          <Typography variant="caption" sx={{ color: '#999999', fontSize: '11px' }}>
            From {sourceName}
          </Typography>
        )}
        {confidence && (
          <Chip
            label={`${Math.round(confidence * 100)}% confidence`}
            size="small"
            sx={{
              backgroundColor: '#FF9500',
              color: '#1a1a1a',
              fontSize: '11px',
              height: '22px',
            }}
          />
        )}
        {articleId && (
          <Link
            href={`#kb-${articleId}`}
            sx={{
              color: '#D4AF37',
              fontSize: '11px',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            View full article →
          </Link>
        )}
      </Box>
    </AttributionBox>
  );
};

export default SourceAttribution;

