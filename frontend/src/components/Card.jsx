import React from 'react';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';

/**
 * Shared card with optional header, content, and actions.
 * @param {string} [title]
 * @param {string} [subheader]
 * @param {React.ReactNode} [action] - header action (e.g. icon button)
 * @param {React.ReactNode} children - main content
 * @param {React.ReactNode} [actions] - footer actions
 * @param {boolean} [noPadding] - remove content padding
 * @param {object} [sx]
 * @param {object} [props] - rest passed to MUI Card
 */
export function Card({
  title,
  subheader,
  action,
  children,
  actions,
  noPadding = false,
  sx,
  ...props
}) {
  return (
    <MuiCard sx={{ overflow: 'hidden', ...sx }} {...props}>
      {(title || action) && (
        <CardHeader
          title={title}
          subheader={subheader}
          action={action}
          sx={{ pb: 0 }}
        />
      )}
      {children != null && (
        <CardContent sx={noPadding ? { p: 0, '&:last-child': { pb: 0 } } : undefined}>
          {children}
        </CardContent>
      )}
      {actions && (
        <CardActions disableSpacing sx={{ pt: 0, px: 2, pb: 2 }}>
          {actions}
        </CardActions>
      )}
    </MuiCard>
  );
}

/**
 * Card with a simple clickable area (e.g. service card).
 */
export function CardClickable({ onClick, children, sx, ...props }) {
  return (
    <MuiCard
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : undefined,
        transition: 'box-shadow 0.2s',
        '&:hover': onClick ? { boxShadow: 4 } : {},
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
}

export default Card;
