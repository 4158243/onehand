import React from 'react';
import Chip from '@mui/material/Chip';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

/**
 * Badge shown when user is verified (entered code, linked @taibahu.edu.sa).
 */
export function VerifiedBadge({ size = 'small' }) {
  return (
    <Chip
      icon={<VerifiedUserIcon sx={{ fontSize: size === 'small' ? 16 : 20 }} />}
      label="Verified Taibah University Student"
      color="success"
      size={size}
      variant="filled"
      sx={{ fontWeight: 500 }}
    />
  );
}
