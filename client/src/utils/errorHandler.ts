/**
 * Extracts a user-friendly error message from blockchain transaction errors
 */
export function getErrorMessage(error: any): string {
  // User rejected transaction
  if (error.message?.includes('User rejected') || error.message?.includes('rejected')) {
    return 'Transaction rejected by user';
  }

  // Already registered error
  if (
    error.message?.includes('EUSER_ALREADY_REGISTERED') ||
    error.message?.includes('already registered')
  ) {
    return 'User already registered';
  }

  // Not registered error
  if (
    error.message?.includes('EUSER_NOT_REGISTERED') ||
    error.message?.includes('not registered')
  ) {
    return 'User not registered. Please register first.';
  }

  // Insufficient gas
  if (error.message?.includes('gas') || error.message?.includes('insufficient')) {
    return 'Insufficient gas to complete transaction';
  }

  // Network errors
  if (error.message?.includes('network') || error.message?.includes('fetch')) {
    return 'Network error. Please check your connection.';
  }

  // Wallet not connected
  if (error.message?.includes('wallet') || error.message?.includes('account')) {
    return 'Please connect your wallet first';
  }

  // Generic error
  return error.message || 'An unknown error occurred';
}
