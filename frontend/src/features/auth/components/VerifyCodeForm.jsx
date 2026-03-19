import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../context/index.js';
import { appSettings } from '../../../config/appSettings.js';

/**
 * Virtual verification: user enters the fixed code (e.g. 123456).
 * Optionally link wallet to user in Firestore after verify.
 */
export function VerifyCodeForm({ walletAddress }) {
  const navigate = useNavigate();
  const { verifyCode, linkWallet } = useAuthContext();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!code.trim()) {
      setError('Enter the verification code');
      return;
    }
    setLoading(true);
    try {
      await verifyCode(code);
      if (walletAddress) await linkWallet(walletAddress);
      setVerified(true);
    } catch (err) {
      setError(err.message || 'Invalid code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!verified) return;
    const t = setTimeout(() => navigate('/', { replace: true }), 1500);
    return () => clearTimeout(t);
  }, [verified, navigate]);

  if (verified) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        Email verified! Redirecting you to the home page…
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter the 6-digit code. For this demo, use: <strong>{appSettings.verificationCode}</strong>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Verification code"
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
        placeholder="123456"
        inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
        autoComplete="one-time-code"
        margin="normal"
        autoFocus
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={loading || !code.trim()}
        sx={{ mt: 3, py: 1.5 }}
      >
        {loading ? 'Verifying…' : 'Verify email'}
      </Button>
    </Box>
  );
}
