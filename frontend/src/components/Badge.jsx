import React from 'react';
import MuiChip from '@mui/material/Chip';
import MuiBadge from '@mui/material/Badge';
import Box from '@mui/material/Box';

const STATUS_COLORS = {
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

/**
 * Status badge (pill/chip) for labels like "Verified", "Pending", "In Escrow".
 * @param {string} [label]
 * @param {string} [color='default'] - MUI color or 'success' for verified-style
 * @param {string} [size='small'] - 'small' | 'medium'
 * @param {string} [variant='filled'] - 'filled' | 'outlined'
 * @param {object} [sx]
 * @param {object} [props]
 */
export function Badge({
  label,
  color = 'default',
  size = 'small',
  variant = 'filled',
  sx,
  ...props
}) {
  return (
    <MuiChip
      label={label}
      color={STATUS_COLORS[color] || 'default'}
      size={size}
      variant={variant}
      sx={{ fontWeight: 500, ...sx }}
      {...props}
    />
  );
}

/**
 * Dot badge (e.g. notification count or status indicator).
 * @param {number} [count] - show number; omit for dot only
 * @param {string} [color='primary'] - 'primary' | 'secondary' | 'success' | 'error'
 * @param {React.ReactNode} children - wrapped element (e.g. icon)
 */
export function BadgeDot({ count, color = 'primary', children, ...props }) {
  return (
    <MuiBadge
      badgeContent={count}
      color={color}
      variant={count != null ? 'standard' : 'dot'}
      {...props}
    >
      {children}
    </MuiBadge>
  );
}

/**
 * "Verified" style badge for Taibah student.
 */
export function VerifiedBadge({ size = 'small', sx }) {
  return (
    <Badge
      label="Verified"
      color="success"
      size={size}
      variant="filled"
      sx={{ ...sx }}
    />
  );
}

export default Badge;
