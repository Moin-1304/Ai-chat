// ChatMessage component - displays individual message bubbles
import React from 'react';
import { Box, Typography, Chip, Avatar, Link, Alert } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import { styled, keyframes } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';

const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

const BlinkingCursor = styled('span')({
  animation: `${blink} 1s infinite`,
  marginLeft: '2px',
});

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  display: 'flex',
  gap: '8px',
  marginBottom: '16px',
  flexDirection: isUser ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
}));

const BubbleContent = styled(Box)(({ theme, isUser, isAgent, isGuardrail }) => ({
  maxWidth: '75%',
  padding: '12px 16px',
  borderRadius: '16px',
  backgroundColor: isGuardrail ? '#2a1a1a' : isAgent ? '#FF9500' : isUser ? '#D4AF37' : '#333333',
  border: isGuardrail ? '2px solid #D32F2F' : 'none',
  color: isAgent || isUser ? '#1a1a1a' : '#E0E0E0',
  wordWrap: 'break-word',
  '& pre': {
    whiteSpace: 'pre-wrap',
    margin: 0,
  },
  '& a': {
    color: isAgent || isUser ? '#0052CC' : '#4A7C59',
    textDecoration: 'underline',
    '&:hover': {
      color: isAgent || isUser ? '#003D99' : '#6BA876',
    },
  },
  '& strong': {
    fontWeight: 'bold',
  },
  '& ul, & ol': {
    margin: '8px 0',
    paddingLeft: '20px',
  },
  '& li': {
    margin: '4px 0',
  },
}));

const SourceChip = styled(Chip)(({ theme }) => ({
  marginTop: '8px',
  fontSize: '10px',
  height: '20px',
  backgroundColor: '#4A7C59',
  color: '#fff',
}));

const ConfidenceChip = styled(Chip)(({ theme }) => ({
  marginTop: '4px',
  fontSize: '10px',
  height: '20px',
  backgroundColor: '#FF9500',
  color: '#1a1a1a',
}));

const GuardrailChip = styled(Chip)(({ theme }) => ({
  marginTop: '8px',
  fontSize: '10px',
  height: 'auto',
  maxWidth: '100%',
  backgroundColor: '#D32F2F',
  color: '#fff',
  fontWeight: 'bold',
  alignItems: 'flex-start',
  '& .MuiChip-label': {
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'unset',
    display: 'block',
    paddingTop: '6px',
    paddingBottom: '6px',
    lineHeight: 1.2,
  },
  '& .MuiChip-icon': {
    marginTop: '6px',
  },
}));

const SentimentIndicator = styled(Box)(({ theme, sentiment }) => ({
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  marginLeft: '8px',
  backgroundColor: 
    sentiment === 'frustrated' ? '#DC3545' :
    sentiment === 'satisfied' ? '#28A745' :
    '#6C757D',
}));

const ChatMessage = ({ message, isUser = false, source, confidence, sentiment, type, agentName, agentTier, isTyping = false, guardrail }) => {
  const [displayText, setDisplayText] = React.useState(isTyping ? '' : message);
  
  React.useEffect(() => {
    if (isTyping && message) {
      // Typing effect - reveal text character by character
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < message.length) {
          setDisplayText(message.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setDisplayText(message); // Ensure full message is set when done
        }
      }, 20); // 20ms per character
      
      return () => clearInterval(interval);
    } else {
      setDisplayText(message);
    }
  }, [isTyping, message]);

  return (
    <MessageBubble isUser={isUser}>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          backgroundColor: agentName ? '#FF9500' : isUser ? '#D4AF37' : '#4A7C59',
          color: '#fff',
        }}
      >
        {isUser ? <PersonIcon fontSize="small" /> : agentName ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <BubbleContent isUser={isUser} isAgent={!!agentName} isGuardrail={type === 'guardrail'}>
          {agentName && (
            <Typography variant="caption" sx={{ color: '#1a1a1a', fontWeight: 'bold', mb: 0.5, display: 'block' }}>
              {agentName} ({agentTier})
            </Typography>
          )}
          {type === 'guardrail' && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <SecurityIcon sx={{ fontSize: 16, color: '#D32F2F' }} />
              <Typography variant="caption" sx={{ color: '#D32F2F', fontWeight: 'bold', fontSize: '11px' }}>
                Guardrail Protection Active
              </Typography>
            </Box>
          )}
          <Typography variant="body2" component="div" sx={{ lineHeight: 1.5 }}>
            {isTyping ? (
              <span style={{ whiteSpace: 'pre-wrap' }}>
                {displayText}
                <BlinkingCursor>|</BlinkingCursor>
              </span>
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <Typography component="p" variant="body2" sx={{ mb: 1, lineHeight: 1.5 }}>{children}</Typography>,
                  strong: ({ children }) => <strong>{children}</strong>,
                  ul: ({ children }) => <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>{children}</ul>,
                  ol: ({ children }) => <ol style={{ margin: '8px 0', paddingLeft: '20px' }}>{children}</ol>,
                  li: ({ children }) => <li style={{ margin: '4px 0' }}>{children}</li>,
                  a: ({ href, children }) => (
                    <Link href={href} target="_blank" rel="noopener noreferrer" sx={{ color: isUser || agentName ? '#0052CC' : '#4A7C59', textDecoration: 'underline' }}>
                      {children}
                    </Link>
                  ),
                }}
              >
                {displayText}
              </ReactMarkdown>
            )}
          </Typography>
          
          {/* Guardrail indicator */}
          {type === 'guardrail' && guardrail && (
            <Box sx={{ mt: 1 }}>
              <GuardrailChip
                label={`Security Guardrail: ${guardrail.category.replace('_', ' ').toUpperCase()}`}
                size="small"
                icon={<SecurityIcon sx={{ fontSize: 12, color: '#fff' }} />}
              />
            </Box>
          )}
          
          {/* Source attribution for AI messages */}
          {!isUser && source && type !== 'guardrail' && (
            <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <SourceChip
                label={`Source: ${source}`}
                size="small"
              />
              {confidence && (
                <ConfidenceChip
                  label={`${Math.round(confidence * 100)}% confidence`}
                  size="small"
                />
              )}
              {sentiment && sentiment.sentiment !== 'neutral' && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <SentimentIndicator sentiment={sentiment.sentiment} />
                  <Typography variant="caption" sx={{ ml: 0.5, fontSize: '10px' }}>
                    {sentiment.sentiment === 'frustrated' ? 'Frustrated' : 'Satisfied'}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </BubbleContent>
        
        {/* Options for disambiguation */}
        {type && type.options && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {type.options.map((option, idx) => (
              <Chip
                key={idx}
                label={typeof option === 'string' ? option : option.value || option}
                onClick={() => type.onOptionClick?.(option)}
                sx={{
                  backgroundColor: '#333333',
                  color: '#D4AF37',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#444444',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </MessageBubble>
  );
};

export default ChatMessage;

