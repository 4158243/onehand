import React from 'react';
import MuiDialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { Button } from './Button.jsx';

/**
 * Shared modal (dialog) with title, content, and optional actions.
 * @param {boolean} open
 * @param {function} onClose
 * @param {string} [title]
 * @param {React.ReactNode} [children] - main content
 * @param {React.ReactNode} [actions] - footer buttons
 * @param {string} [maxWidth='sm'] - 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
 * @param {boolean} [showCloseButton=true] - X in title bar
 * @param {object} [props] - rest passed to MUI Dialog
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = 'sm',
  showCloseButton = true,
  ...props
}) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={maxWidth !== false}
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
      {...props}
    >
      {title && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}>
          <span>{title}</span>
          {showCloseButton && (
            <IconButton
              aria-label="Close"
              onClick={onClose}
              size="small"
              sx={{ ml: 1 }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}
      {children != null && (
        <DialogContent dividers={!!actions}>
          {typeof children === 'string' ? (
            <DialogContentText>{children}</DialogContentText>
          ) : (
            children
          )}
        </DialogContent>
      )}
      {actions && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          {actions}
        </DialogActions>
      )}
    </MuiDialog>
  );
}

/**
 * Confirmation modal: message + Cancel / Confirm buttons.
 */
export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmColor = 'primary',
  loading = false,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      actions={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant="contained"
            color={confirmColor}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </Box>
      }
    >
      {message}
    </Modal>
  );
}

export default Modal;
