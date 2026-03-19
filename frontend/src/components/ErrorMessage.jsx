import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Button } from './Button.jsx';

/**
 * Error message block with optional retry.
 * @param {string} [message='Something went wrong']
 * @param {string} [title]
 * @param {function} [onRetry]
 * @param {string} [retryLabel='Retry']
 * @param {object} [sx]
 */
export function ErrorMessage({
  message = 'Something went wrong',
  title,
  onRetry,
  retryLabel = 'Retry',
  sx,
}) {
  return (
    <Alert
      severity="error"
      onClose={onRetry ? undefined : undefined}
      action={
        onRetry ? (
          <Button variant="outlined" size="small" color="inherit" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : undefined
      }
      sx={{ ...sx }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}

export default ErrorMessage;
