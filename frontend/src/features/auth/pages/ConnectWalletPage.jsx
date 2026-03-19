import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useWalletContext } from '../../../context/index.js';
import { WalletConnectButton } from '../components/WalletConnectButton.jsx';
import { appSettings } from '../../../config/appSettings.js';

/**
 * Connect Wallet page: connect MetaMask, show wrong-network alert, redirect when connected.
 */
export function ConnectWalletPage() {
  const navigate = useNavigate();
  const {
    isConnected,
    wrongNetwork,
    switchChain,
    error,
    hasWallet,
    address,
  } = useWalletContext();

  // If already connected and correct network, redirect to home
  React.useEffect(() => {
    if (isConnected && !wrongNetwork) {
      navigate('/', { replace: true });
    }
  }, [isConnected, wrongNetwork, navigate]);

  if (!hasWallet) {
    return (
      <Box sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <AccountBalanceWalletIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Wallet required
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {appSettings.appName} uses MetaMask to connect your account. Install the extension to continue.
          </Typography>
          <Button
            variant="contained"
            href="https://metamask.io/download/"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<AccountBalanceWalletIcon />}
          >
            Install MetaMask
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 480, mx: 'auto' }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Connect your wallet
        </Typography>
        <Typography color="text.secondary" align="center" sx={{ mb: 3 }}>
          Connect with MetaMask to use {appSettings.appName}.
        </Typography>

        {wrongNetwork && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            Wrong network. Please switch to the correct chain to continue.
            <Button size="small" onClick={switchChain} sx={{ mt: 1 }} fullWidth>
              Switch network
            </Button>
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <WalletConnectButton />
        </Box>

        {isConnected && address && !wrongNetwork && (
          <Typography color="text.secondary" align="center" sx={{ mt: 2 }}>
            Connected: {address.slice(0, 10)}… Redirecting…
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
