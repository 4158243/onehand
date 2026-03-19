import React, { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAuthContext } from '../../../context/AuthContext.jsx';
import { useWalletContext } from '../../../context/WalletContext.jsx';
import { useUserContract } from '../hooks/useUserContract.js';
import { ProfileForm } from '../components/ProfileForm.jsx';
import { Button } from '../../../components/Button.jsx';
import { ErrorMessage } from '../../../components/ErrorMessage.jsx';
import { VerifiedBadge } from '../../auth/components/VerifiedBadge.jsx';
import { formatAddress } from '../../../utils/formatAddress.js';

const AVATAR_SIZE_VIEW = 112;

/**
 * Profile page: view mode (default) with option to switch to edit mode.
 * Single card with hero (gradient + avatar) and content; Edit toggles to form.
 */
export function ProfilePage() {
  const { user, updateProfileFirestore } = useAuthContext();
  const { address: walletAddress } = useWalletContext();
  const {
    onChainProfile,
    error: contractError,
    isRegisteredOnChain,
    registerOnChain,
    updateProfileOnChain,
    refetch,
  } = useUserContract(walletAddress || null);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const displayName = user?.name || onChainProfile?.name || '—';
  const displayBio = user?.bio ?? onChainProfile?.bio ?? '';
  const showAvatarImage = user?.avatarUrl && !avatarError;
console.log("user", user);

  useEffect(() => {
    setAvatarError(false);
  }, [user?.avatarUrl]);

  const handleSaveProfile = useCallback(
    async (name, bio, avatarUrl) => {
      setSaving(true);
      try {
        await updateProfileFirestore({ name, bio, avatarUrl });
        if (walletAddress) {
          if (!isRegisteredOnChain) {
            await registerOnChain(name, bio);
          } else {
            await updateProfileOnChain(name, bio);
          }
        }
        setIsEditing(false);
      } finally {
        setSaving(false);
      }
    },
    [
      updateProfileFirestore,
      walletAddress,
      isRegisteredOnChain,
      registerOnChain,
      updateProfileOnChain,
    ]
  );

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <Box data-profile-page className="profile-page" sx={{ maxWidth: 680, mx: 'auto', py: { xs: 2, sm: 3 }, px: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Typography variant="h4" fontWeight={600}>
          Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View & edit your info · Photo, name, bio
        </Typography>
      </Box>

      {contractError && (
        <ErrorMessage
          message={contractError}
          onRetry={refetch}
          retryLabel="Retry"
          sx={{ mb: 2 }}
        />
      )}
      <MuiCard
        sx={{
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={(theme) => ({
              height: 120,
              minHeight: 120,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            })}
          />

          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transform: 'translate(-50%, 50%)',
            }}
          >
            {showAvatarImage ? (
              <Box
                component="img"
                src={user.avatarUrl}
                alt="Profile"
                onError={() => setAvatarError(true)}
                sx={{
                  width: AVATAR_SIZE_VIEW,
                  height: AVATAR_SIZE_VIEW,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: 3,
                  bgcolor: 'grey.200',
                  display: 'block',
                }}
              />
            ) : (
              <Box
                sx={{
                  width: AVATAR_SIZE_VIEW,
                  height: AVATAR_SIZE_VIEW,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid',
                  borderColor: 'background.paper',
                  boxShadow: 3,
                  typography: 'h3',
                  fontWeight: 600,
                }}
              >
                {(displayName[0] || '?').toUpperCase()}
              </Box>
            )}
          </Box>
        </Box>

        <CardContent sx={{ pt: 8, pb: 3, px: { xs: 2, sm: 3 } }}>

          {isEditing ? (
            <ProfileForm
              initialName={user?.name ?? ''}
              initialBio={user?.bio ?? displayBio}
              initialAvatarUrl={user?.avatarUrl ?? ''}
              onSave={handleSaveProfile}
              onCancel={handleCancelEdit}
              saving={saving}
            />
          ) : (
            <>
              {/* View: name, badge, Edit button */}

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                  Edit profile
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Contact & wallet */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {user?.email && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                )}
                {walletAddress && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccountBalanceWalletIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatAddress(walletAddress)}
                    </Typography>
                  </Box>
                )}
              </Box>

              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                About
              </Typography>
              <Box
                sx={{
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                }}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', color: 'text.primary' }}>
                  {displayBio || 'No bio yet. Edit profile to add one.'}
                </Typography>
              </Box>

              {!isRegisteredOnChain && walletAddress && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Not yet registered on-chain. Edit profile and save to register your wallet.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </CardContent>
      </MuiCard>



      {/* Stats placeholder */}
      <MuiCard sx={{ mt: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Activity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Services offered · Requests · Rating — coming soon
          </Typography>
        </CardContent>
      </MuiCard>
    </Box>
  );
}
