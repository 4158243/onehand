/**
 * One Hand — app color palette.
 * Use in theme.js and for non-MUI styling (e.g. CSS vars, inline styles).
 */

export const appColors = Object.freeze({
  // Primary (brand / main actions)
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrast: '#ffffff',
  },
  // Secondary (Verified, success accent)
  secondary: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrast: '#ffffff',
  },
  // Backgrounds
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
    header: '#1976d2',
  },
  // Semantic
  success: '#2e7d32',
  error: '#d32f2f',
  warning: '#ed6c02',
  info: '#0288d1',
  // Text
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
  // Borders / dividers
  divider: 'rgba(0, 0, 0, 0.12)',
});

export default appColors;
