/**
 * Rating model — matches Rating contract (docs/class_diagram.puml).
 * Used by SS6 Ratings & Reviews.
 */

/**
 * Rating entity: requester rates service after completion.
 */
export class Rating {
  /**
   * @param {Object} data - Plain object.
   */
  constructor(data = {}) {
    this.ratingId = data.ratingId ?? 0;
    this.userId = data.userId ?? 0;
    this.serviceId = data.serviceId ?? 0;
    this.rating = data.rating ?? 0;
    this.comment = data.comment ?? '';
    this.createdAt = data.createdAt;
  }

  /**
   * Create Rating from contract struct.
   * @param {Object} raw
   * @returns {Rating}
   */
  static fromContract(raw) {
    const toNum = (v) => (v != null && typeof v.toNumber === 'function' ? v.toNumber() : Number(v ?? 0));
    const userId = raw.userId != null ? (typeof raw.userId?.toNumber === 'function' ? raw.userId.toNumber() : raw.userId) : 0;
    return new Rating({
      ratingId: toNum(raw.ratingId),
      userId,
      serviceId: toNum(raw.serviceId),
      rating: toNum(raw.rating),
      comment: raw.comment ?? '',
      createdAt: raw.createdAt != null ? toNum(raw.createdAt) : undefined,
    });
  }

  /**
   * Create Rating from JSON.
   * @param {Object} json
   * @returns {Rating}
   */
  static fromJson(json) {
    return new Rating(json ?? {});
  }

  /**
   * Plain object for JSON.stringify / state.
   * @returns {Object}
   */
  toJson() {
    return {
      ratingId: this.ratingId,
      userId: this.userId,
      serviceId: this.serviceId,
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt,
    };
  }

  /**
   * Empty rating for submit form.
   * @returns {Rating}
   */
  static createEmpty() {
    return new Rating({
      serviceId: 0,
      requestId: undefined,
      rating: 0,
      comment: '',
    });
  }

  /** @returns {boolean} */
  hasComment() {
    return Boolean(this.comment?.trim());
  }
}
