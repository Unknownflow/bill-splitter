import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark'
    primary: {
      main: '#10b981'
    },
    secondary: {
      main: '#3b82f6'
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff'
    },
    text: {
      primary: '#1f2937', // neutral-dark for headings
      secondary: '#6b7280' // medium gray for labels/descriptions
    },
    success: {
      main: '#22c55e' // bright green – indicate paid/settled
    },
    error: {
      main: '#ef4444' // red – indicate imbalance/errors
    },
    warning: {
      main: '#f59e0b'
    },
    info: {
      main: '#0ea5e9'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.4rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    subtitle1: {
      fontWeight: 500
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#10b981', // use primary
          boxShadow: 'none'
        }
      }
    }
  }
})

export default theme
