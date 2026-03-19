/**
 * UI constants. For app-wide limits/settings use config/appSettings.js.
 */
import { limits } from '../config/appSettings.js';

export const RATING_SCALE = { min: limits.ratingMin, max: limits.ratingMax };
export const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
