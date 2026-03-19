/**
 * App constants: contract addresses, ABIs path, university domain.
 */
export const TAIBAH_EMAIL_SUFFIX = '@taibahu.edu.sa';
export const CONTRACT_ADDRESSES = {
  User: import.meta.env.VITE_USER_CONTRACT_ADDRESS || '',
  Service: import.meta.env.VITE_SERVICE_CONTRACT_ADDRESS || '',
  ServiceRequest: import.meta.env.VITE_SERVICE_REQUEST_CONTRACT_ADDRESS || '',
  Escrow: import.meta.env.VITE_ESCROW_CONTRACT_ADDRESS || '',
  Rating: import.meta.env.VITE_RATING_CONTRACT_ADDRESS || '',
};
