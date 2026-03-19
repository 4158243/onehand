import React from 'react';
import MuiButton from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Shared button with variants and optional loading state.
 * @param {string} [variant='contained'] - 'contained' | 'outlined' | 'text'
 * @param {string} [color='primary'] - 'primary' | 'secondary' | 'success' | 'error' | 'warning'
 * @param {boolean} [loading=false]
 * @param {boolean} [fullWidth=false]
 * @param {boolean} [disabled]
 * @param {React.ReactNode} children
 * @param {object} [sx]
 * @param {object} [props] - rest passed to MUI Button
 */
export function Button({
  variant = 'contained',
  color = 'primary',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  sx,
  ...props
}) {
  return (
    <MuiButton
      variant={variant}
      color={color}
      fullWidth={fullWidth}
      disabled={disabled ?? loading}
      disableElevation={variant === 'contained'}
      sx={{ minWidth: loading ? 100 : undefined, ...sx }}
      {...props}
    >
      {loading ? (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} color="inherit" />
          {children}
        </Box>
      ) : (
        children
      )}
    </MuiButton>
  );
}

export default Button;
