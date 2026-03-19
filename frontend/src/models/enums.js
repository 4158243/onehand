/**
 * Enums matching smart contract definitions (docs/class_diagram.puml).
 * Values align with Solidity enum ordinal (0-based).
 */

/** @enum {number} Request lifecycle status (ServiceRequest contract) */
export const RequestStatus = Object.freeze({
  PENDING: 0,
  ACCEPTED: 1,
  DECLINED: 2,
  IN_PROGRESS: 3,
  DELIVERED: 4,
  COMPLETED: 5,
  DISPUTED: 6,
});

/** @enum {number} Payment/Escrow status (Payment contract) */
export const PaymentStatus = Object.freeze({
  PENDING: 0,
  IN_ESCROW: 1,
  RELEASED: 2,
  REFUNDED: 3,
});

/** Only distinct role: Admin. Every user can both request and provide services. */
export const UserRole = Object.freeze({
  ADMIN: 'ADMIN',
});

/**
 * Get UserRole label for display (e.g. "Admin").
 * @param {string} value
 * @returns {string}
 */
export function getUserRoleLabel(value) {
  const labels = {
    [UserRole.ADMIN]: 'Admin',
  };
  return labels[value] ?? value ?? 'Unknown';
}

/**
 * Get RequestStatus label for display.
 * @param {number} value
 * @returns {string}
 */
export function getRequestStatusLabel(value) {
  const labels = {
    [RequestStatus.PENDING]: 'Pending',
    [RequestStatus.ACCEPTED]: 'Accepted',
    [RequestStatus.DECLINED]: 'Declined',
    [RequestStatus.IN_PROGRESS]: 'In Progress',
    [RequestStatus.DELIVERED]: 'Delivered',
    [RequestStatus.COMPLETED]: 'Completed',
    [RequestStatus.DISPUTED]: 'Disputed',
  };
  return labels[value] ?? 'Unknown';
}

/**
 * Get PaymentStatus label for display.
 * @param {number} value
 * @returns {string}
 */
export function getPaymentStatusLabel(value) {
  const labels = {
    [PaymentStatus.PENDING]: 'Pending',
    [PaymentStatus.IN_ESCROW]: 'In Escrow',
    [PaymentStatus.RELEASED]: 'Released',
    [PaymentStatus.REFUNDED]: 'Refunded',
  };
  return labels[value] ?? 'Unknown';
}
