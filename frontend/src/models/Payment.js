/**
 * Payment (Escrow) model — matches Payment contract (docs/class_diagram.puml).
 * Used by SS4 Payments & Escrow. One-to-one with ServiceRequest.
 */

import { PaymentStatus } from './enums.js';

/**
 * Payment / Escrow entity: one per request.
 */
export class Payment {
  /**
   * @param {Object} data - Plain object.
   */
  constructor(data = {}) {
    this.paymentId = data.paymentId ?? 0;
    this.requestId = data.requestId ?? 0;
    this.amount = data.amount; // BigNumber or string
    this.status = data.status ?? PaymentStatus.PENDING;
    this.depositedAt = data.depositedAt;
    this.releasedAt = data.releasedAt;
    this.refundedAt = data.refundedAt;
  }

  /**
   * Create Payment from contract struct.
   * @param {Object} raw
   * @returns {Payment}
   */
  static fromContract(raw) {
    const toNum = (v) => (v != null && typeof v.toNumber === 'function' ? v.toNumber() : Number(v ?? 0));
    return new Payment({
      paymentId: toNum(raw.paymentId),
      requestId: toNum(raw.requestId),
      amount: raw.amount,
      status: toNum(raw.status),
      depositedAt: raw.depositedAt != null ? toNum(raw.depositedAt) : undefined,
      releasedAt: raw.releasedAt != null ? toNum(raw.releasedAt) : undefined,
      refundedAt: raw.refundedAt != null ? toNum(raw.refundedAt) : undefined,
    });
  }

  /**
   * Create Payment from JSON.
   * @param {Object} json
   * @returns {Payment}
   */
  static fromJson(json) {
    return new Payment(json ?? {});
  }

  /**
   * Plain object for JSON.stringify; amount as string (wei) if BigNumber.
   * @returns {Object}
   */
  toJson() {
    return {
      paymentId: this.paymentId,
      requestId: this.requestId,
      amount: Payment._toJsonValue(this.amount),
      status: this.status,
      depositedAt: this.depositedAt,
      releasedAt: this.releasedAt,
      refundedAt: this.refundedAt,
    };
  }

  /**
   * Empty payment for forms.
   * @returns {Payment}
   */
  static createEmpty() {
    return new Payment({
      requestId: 0,
      amount: '0',
      status: PaymentStatus.PENDING,
    });
  }

  /** @returns {boolean} */
  isInEscrow() {
    return this.status === PaymentStatus.IN_ESCROW;
  }

  /** @returns {boolean} */
  isReleased() {
    return this.status === PaymentStatus.RELEASED;
  }

  /** @returns {boolean} */
  isRefunded() {
    return this.status === PaymentStatus.REFUNDED;
  }

  /** Funds are locked (in escrow), not yet released or refunded. */
  isLocked() {
    return this.status === PaymentStatus.IN_ESCROW;
  }

  static _toJsonValue(v) {
    if (v == null) return v;
    if (typeof v.toString === 'function' && typeof v.toNumber === 'function') return v.toString();
    return v;
  }
}
