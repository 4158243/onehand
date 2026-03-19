import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme.js';
import { AuthProvider, WalletProvider } from './context/index.js';
import { WalletLinkEffect } from './components/WalletLinkEffect.jsx';
import { Routes } from './routes.jsx';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <WalletProvider>
          <WalletLinkEffect />
          <Routes />
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
