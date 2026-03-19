import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/index.js';

/**
 * Route guard: user must be logged in (@taibahu.edu.sa); else redirect to login.
 */
export function RequireAuth({ children }) {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
