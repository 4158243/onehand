import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Full-area or inline loading spinner.
 * @param {string} [message] - optional text below spinner
 * @param {boolean} [fullPage] - center in viewport (e.g. for page load)
 * @param {string} [size='medium'] - 'small' | 'medium' | number
 */
export function LoadingSpinner({ message, fullPage = false, size = 'medium' }) {
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 4,
        px: 2,
        ...(fullPage && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.paper',
          zIndex: 1300,
        }),
      }}
    >
      <CircularProgress size={size === 'small' ? 32 : size === 'large' ? 48 : 40} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
  return content;
}

/**
 * Inline spinner (e.g. inside a button or table cell).
 */
export function Spinner({ size = 20, sx }) {
  return (
    <CircularProgress
      size={size}
      sx={{ display: 'inline-block', verticalAlign: 'middle', ...sx }}
    />
  );
}

export default LoadingSpinner;
