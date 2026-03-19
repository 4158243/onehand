import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Route guard: user must be in admin list (contract or Firestore); else redirect to home.
 * TODO: read admin list from contract or Firestore and set isAdmin in context.
 */
export function RequireAdmin({ children }) {
  const isAdmin = false; // TODO: from context
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
