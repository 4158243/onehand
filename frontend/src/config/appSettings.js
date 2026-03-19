/**
 * One Hand — app settings and constants.
 * Single place for feature flags, limits, and app-wide config.
 */

/** App identity */
export const appSettings = Object.freeze({
  appName: 'One Hand',
  appTagline: 'Taibah University — Exchange services with escrow',
  universityName: 'Taibah University',
  supportEmail: 'support@taibahu.edu.sa',
  /** Virtual/demo email verification code (user enters this instead of real email link). */
  verificationCode: '123456',
});

/** Feature flags (enable/disable features) */
export const featureFlags = Object.freeze({
  enableAdmin: true,
  enableRatings: true,
  enableIPFSDelivery: true,
});

/** Validation / limits (align with contracts and NFRs) */
export const limits = Object.freeze({
  /** Max file size for IPFS delivery (bytes) — e.g. 10 MB */
  maxUploadBytes: 10 * 1024 * 1024,
  /** Max avatar image size (bytes) — e.g. 2 MB */
  avatarMaxBytes: 2 * 1024 * 1024,
  /** Rating scale (e.g. 1–5 stars) */
  ratingMin: 1,
  ratingMax: 5,
  /** Profile / service text max lengths */
  titleMaxLength: 120,
  descriptionMaxLength: 2000,
  bioMaxLength: 500,
  commentMaxLength: 500,
});

/** UI / UX */
export const uiSettings = Object.freeze({
  /** Toast / snackbar auto-hide (ms) */
  snackbarDuration: 4000,
  /** Debounce for search (ms) */
  searchDebounceMs: 300,
  /** Items per page for lists */
  defaultPageSize: 12,
});

/** Timeouts / performance (ms) — align with NFRs */
export const timeouts = Object.freeze({
  /** Expected max tx confirmation time */
  txConfirmationMs: 30000,
  /** Request timeout for IPFS upload */
  uploadTimeoutMs: 15000,
});

export default appSettings;
