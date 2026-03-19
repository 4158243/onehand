import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/index.js';

/**
 * Route guard: user must be verified (wallet–email link); else redirect to verify or profile.
 */
export function RequireVerified({ children }) {
  const { isVerified } = useAuthContext();
  if (!isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
}
