import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * Empty state when a list or section has no items.
 * @param {string} [title='No items yet']
 * @param {string} [description] - optional secondary text
 * @param {React.ReactNode} [action] - optional button or link
 */
export function EmptyState({ title = 'No items yet', description, action }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 320 }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
}

export default EmptyState;
