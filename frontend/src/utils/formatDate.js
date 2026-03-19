/**
 * Format Unix timestamp for display.
 */
export function formatDate(timestamp, options = {}) {
  if (timestamp == null) return '';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleDateString(options.locale, options);
}

export function formatDateTime(timestamp) {
  return formatDate(timestamp, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
