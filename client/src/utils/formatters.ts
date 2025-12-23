import { formatDistanceToNow } from 'date-fns';

/**
 * Shortens an address to display format (0x1234...5678)
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  if (address.length < chars * 2 + 2) return address;

  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Formats a timestamp to relative time (e.g., "2 hours ago")
 */
export function formatTimestamp(timestamp: number): string {
  // Convert seconds to milliseconds
  const date = new Date(timestamp * 1000);
  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Formats a timestamp to a full date string
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
