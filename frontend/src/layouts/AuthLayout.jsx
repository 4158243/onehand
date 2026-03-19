import React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

/**
 * Full-bleed layout for auth flows: centered content, branded background.
 */
export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 50%, #e8f5e9 100%)',
        py: 4,
        px: 2,
      }}
    >
      <Outlet />
    </Box>
  );
}
