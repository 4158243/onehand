import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LogoutIcon from '@mui/icons-material/Logout';
import { useWalletContext } from '../../../context/index.js';
import { formatAddress } from '../../../utils/formatAddress.js';

/**
 * Header wallet button: "Connect Wallet" or truncated address with disconnect menu.
 */
export function WalletConnectButton() {
  const { address, isConnected, connect, disconnect, loading, hasWallet } = useWalletContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    if (isConnected) setAnchorEl(e.currentTarget);
    else connect();
  };

  const handleClose = () => setAnchorEl(null);

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };

  if (!hasWallet) {
    return (
      <Button
        variant="outlined"
        color="warning"
        startIcon={<AccountBalanceWalletIcon />}
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Install MetaMask
      </Button>
    );
  }

  if (isConnected) {
    return (
      <>
        <Button
          variant="outlined"
          onClick={handleClick}
          startIcon={<AccountBalanceWalletIcon />}
          sx={{ textTransform: 'none' }}
        >
          {formatAddress(address)}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem disabled>
            <ListItemText primary={address} secondary="Connected" />
          </MenuItem>
          <MenuItem onClick={handleDisconnect}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Disconnect" />
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <Button
      variant="contained"
      onClick={connect}
      disabled={loading}
      startIcon={<AccountBalanceWalletIcon />}
    >
      {loading ? 'Connecting…' : 'Connect Wallet'}
    </Button>
  );
}
