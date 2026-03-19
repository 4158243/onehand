/**
 * ServiceRequest model — matches ServiceRequest contract (docs/class_diagram.puml).
 * Used by SS3 Requests and SS5 Delivery. Linked to Payment/Escrow.
 */

import { RequestStatus } from './enums.js';

/**
 * Service request entity: requester asks for a service; provider accepts/declines/delivers.
 */
export class ServiceRequest {
  /**
   * @param {Object} data - Plain object.
   */
  constructor(data = {}) {
    this.requestId = data.requestId ?? 0;
    this.serviceId = data.serviceId ?? 0;
    this.requesterUserId = data.requesterUserId ?? 0;
    this.status = data.status ?? RequestStatus.PENDING;
    this.createdAt = data.createdAt;
    this.acceptedAt = data.acceptedAt;
    this.deliveredAt = data.deliveredAt;
    this.completedAt = data.completedAt;
    this.deliveryIpfsHash = data.deliveryIpfsHash ?? '';
    this.providerUserId = data.providerUserId;
  }

  /**
   * Create ServiceRequest from contract struct.
   * @param {Object} raw
   * @returns {ServiceRequest}
   */
  static fromContract(raw) {
    const toNum = (v) => (v != null && typeof v.toNumber === 'function' ? v.toNumber() : Number(v ?? 0));
    return new ServiceRequest({
      requestId: toNum(raw.requestId),
      serviceId: toNum(raw.serviceId),
      requesterUserId: toNum(raw.requesterUserId),
      status: toNum(raw.status),
      createdAt: raw.createdAt != null ? toNum(raw.createdAt) : undefined,
      acceptedAt: raw.acceptedAt != null ? toNum(raw.acceptedAt) : undefined,
      deliveredAt: raw.deliveredAt != null ? toNum(raw.deliveredAt) : undefined,
      completedAt: raw.completedAt != null ? toNum(raw.completedAt) : undefined,
      deliveryIpfsHash: raw.deliveryIpfsHash ?? '',
      providerUserId: raw.providerUserId != null ? toNum(raw.providerUserId) : undefined,
    });
  }

  /**
   * Create ServiceRequest from JSON.
   * @param {Object} json
   * @returns {ServiceRequest}
   */
  static fromJson(json) {
    return new ServiceRequest(json ?? {});
  }

  /**
   * Plain object for JSON.stringify / state.
   * @returns {Object}
   */
  toJson() {
    return {
      requestId: this.requestId,
      serviceId: this.serviceId,
      requesterUserId: this.requesterUserId,
      status: this.status,
      createdAt: this.createdAt,
      acceptedAt: this.acceptedAt,
      deliveredAt: this.deliveredAt,
      completedAt: this.completedAt,
      deliveryIpfsHash: this.deliveryIpfsHash,
      providerUserId: this.providerUserId,
    };
  }

  /**
   * Empty request for forms.
   * @returns {ServiceRequest}
   */
  static createEmpty() {
    return new ServiceRequest({
      serviceId: 0,
      requesterUserId: 0,
      status: RequestStatus.PENDING,
    });
  }

  /** @returns {boolean} */
  isPending() {
    return this.status === RequestStatus.PENDING;
  }

  /** @returns {boolean} */
  isDelivered() {
    return this.status === RequestStatus.DELIVERED;
  }

  /** @returns {boolean} */
  isCompleted() {
    return this.status === RequestStatus.COMPLETED;
  }

  /** Requester can confirm completion when status is DELIVERED. */
  canConfirmCompletion() {
    return this.status === RequestStatus.DELIVERED;
  }

  /** Provider can submit delivery when accepted and in progress. */
  canSubmitDelivery() {
    return this.status === RequestStatus.ACCEPTED || this.status === RequestStatus.IN_PROGRESS;
  }

  /** @returns {boolean} */
  hasDelivery() {
    return Boolean(this.deliveryIpfsHash);
  }
}
