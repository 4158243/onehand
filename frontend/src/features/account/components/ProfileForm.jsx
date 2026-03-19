import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { Button } from '../../../components/index.js';
import { limits } from '../../../config/appSettings.js';
import { timeouts } from '../../../config/appSettings.js';
import { uploadFileToIpfs } from '../../../utils/ipfs.js';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const ACCEPT_IMAGES = 'image/jpeg,image/png,image/webp,image/gif';
const AVATAR_SIZE = 120;

/**
 * Edit form: avatar (with change overlay), name, bio. Save to Firestore + optional on-chain.
 * @param {string} initialName
 * @param {string} initialBio
 * @param {string} [initialAvatarUrl]
 * @param {function} onSave - (name, bio, avatarUrl) => Promise
 * @param {function} [onCancel]
 * @param {boolean} saving
 * @param {boolean} [disabled]
 */
export function ProfileForm({
  initialName = '',
  initialBio = '',
  initialAvatarUrl = '',
  onSave,
  onCancel,
  saving = false,
  disabled = false,
}) {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setName(initialName);
    setBio(initialBio);
    setAvatarUrl(initialAvatarUrl || '');
  }, [initialName, initialBio, initialAvatarUrl]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPEG, PNG, WebP, or GIF).');
      return;
    }
    if (file.size > limits.avatarMaxBytes) {
      setError(`Image must be under ${Math.round(limits.avatarMaxBytes / 1024 / 1024)} MB.`);
      return;
    }
    setUploading(true);
    try {
      const url = await uploadFileToIpfs(file, timeouts.uploadTimeoutMs);
      setAvatarUrl(url);
    } catch (err) {
      setError(err?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name is required.');
      return;
    }
    if (bio.length > limits.bioMaxLength) {
      setError(`Bio must be at most ${limits.bioMaxLength} characters.`);
      return;
    }
    try {
      await onSave(trimmedName, bio.trim(), avatarUrl.trim());
    } catch (err) {
      setError(err?.message || 'Failed to save profile.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Avatar with change overlay */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_IMAGES}
            onChange={handleFileChange}
            disabled={disabled || uploading}
            style={{ display: 'none' }}
            id="profile-avatar-upload"
          />
          <Box
            component="label"
            htmlFor="profile-avatar-upload"
            sx={{
              position: 'relative',
              cursor: disabled || uploading ? 'default' : 'pointer',
              display: 'inline-block',
            }}
          >
            <Avatar
              src={avatarUrl || undefined}
              alt="Profile"
              sx={{
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                fontSize: '2.5rem',
                border: '4px solid',
                borderColor: 'background.paper',
                boxShadow: 2,
              }}
            />
            {!disabled && !uploading && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 1 },
                }}
              >
                <IconButton
                  component="span"
                  sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.2)' }}
                >
                  <PhotoCamera fontSize="large" />
                </IconButton>
              </Box>
            )}
            {uploading && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  bgcolor: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  typography: 'caption',
                  color: 'white',
                }}
              >
                Uploading…
              </Box>
            )}
          </Box>
        </Box>
        <Box component="span" sx={{ textAlign: 'center', display: 'block', typography: 'caption', color: 'text.secondary' }}>
          Click photo to change · Max {Math.round(limits.avatarMaxBytes / 1024 / 1024)} MB (IPFS)
        </Box>

        <TextField
          label="Display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          disabled={disabled}
          inputProps={{ maxLength: 120 }}
          helperText={`${name.length}/120`}
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          multiline
          rows={4}
          fullWidth
          disabled={disabled}
          placeholder="Tell others a bit about you…"
          inputProps={{ maxLength: limits.bioMaxLength }}
          helperText={`${bio.length}/${limits.bioMaxLength}`}
        />
        <TextField
          label="Or paste image URL (optional)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          fullWidth
          disabled={disabled}
          placeholder="https://... or IPFS link"
          size="small"
        />

        {error && (
          <Box sx={{ color: 'error.main', typography: 'body2' }}>{error}</Box>
        )}

        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          {onCancel && (
            <Button type="button" variant="outlined" onClick={onCancel} disabled={saving}>
              Cancel
            </Button>
          )}
          <Button type="submit" loading={saving} disabled={disabled}>
            Save profile
          </Button>
        </Box>
      </Box>
    </form>
  );
}
