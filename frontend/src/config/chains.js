/**
 * Chain config (e.g. Taibah / target chain ID for wallet).
 */
export const SUPPORTED_CHAIN_ID = import.meta.env.VITE_CHAIN_ID || 0;
export const CHAIN_NAMES = { [SUPPORTED_CHAIN_ID]: 'Target Chain' };
