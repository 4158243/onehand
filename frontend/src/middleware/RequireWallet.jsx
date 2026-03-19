import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWalletContext } from '../context/index.js';

/**
 * Route guard: wallet must be connected; else redirect to connect wallet.
 */
export function RequireWallet({ children }) {
  const { isConnected } = useWalletContext();
  if (!isConnected) {
    return <Navigate to="/connect-wallet" replace />;
  }
  return children;
}
