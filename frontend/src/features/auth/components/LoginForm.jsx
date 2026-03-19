import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { TAIBAH_EMAIL_SUFFIX } from '../../../config/constants.js';

function validateEmail(email) {
  if (!email.trim()) return 'Email is required';
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return 'Enter a valid email address';
  if (!email.endsWith(TAIBAH_EMAIL_SUFFIX)) {
    return `Only ${TAIBAH_EMAIL_SUFFIX} addresses are allowed`;
  }
  return null;
}

export function LoginForm({ onLogin, loading: externalLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);

  const isSubmitting = loading || externalLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    const emailError = validateEmail(email);
    const passwordError = password ? null : 'Password is required';

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }
    setErrors({});

    setLoading(true);
    try {
      await onLogin(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setSubmitError(err.message || 'Sign in failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setSubmitError('')}>
          {submitError}
        </Alert>
      )}

      <TextField
        fullWidth
        label="University email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
        placeholder={`your.name${TAIBAH_EMAIL_SUFFIX}`}
        autoComplete="email"
        margin="normal"
        autoFocus
      />

      <TextField
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
        autoComplete="current-password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((s) => !s)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{ mt: 3, mb: 2, py: 1.5 }}
      >
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>

      <Typography variant="body2" color="text.secondary" align="center">
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} to="/register" underline="hover">
          Create one
        </Link>
      </Typography>
    </Box>
  );
}
