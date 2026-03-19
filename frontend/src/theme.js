import { createTheme } from '@mui/material/styles';
import { appColors } from './config/appColors.js';

/**
 * One Hand app theme (MUI).
 * Palette from config/appColors.js.
 */
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: appColors.primary.main,
      light: appColors.primary.light,
      dark: appColors.primary.dark,
      contrastText: appColors.primary.contrast,
    },
    secondary: {
      main: appColors.secondary.main,
      light: appColors.secondary.light,
      dark: appColors.secondary.dark,
      contrastText: appColors.secondary.contrast,
    },
    background: {
      default: appColors.background.default,
      paper: appColors.background.paper,
    },
    success: {
      main: appColors.success,
    },
    error: {
      main: appColors.error,
    },
    warning: {
      main: appColors.warning,
    },
    info: {
      main: appColors.info,
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 600 },
    h2: { fontSize: '1.75rem', fontWeight: 600 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.125rem', fontWeight: 600 },
    h6: { fontSize: '1rem', fontWeight: 600 },
    button: { textTransform: 'none' },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
