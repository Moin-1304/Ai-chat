// ChatInput component - input field with send button
import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, alpha } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

const ChatInput = ({ onSend, disabled = false, placeholder = "Type your message..." }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <InputContainer>
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: alpha('#121212', 0.8),
            color: '#E0E0E0',
            borderRadius: '12px',
            border: `1px solid ${alpha('#D4AF37', 0.2)}`,
            transition: 'all 0.2s ease',
            '& fieldset': {
              border: 'none',
            },
            '&:hover': {
              backgroundColor: alpha('#121212', 1),
              borderColor: alpha('#D4AF37', 0.4),
            },
            '&.Mui-focused': {
              backgroundColor: alpha('#121212', 1),
              borderColor: '#D4AF37',
              boxShadow: `0 0 0 2px ${alpha('#D4AF37', 0.2)}`,
            },
          },
          '& .MuiInputBase-input': {
            color: '#E0E0E0',
            fontSize: '14px',
            padding: '10px 12px',
            '&::placeholder': {
              color: alpha('#E0E0E0', 0.5),
              opacity: 1,
            },
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ mr: 0.5 }}>
              <IconButton
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                sx={{
                  color: message.trim() && !disabled ? '#D4AF37' : alpha('#666666', 0.5),
                  backgroundColor: message.trim() && !disabled ? alpha('#D4AF37', 0.1) : 'transparent',
                  borderRadius: '8px',
                  width: 36,
                  height: 36,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: message.trim() && !disabled ? alpha('#D4AF37', 0.2) : alpha('#666666', 0.1),
                    transform: message.trim() && !disabled ? 'scale(1.05)' : 'none',
                  },
                  '&:disabled': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <SendIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </InputContainer>
  );
};

export default ChatInput;

