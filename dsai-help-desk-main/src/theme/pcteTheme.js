import { createTheme } from '@mui/material/styles';

const pcteTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1a1a', // Dark grey (not pure black)
      paper: '#242424',
    },
    primary: {
      main: '#D4AF37', // Army Gold
      light: '#E8C547',
      dark: '#B8941F',
    },
    secondary: {
      main: '#4A7C59', // Army Green
      light: '#6BA876',
      dark: '#2F5A3F',
    },
    success: {
      main: '#4A7C59', // Army Green for positive status
    },
    warning: {
      main: '#FF9500', // Highlight Orange
    },
    error: {
      main: '#D32F2F', // Red (reserved for critical only)
    },
    text: {
      primary: '#E0E0E0', // Off-white (87% opacity equivalent)
      secondary: '#999999', // Medium grey (60% opacity equivalent)
      disabled: '#666666', // Disabled text (38% opacity equivalent)
    },
  },
  typography: {
    fontFamily: '"Roboto", "JetBrains Mono", "Fira Code", monospace',
    h1: {
      fontSize: '28px',
      fontWeight: 'bold',
      letterSpacing: '0.5px',
    },
    h2: {
      fontSize: '22px',
      fontWeight: 'bold',
      letterSpacing: '0.3px',
    },
    h3: {
      fontSize: '18px',
      fontWeight: 'bold',
      letterSpacing: '0.2px',
    },
    body1: {
      fontSize: '14px',
      fontWeight: 'normal',
      lineHeight: '1.6',
    },
    body2: {
      fontSize: '12px',
      fontWeight: 'normal',
      lineHeight: '1.5',
    },
    caption: {
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
    monospace: {
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      fontSize: '12px',
    },
  },
  spacing: 8, // Base spacing unit: 8px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
          fontWeight: '600',
          letterSpacing: '0.5px',
          transition: 'all 0.2s ease', // Minimal animation
        },
        contained: {
          backgroundColor: '#D4AF37',
          color: '#1a1a1a',
          '&:hover': {
            backgroundColor: '#E8C547',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          backgroundColor: '#242424',
          border: '1px solid #333333',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          borderBottom: '1px solid #333333',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#242424',
          borderColor: '#333333',
        },
      },
    },
  },
});

export default pcteTheme;
