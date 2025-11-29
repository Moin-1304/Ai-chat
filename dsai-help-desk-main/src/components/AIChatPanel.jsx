// AIChatPanel - Main chat interface component
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Collapse,
  Chip,
  Paper,
  alpha,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import { styled } from '@mui/material/styles';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { chatAPI } from '../utils/apiClient';
import { useAuth } from '../context/AuthContext';

const ChatPanel = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 24,
  right: 24,
  width: '420px',
  height: 'calc(100vh - 112px)',
  maxHeight: '700px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#1a1a1a',
  color: '#E0E0E0',
  borderRadius: '16px',
  border: `2px solid ${alpha('#D4AF37', 0.3)}`,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(212, 175, 55, 0.2)',
  zIndex: 1000,
  background: `linear-gradient(180deg, ${alpha('#1a1a1a', 1)} 0%, ${alpha('#121212', 1)} 100%)`,
  overflow: 'hidden',
  [theme.breakpoints.down('lg')]: {
    width: '380px',
  },
  [theme.breakpoints.down('md')]: {
    width: 'calc(100vw - 48px)',
    right: 24,
    left: 24,
    height: 'calc(100vh - 112px)',
    maxHeight: '85vh',
  },
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: '20px 24px',
  borderBottom: `2px solid ${alpha('#D4AF37', 0.2)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: `linear-gradient(135deg, ${alpha('#D4AF37', 0.15)} 0%, ${alpha('#0052CC', 0.1)} 100%)`,
  borderRadius: '16px 16px 0 0',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, transparent, ${alpha('#D4AF37', 0.6)}, transparent)`,
  },
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  background: `linear-gradient(180deg, ${alpha('#1a1a1a', 1)} 0%, ${alpha('#121212', 1)} 100%)`,
  '&::-webkit-scrollbar': {
    width: '10px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#121212',
    borderRadius: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: alpha('#D4AF37', 0.3),
    borderRadius: '5px',
    border: '2px solid #121212',
    '&:hover': {
      backgroundColor: alpha('#D4AF37', 0.5),
    },
  },
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  color: '#999999',
  backgroundColor: alpha('#333333', 0.3),
  borderRadius: '12px',
  border: `1px solid ${alpha('#D4AF37', 0.2)}`,
  marginBottom: '12px',
  width: 'fit-content',
}));

const AIChatPanel = ({ isOpen, onClose, onTicketCreated, initialMessage = null }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState('Understanding request...');
  const [conversationContext, setConversationContext] = useState({});
  const [escalationStatus, setEscalationStatus] = useState(null);
  const [isAgentActive, setIsAgentActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sessionId] = useState(() => {
    // Try to get existing session from localStorage, or create new one
    const stored = localStorage.getItem('chat_session_id');
    if (stored) return stored;
    const newId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chat_session_id', newId);
    return newId;
  });
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const initialMessageSentRef = useRef(false);
  const lastInitialMessageRef = useRef(null);

  // Rotating typing messages
  const typingMessages = [
    'Understanding request...',
    'Analyzing...',
    'Processing...',
    'Generating response...',
  ];

  // Rotate typing messages when typing
  useEffect(() => {
    if (isTyping && !escalationStatus) {
      let messageIndex = 0;
      setTypingMessage(typingMessages[0]);
      
      typingIntervalRef.current = setInterval(() => {
        messageIndex = (messageIndex + 1) % typingMessages.length;
        setTypingMessage(typingMessages[messageIndex]);
      }, 1500);
      
      return () => {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }
      };
    } else {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    }
  }, [isTyping, escalationStatus]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize with welcome message when chat is opened and not collapsed
  useEffect(() => {
    if (isOpen && !collapsed) {
      // Only initialize welcome message if messages array is empty
      if (messages.length === 0) {
        const welcomeMessage = {
          id: Date.now(),
          type: 'ai',
          content: "Hello! I'm your AI assistant for PCTE Help Desk. How can I help you today?",
          timestamp: new Date(),
          sentiment: { sentiment: 'neutral', score: 0 },
          confidence: 0.95,
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [isOpen, collapsed, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = useCallback(async (userMessage) => {
    // Add user message
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Note: Ticket creation is now handled automatically by the API when escalation is needed

    // Check for escalation after ticket creation (only if ticket was created)
    if (conversationContext.ticketCreated) {
      const lowerMessage = userMessage.toLowerCase();
      const escalationKeywords = ['urgent', 'now', 'asap', 'immediately', 'need help now', 'emergency', 'i need help now! this is urgent!'];
      const isEscalation = escalationKeywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
      
      if (isEscalation) {
        setIsTyping(true);
        
        // Show analyzing
        const analyzingMsg = {
          id: Date.now() + 0.1,
          type: 'ai',
          content: '🔍 Analyzing escalation request...',
          timestamp: new Date(),
          isAnalyzing: true,
        };
        setMessages(prev => [...prev, analyzingMsg]);
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setMessages(prev => prev.filter(msg => !msg.isAnalyzing));
        
        // Show AI message about connecting to human agent
        const aiEscalationMsg = {
          id: Date.now() + 0.2,
          type: 'ai',
          content: 'I understand this is urgent. Let me connect you with a live human agent immediately.',
          timestamp: new Date(),
          isTyping: true,
        };
        setMessages(prev => [...prev, aiEscalationMsg]);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessages(prev => prev.map(msg => 
          msg.id === aiEscalationMsg.id ? { ...msg, isTyping: false } : msg
        ));
        
        // Show finding agent animation
        setEscalationStatus({
          message: '🔍 Finding available agent...',
          status: 'searching',
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setEscalationStatus({
          message: '📞 Connecting to live agent...',
          status: 'connecting',
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setEscalationStatus({
          message: 'Agent will message you when online',
          status: 'pending',
        });
        
        // After 3 seconds, show Sarah (Tier 2) message
        setTimeout(() => {
          const agentMsg = {
            id: Date.now() + 2,
            type: 'agent',
            content: `Hi! I'm Sarah from Tier 2 Support. I can see you have ticket ${conversationContext.lastTicketId || 'INC-XXXX'} and need urgent assistance. I'm here to help you right away. Can you tell me more about what's happening?`,
            timestamp: new Date(),
            agentName: 'Sarah',
            agentTier: 'Tier 2',
          };
          
          setIsTyping(false);
          setMessages(prev => [...prev, agentMsg]);
          setEscalationStatus({
            message: 'Live agent active - Sarah (Tier 2)',
            status: 'active',
          });
          setIsAgentActive(true);
        }, 3000);
        
        return;
      }
    }

    // Generate AI response using real API
    setIsTyping(true);
    
    // Show analyzing message
    const analyzingMsg = {
      id: Date.now() + 0.1,
      type: 'ai',
      content: '🔍 Analyzing request...',
      timestamp: new Date(),
      isAnalyzing: true,
    };
    setMessages(prev => [...prev, analyzingMsg]);
    
    try {
      // Call real API
      const userRole = user?.role?.toLowerCase() || 'trainee';
      const context = {
        module: conversationContext.module || 'lab-7',
        channel: 'self-service-portal'
      };
      
      const apiResponse = await chatAPI.sendMessage(
        sessionId,
        userMessage,
        userRole,
        context
      );
      
      // Remove analyzing message
      setMessages(prev => prev.filter(msg => !msg.isAnalyzing));
      
      // Convert API response to format expected by component
      const aiResponse = {
        message: apiResponse.answer,
        type: apiResponse.guardrail?.blocked ? 'guardrail' : 'answer',
        sentiment: {
          sentiment: 'neutral', // API doesn't return sentiment in response
          score: 0
        },
        confidence: apiResponse.confidence,
        source: apiResponse.kbReferences?.[0]?.id || null,
        sourceName: apiResponse.kbReferences?.[0]?.title || null,
        guardrail: apiResponse.guardrail,
        ticketId: apiResponse.ticketId,
        tier: apiResponse.tier,
        severity: apiResponse.severity,
        needsEscalation: apiResponse.needsEscalation,
        kbReferences: apiResponse.kbReferences || []
      };
      
      // Handle escalation
      if (apiResponse.needsEscalation && apiResponse.ticketId) {
        // Create ticket data for callback
        const ticketData = {
          id: apiResponse.ticketId,
          subject: userMessage.substring(0, 100),
          description: userMessage,
          priority: apiResponse.severity,
          status: 'NEW',
          created: new Date().toISOString(),
          tier: apiResponse.tier,
          severity: apiResponse.severity
        };
        
        if (onTicketCreated) {
          onTicketCreated(ticketData);
        }
        
        setConversationContext(prev => ({
          ...prev,
          ticketCreated: true,
          lastTicketId: apiResponse.ticketId
        }));
      }
      
      // Handle guardrail blocking
      if (apiResponse.guardrail?.blocked) {
        setEscalationStatus({
          message: 'Request blocked by security guardrails',
          status: 'blocked',
        });
        
        // Still show the response
        const aiMsg = {
          id: Date.now() + 1,
          type: 'ai',
          content: aiResponse.message,
          timestamp: new Date(),
          sentiment: aiResponse.sentiment,
          confidence: aiResponse.confidence,
          source: aiResponse.source,
          sourceName: aiResponse.sourceName,
          messageType: 'guardrail',
          guardrail: aiResponse.guardrail,
          ticketId: aiResponse.ticketId,
          isTyping: true,
        };
        
        setIsTyping(false);
        setMessages(prev => [...prev, aiMsg]);
        
        // Simulate typing effect
        await new Promise(resolve => setTimeout(resolve, Math.min(aiResponse.message.length * 20, 2000)));
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsg.id ? { ...msg, isTyping: false } : msg
        ));
        
        return;
      }
      
      // Add AI message with typing effect
      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse.message,
        timestamp: new Date(),
        sentiment: aiResponse.sentiment,
        confidence: aiResponse.confidence,
        source: aiResponse.source,
        sourceName: aiResponse.sourceName,
        messageType: aiResponse.type,
        guardrail: aiResponse.guardrail,
        ticketId: aiResponse.ticketId,
        tier: aiResponse.tier,
        severity: aiResponse.severity,
        isTyping: true,
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      
      // Simulate typing effect for AI response
      await new Promise(resolve => setTimeout(resolve, Math.min(aiResponse.message.length * 20, 2000)));
      
      // Mark typing as complete
      setMessages(prev => prev.map(msg => 
        msg.id === aiMsg.id ? { ...msg, isTyping: false } : msg
      ));
      
    } catch (error) {
      // Remove analyzing message
      setMessages(prev => prev.filter(msg => !msg.isAnalyzing));
      
      // Show error message
      const errorMsg = {
        id: Date.now() + 1,
        type: 'ai',
        content: `I'm sorry, I encountered an error: ${error.message}. Please try again or contact support.`,
        timestamp: new Date(),
        sentiment: { sentiment: 'neutral', score: 0 },
        confidence: 0.0,
        source: null,
        sourceName: null,
        messageType: 'error',
        isTyping: true,
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, errorMsg]);
      
      // Simulate typing effect
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => prev.map(msg => 
        msg.id === errorMsg.id ? { ...msg, isTyping: false } : msg
      ));
    }
  }, [messages, conversationContext, onTicketCreated]);

  // Handle initial message and auto-expand when message is provided
  useEffect(() => {
    if (isOpen && initialMessage && initialMessage !== lastInitialMessageRef.current) {
      // Reset the sent flag for new initial message
      initialMessageSentRef.current = false;
      lastInitialMessageRef.current = initialMessage;
      
      // If chat is collapsed, expand it first
      if (collapsed) {
        setCollapsed(false);
      }
    } else if (!initialMessage) {
      // Clear refs when initial message is cleared
      initialMessageSentRef.current = false;
      lastInitialMessageRef.current = null;
    }
  }, [initialMessage, isOpen, collapsed]);

  // Send initial message after chat is expanded and welcome message is shown
  useEffect(() => {
    if (isOpen && !collapsed && initialMessage && !initialMessageSentRef.current) {
      // Wait for welcome message to be set if needed
      if (messages.length === 0) {
        // Welcome message will be set by the other useEffect, wait for it
        return;
      }
      
      // Welcome message exists, send the initial message
      const timer = setTimeout(() => {
        if (!initialMessageSentRef.current) {
          initialMessageSentRef.current = true;
          handleSendMessage(initialMessage);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, collapsed, initialMessage, messages.length, handleSendMessage]);

  const handleClose = () => {
    // Reset chat state and collapse (but don't close completely)
    setMessages([]);
    setConversationContext({});
    setEscalationStatus(null);
    setIsAgentActive(false);
    setIsTyping(false);
    setCollapsed(true);
    initialMessageSentRef.current = false;
    lastInitialMessageRef.current = null;
    // Clear initial message in parent but keep chat open (so floating button shows)
    if (onClose) {
      // Only clear the initial message, don't close the chat
      onClose();
    }
  };

  const handleToggleCollapse = () => {
    const newCollapsedState = !collapsed;
    
    // Reset any stuck states when toggling
    setIsTyping(false);
    if (newCollapsedState) {
      // When collapsing, clear escalation status
      setEscalationStatus(null);
    }
    
    setCollapsed(newCollapsedState);
  };

  const handleOptionClick = (option) => {
    handleSendMessage(option);
  };

  if (!isOpen) return null;

  // When collapsed, show a floating button to reopen
  if (collapsed) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={handleToggleCollapse}
          sx={{
            width: 'auto',
            height: 56,
            minWidth: 180,
            px: 2,
            backgroundColor: '#D4AF37',
            color: '#1a1a1a',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
            '&:hover': {
              backgroundColor: '#E8C547',
              boxShadow: '0 6px 16px rgba(212, 175, 55, 0.5)',
              transform: 'scale(1.05)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ChatIcon sx={{ fontSize: '24px', mr: 1 }} />
          <Typography sx={{ fontWeight: 'bold', fontSize: '16px', textTransform: 'none' }}>
            Chat with ACE
          </Typography>
        </IconButton>
      </Box>
    );
  }

  return (
    <ChatPanel elevation={8}>
      <ChatHeader>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${alpha('#D4AF37', 0.3)} 0%, ${alpha('#0052CC', 0.2)} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${alpha('#D4AF37', 0.4)}`,
              boxShadow: `0 4px 12px ${alpha('#D4AF37', 0.2)}`,
            }}
          >
            <SmartToyIcon sx={{ color: '#D4AF37', fontSize: '24px' }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '18px', lineHeight: 1.2 }}>
              ACE - AI Assistant
            </Typography>
            <Typography variant="caption" sx={{ color: alpha('#E0E0E0', 0.7), fontSize: '11px' }}>
              Always here to help
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: '#999999',
            '&:hover': {
              backgroundColor: alpha('#D4AF37', 0.1),
              color: '#D4AF37',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <CloseIcon />
        </IconButton>
      </ChatHeader>

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <MessagesContainer ref={messagesContainerRef}>
          {messages.map((msg) => {
            // Skip analyzing messages (they're shown temporarily), but show processing messages
            if (msg.isAnalyzing) return null;
            
            return (
              <ChatMessage
                key={msg.id}
                message={msg.content}
                isUser={msg.type === 'user'}
                source={msg.source}
                confidence={msg.confidence}
                sentiment={msg.sentiment}
                type={msg.messageType === 'disambiguation' ? { options: msg.options, onOptionClick: handleOptionClick } : msg.messageType === 'guardrail' ? 'guardrail' : null}
                agentName={msg.agentName}
                agentTier={msg.agentTier}
                isTyping={msg.isTyping}
                guardrail={msg.guardrail}
              />
            );
          })}

          {isTyping && !escalationStatus && (
            <TypingIndicator>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${alpha('#D4AF37', 0.3)} 0%, ${alpha('#0052CC', 0.2)} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${alpha('#D4AF37', 0.4)}`,
                }}
              >
                <SmartToyIcon sx={{ fontSize: '14px', color: '#D4AF37' }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#D4AF37', fontWeight: 'medium' }}>
                {typingMessage}
              </Typography>
            </TypingIndicator>
          )}

          <Box ref={messagesEndRef} />

          {/* Escalation Banner */}
          <Collapse in={escalationStatus !== null}>
            <Alert
              severity="warning"
              sx={{
                mt: 2,
                backgroundColor: alpha('#FF9500', 0.2),
                color: '#FF9500',
                border: `1px solid ${alpha('#FF9500', 0.4)}`,
                borderRadius: '12px',
                '& .MuiAlert-icon': {
                  color: '#FF9500',
                },
                boxShadow: `0 4px 12px ${alpha('#FF9500', 0.2)}`,
              }}
            >
              {escalationStatus?.message || 'Connecting to live agent...'}
            </Alert>
          </Collapse>
        </MessagesContainer>

        <Box
          sx={{
            borderTop: `2px solid ${alpha('#D4AF37', 0.2)}`,
            padding: '16px 20px',
            background: `linear-gradient(180deg, ${alpha('#121212', 1)} 0%, ${alpha('#1a1a1a', 1)} 100%)`,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, transparent, ${alpha('#D4AF37', 0.6)}, transparent)`,
            },
          }}
        >
          <ChatInput
            onSend={handleSendMessage}
            disabled={isTyping || escalationStatus?.status === 'escalating'}
          />
          {/* Collapse Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <IconButton
              onClick={handleToggleCollapse}
              sx={{
                color: '#D4AF37',
                backgroundColor: alpha('#D4AF37', 0.1),
                borderRadius: '8px',
                width: '100%',
                py: 0.5,
                '&:hover': {
                  backgroundColor: alpha('#D4AF37', 0.2),
                  color: '#E8C547',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ExpandMoreIcon sx={{ fontSize: '24px' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ChatPanel>
  );
};

export default AIChatPanel;

