import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Tooltip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { styled } from '@mui/material/styles';
import demoScriptData from '../data/demoScriptParts.json';

// Demo script parts - loaded from single source of truth (JSON)
const demoScriptParts = demoScriptData.demoScriptParts.map(part => ({
  ...part,
  script: `"${part.script}"`,
}));


const DemoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#0a0e27',
  color: '#E0E0E0',
  overflow: 'hidden',
}));

const Header = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  borderBottom: '1px solid #333333',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#121212',
  width: '100%',
  flexShrink: 0,
}));

const ContentArea = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: '16px',
  padding: '24px',
  overflowY: 'auto',
  width: '100%',
  minWidth: 0,
}));

const SidebarArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  overflow: 'auto',
  minWidth: 0,
}));

const SummaryCard = styled(Paper)(({ theme, isActive }) => ({
  backgroundColor: isActive ? '#1a1a2e' : '#0f1419',
  border: isActive ? '2px solid #D4AF37' : '1px solid #333333',
  borderRadius: '8px',
  padding: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  flexShrink: 0,
  '&:hover': {
    borderColor: '#D4AF37',
    backgroundColor: '#1a1a2e',
  },
}));

const MainContentArea = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  minWidth: 0,
  width: '100%',
}));

const PartColumn = styled(Paper)(({ theme, isActive, isClickable }) => ({
  backgroundColor: isActive ? '#1a1a2e' : '#0f1419',
  border: isActive ? '2px solid #D4AF37' : '1px solid #333333',
  borderRadius: '8px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  opacity: isActive ? 1 : 0.7,
  cursor: isClickable ? 'pointer' : 'default',
  transition: 'all 0.2s ease',
  '&:hover': isClickable ? {
    borderColor: '#D4AF37',
    backgroundColor: '#1a1a2e',
  } : {},
}));

const PartLabel = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#999999',
  fontWeight: 'bold',
}));

const PartNumber = styled(Typography)(({ theme }) => ({
  fontSize: '36px',
  fontWeight: 'bold',
  color: '#D4AF37',
  lineHeight: '1',
}));

const PartHeaderRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  justifyContent: 'space-between',
}));

const KeyMessageBox = styled(Card)(({ theme }) => ({
  backgroundColor: '#FF9500',
  color: '#1a1a1a',
  '& .MuiCardContent-root': {
    padding: '12px',
  },
}));

const ScriptBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a1a2e',
  border: '1px solid #333333',
  borderRadius: '4px',
  padding: '12px',
  fontStyle: 'italic',
  lineHeight: '1.6',
  fontSize: '13px',
}));

const ActionBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#4A7C59',
  borderRadius: '4px',
  padding: '12px',
  fontSize: '12px',
  lineHeight: '1.5',
}));

const CopyableTextBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2a3f2f',
  border: '2px solid #4A7C59',
  borderRadius: '4px',
  padding: '12px',
  fontSize: '13px',
  lineHeight: '1.6',
  fontFamily: 'monospace',
  color: '#4AFF4A',
  userSelect: 'text',
  position: 'relative',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
}));

const CopyButtonContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '4px',
  right: '4px',
  display: 'flex',
  gap: '4px',
}));

const NavigationBar = styled(Box)(({ theme }) => ({
  padding: '16px 24px',
  borderTop: '1px solid #333333',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#121212',
  width: '100%',
  flexShrink: 0,
}));

const DemoScriptNavigator = ({ onClose }) => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [copiedText, setCopiedText] = useState(null);
  const [startTime] = useState(new Date()); // Demo start time

  // Helper to format seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate cumulative time up to and including current part
  // DYNAMIC: Always reads from current demoScriptParts array
  const calculateCumulativeTime = (upToIndex) => {
    let totalSeconds = 0;
    for (let i = 0; i <= upToIndex; i++) {
      totalSeconds += demoScriptParts[i].duration || 0;
    }
    return totalSeconds;
  };

  // Calculate start time for current part
  const getPartStartTime = (partIndex) => {
    if (partIndex === 0) return 0;
    return calculateCumulativeTime(partIndex - 1);
  };

  // Calculate end time for current part
  const getPartEndTime = (partIndex) => {
    return calculateCumulativeTime(partIndex);
  };

  // Calculate total demo time
  const getTotalDemoTime = () => {
    return calculateCumulativeTime(demoScriptParts.length - 1);
  };

  const getPreviousPart = () => {
    return currentPartIndex > 0 ? demoScriptParts[currentPartIndex - 1] : null;
  };

  const getCurrentPart = () => {
    return demoScriptParts[currentPartIndex];
  };

  const getNextPart = () => {
    return currentPartIndex < demoScriptParts.length - 1 ? demoScriptParts[currentPartIndex + 1] : null;
  };

  const handlePrevious = () => {
    if (currentPartIndex > 0) {
      setCurrentPartIndex(currentPartIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPartIndex < demoScriptParts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1);
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    });
  };

  const getCopyableTexts = (part) => {
    // Get copyable texts from the part data
    // If copyableTexts array exists in JSON, use it
    // Otherwise return empty array (no copy boxes)
    return part.copyableTexts || [];
  };

  const renderScriptWithKeywords = (script, keywords) => {
    // If no keywords, return script as-is
    if (!keywords || keywords.length === 0) {
      return script;
    }

    // Create a regex pattern that matches any of the keywords (case-insensitive)
    // Sort by length descending to match longer phrases first
    const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length);
    const pattern = sortedKeywords
      .map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex chars
      .join('|');
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = script.split(regex);

    return parts.map((part, idx) => {
      // Check if this part is a keyword (case-insensitive comparison)
      const isKeyword = keywords.some(kw => kw.toLowerCase() === part.toLowerCase());
      if (isKeyword) {
        return (
          <Box key={idx} component="span" sx={{ fontWeight: 'bold', color: '#4AFF4A' }}>
            {part}
          </Box>
        );
      }
      return part;
    });
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPartIndex]);

  const previousPart = getPreviousPart();
  const currentPart = getCurrentPart();
  const nextPart = getNextPart();

  return (
    <DemoContainer>
      <Header>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
          Demo Script Navigator (DSN)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ color: '#999999' }}>
            Part {currentPartIndex + 1} of {demoScriptParts.length}
          </Typography>
          <Typography variant="body2" sx={{ color: '#4AFF4A', fontWeight: 'bold' }}>
            Total: {formatTime(getTotalDemoTime())}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon sx={{ color: '#999999' }} />
          </IconButton>
        </Box>
      </Header>

      <ContentArea>
        {/* Sidebar - Last, Now, Next Summaries */}
        <SidebarArea>
          {/* Helper function to render summary card content */}
          {[
            { part: previousPart, label: 'Last', isActive: false, onClick: handlePrevious, emptyText: 'Start' },
            { part: currentPart, label: 'Now', isActive: true, onClick: null, emptyText: null },
            { part: nextPart, label: 'Next', isActive: false, onClick: handleNext, emptyText: 'End' },
          ].map((item, idx) => (
            <SummaryCard
              key={idx}
              isActive={item.isActive}
              onClick={item.onClick}
              sx={{ cursor: item.onClick ? 'pointer' : 'default' }}
            >
              {item.part ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <PartLabel>{item.label}</PartLabel>
                  <Chip
                    label={item.part.partTitle}
                    size="small"
                    sx={{
                      backgroundColor: item.isActive ? '#D4AF37' : '#4A7C59',
                      color: item.isActive ? '#1a1a1a' : '#E0E0E0',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      height: '22px',
                      '& .MuiChip-label': { padding: '0 8px' },
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: item.isActive ? '#D4AF37' : '#999999', fontSize: '10px', fontWeight: 'bold' }}>
                      Part {item.part.id}
                    </Typography>
                    {item.isActive && (
                      <Typography variant="caption" sx={{ color: '#4AFF4A', fontSize: '9px' }}>
                        {formatTime(getPartStartTime(currentPartIndex))} → {formatTime(item.part.duration || 0)}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="caption" sx={{ color: '#E0E0E0', fontSize: '11px', fontWeight: 'bold', lineHeight: 1.3 }}>
                    {item.part.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999999', fontSize: '10px', lineHeight: 1.2 }}>
                    {item.part.keyMessage}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="caption" sx={{ color: '#666666' }}>{item.emptyText}</Typography>
              )}
            </SummaryCard>
          ))}
        </SidebarArea>

        {/* Main Content Area - Full Current Part Details */}
        <MainContentArea>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <PartHeaderRow>
            <PartLabel>Now</PartLabel>
            <Chip
              label={currentPart.partTitle}
              size="small"
              sx={{
                backgroundColor: '#D4AF37',
                color: '#1a1a1a',
                fontWeight: 'bold',
                fontSize: '12px',
                height: '28px',
                '& .MuiChip-label': {
                  padding: '0 10px',
                },
              }}
            />
            <PartNumber>{currentPart.id}</PartNumber>
          </PartHeaderRow>
          <Typography variant="caption" sx={{ color: '#4AFF4A', fontWeight: 'bold', fontSize: '11px', mt: 0.5 }}>
            {formatTime(getPartStartTime(currentPartIndex))} → {formatTime(currentPart.duration || 0)} → {formatTime(getPartEndTime(currentPartIndex))}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#D4AF37' }}>
            {currentPart.title}
          </Typography>

          <KeyMessageBox>
            <CardContent sx={{ padding: '8px' }}>
              <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                {currentPart.keyMessage}
              </Typography>
            </CardContent>
          </KeyMessageBox>

          <Box>
            <Typography variant="caption" sx={{ color: '#999999', textTransform: 'uppercase', fontSize: '10px' }}>
              Speaker Notes
            </Typography>
            <ScriptBox sx={{ lineHeight: '1.8' }}>
              {currentPart.scriptBullets && currentPart.scriptBullets.map((bullet, idx) => (
                <Box key={idx} sx={{ mb: 1, display: 'flex', gap: 1 }}>
                  <Typography sx={{ color: '#999999', flexShrink: 0 }}>•</Typography>
                  <Typography sx={{ color: '#E0E0E0', fontSize: '14px' }}>
                    {renderScriptWithKeywords(bullet, currentPart.keywords)}
                  </Typography>
                </Box>
              ))}
              {currentPart.screenInteraction && (
                <Box sx={{ mt: 2, pt: 1, borderTop: '1px solid #333333' }}>
                  <Typography sx={{ color: '#4AFF4A', fontSize: '13px', fontStyle: 'italic' }}>
                    &gt; {currentPart.screenInteraction}
                  </Typography>
                </Box>
              )}
            </ScriptBox>
          </Box>

          <Box>
            <Typography variant="caption" sx={{ color: '#999999', textTransform: 'uppercase', fontSize: '10px' }}>
              Next Action
            </Typography>
            <ActionBox>
              <strong>Do:</strong> {currentPart.nextAction}
              <br />
              <strong>Click:</strong> {currentPart.clickTarget}
            </ActionBox>

            {getCopyableTexts(currentPart).length > 0 && (
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ color: '#999999', textTransform: 'uppercase', fontSize: '10px' }}>
                  Copy & Paste Text{getCopyableTexts(currentPart).length > 1 ? 's' : ''}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {getCopyableTexts(currentPart).map((text, idx) => (
                    <CopyableTextBox key={idx}>
                      {text}
                      <CopyButtonContainer>
                        <Tooltip title={copiedText === text ? 'Copied!' : 'Copy to clipboard'}>
                          <IconButton
                            size="small"
                            onClick={() => handleCopyText(text)}
                            sx={{
                              backgroundColor: copiedText === text ? '#4AFF4A' : '#4A7C59',
                              color: copiedText === text ? '#2a3f2f' : '#4AFF4A',
                              '&:hover': {
                                backgroundColor: '#4AFF4A',
                                color: '#2a3f2f',
                              },
                            }}
                          >
                            <ContentCopyIcon sx={{ fontSize: '16px' }} />
                          </IconButton>
                        </Tooltip>
                      </CopyButtonContainer>
                    </CopyableTextBox>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
          </Box>
        </MainContentArea>
      </ContentArea>

      <NavigationBar>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentPartIndex === 0}
          sx={{
            color: currentPartIndex === 0 ? '#666666' : '#D4AF37',
            '&:disabled': { color: '#666666' },
          }}
        >
          Last
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {demoScriptParts.map((part, idx) => (
            <Chip
              key={part.id}
              label={part.id}
              onClick={() => setCurrentPartIndex(idx)}
              variant={idx === currentPartIndex ? 'filled' : 'outlined'}
              sx={{
                backgroundColor: idx === currentPartIndex ? '#D4AF37' : 'transparent',
                color: idx === currentPartIndex ? '#1a1a1a' : '#D4AF37',
                borderColor: '#D4AF37',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            />
          ))}
        </Box>

        <Button
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          disabled={currentPartIndex === demoScriptParts.length - 1}
          sx={{
            color: currentPartIndex === demoScriptParts.length - 1 ? '#666666' : '#D4AF37',
            '&:disabled': { color: '#666666' },
          }}
        >
          Next
        </Button>
      </NavigationBar>
    </DemoContainer>
  );
};

export default DemoScriptNavigator;
