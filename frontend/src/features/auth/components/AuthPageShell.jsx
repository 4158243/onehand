import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { appSettings } from '../../../config/appSettings.js';

/**
 * Shared shell for auth pages: branded card with title and subtitle.
 */
export function AuthPageShell({ title, subtitle, children }) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: 420,
        borderRadius: 3,
        overflow: 'hidden',
        p: 4,
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          {appSettings.appName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {appSettings.universityName}
        </Typography>
      </Box>
      <Typography variant="h6" fontWeight={600} align="center" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Paper>
  );
}
