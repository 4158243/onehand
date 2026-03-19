import React from 'react';
import { Link as RouterLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { WalletConnectButton } from '../features/auth/components/WalletConnectButton.jsx';
import { VerifiedBadge } from '../features/auth/components/VerifiedBadge.jsx';
import { useWalletContext } from '../context/index.js';
import { useAuthContext } from '../context/index.js';
import { appSettings } from '../config/appSettings.js';

/**
 * Main app layout: header with nav, auth (Login/Register or user menu), and wallet.
 */
export function MainLayout() {
  const { isConnected, wrongNetwork, switchChain } = useWalletContext();
  const { isAuthenticated, user, isVerified, loading: authLoading, logout } = useAuthContext();
  const location = useLocation();
  const isConnectPage = location.pathname === '/connect-wallet';

  const [anchorEl, setAnchorEl] = React.useState(null);

  // When logged in but not verified, show verify-email page (e.g. after login or register).
  if (!authLoading && isAuthenticated && !isVerified) {
    return <Navigate to="/verify-email" state={{ from: location }} replace />;
  }
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Link component={RouterLink} to="/" color="inherit" underline="none" sx={{ flexGrow: 1 }}>
            <Typography variant="h6">{appSettings.appName}</Typography>
          </Link>
          <Button color="inherit" component={RouterLink} to="/services">
            Browse
          </Button>
          <Button color="inherit" component={RouterLink} to="/requests">
            My Requests
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile">
            Profile
          </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            {isAuthenticated ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-label="Account menu"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem disabled sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <ListItemText primary={user?.email} secondary={user?.name || 'Signed in'} />
                    {isVerified && (
                      <Box sx={{ mt: 1 }}>
                        <VerifiedBadge size="small" />
                      </Box>
                    )}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Log out" />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/login">
                  Sign in
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{ borderColor: 'rgba(255,255,255,0.5)' }}
                >
                  Register
                </Button>
              </>
            )}
            {!isConnectPage && <WalletConnectButton />}
          </Box>
        </Toolbar>
      </AppBar>

      {wrongNetwork && (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={switchChain}>
              Switch network
            </Button>
          }
          sx={{ borderRadius: 0 }}
        >
          Wrong network. Please switch to the correct chain.
        </Alert>
      )}

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </Box>
  );
}
