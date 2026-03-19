import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/index.js';
import { useWalletContext } from '../../../context/index.js';
import { AuthPageShell } from '../components/AuthPageShell.jsx';
import { VerifyCodeForm } from '../components/VerifyCodeForm.jsx';

/**
 * Verify email with virtual code (e.g. 123456). Requires user to be signed in.
 */
export function VerifyEmailPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isVerified, user } = useAuthContext();
  const { address: walletAddress } = useWalletContext();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/verify-email' } }, replace: true });
      return;
    }
    if (isVerified) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isVerified, navigate]);

  if (!isAuthenticated || isVerified) {
    return null;
  }

  return (
    <AuthPageShell
      title="Verify your email"
      subtitle={`Enter the code for ${user?.email ?? 'your @taibahu.edu.sa email'} (demo: use the code below).`}
    >
      <VerifyCodeForm walletAddress={walletAddress ?? undefined} />
    </AuthPageShell>
  );
}
