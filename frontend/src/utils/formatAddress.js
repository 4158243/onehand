/**
 * Format wallet address for display (e.g. 0x1234...5678).
 */
export function formatAddress(address, chars = 6) {
  if (!address || typeof address !== 'string') return '';
  if (address.length <= chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
