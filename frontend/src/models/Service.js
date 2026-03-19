/**
 * Service model — matches Service contract (docs/class_diagram.puml).
 * Used by SS2 Services feature.
 */

/**
 * Service entity: listing created by provider.
 */
export class Service {
  /**
   * @param {Object} data - Plain object.
   */
  constructor(data = {}) {
    this.serviceId = data.serviceId ?? 0;
    this.userId = data.userId ?? 0;
    this.title = data.title ?? '';
    this.description = data.description ?? '';
    this.price = data.price; // BigNumber or string
    this.category = data.category ?? '';
    this.createdAt = data.createdAt;
    this.isActive = data.isActive !== false && data.isActive !== 0;
    this.averageRating = data.averageRating;
    this.reviewCount = data.reviewCount;
  }

  /**
   * Create Service from contract struct (handles BigNumber for price).
   * @param {Object} raw
   * @returns {Service}
   */
  static fromContract(raw) {
    const serviceId = Service._toNum(raw.serviceId);
    const userId = Service._toNum(raw.userId);
    const createdAt = raw.createdAt != null ? Service._toNum(raw.createdAt) : undefined;
    return new Service({
      serviceId,
      userId,
      title: raw.title ?? '',
      description: raw.description ?? '',
      price: raw.price,
      category: raw.category ?? '',
      createdAt,
      isActive: raw.isActive !== false && raw.isActive !== 0,
      averageRating: raw.averageRating != null ? Number(raw.averageRating) : undefined,
      reviewCount: raw.reviewCount != null ? Number(raw.reviewCount) : undefined,
    });
  }

  /**
   * Create Service from JSON.
   * @param {Object} json
   * @returns {Service}
   */
  static fromJson(json) {
    return new Service(json ?? {});
  }

  /**
   * Plain object for JSON.stringify; price as string (wei) if BigNumber.
   * @returns {Object}
   */
  toJson() {
    return {
      serviceId: this.serviceId,
      userId: this.userId,
      title: this.title,
      description: this.description,
      price: Service._toJsonValue(this.price),
      category: this.category,
      createdAt: this.createdAt,
      isActive: this.isActive,
      averageRating: this.averageRating,
      reviewCount: this.reviewCount,
    };
  }

  /**
   * Empty service for create/edit form.
   * @returns {Service}
   */
  static createEmpty() {
    return new Service({
      title: '',
      description: '',
      price: '',
      category: '',
      isActive: true,
    });
  }

  /** @returns {boolean} */
  isActiveService() {
    return this.isActive;
  }

  static _toNum(v) {
    return v != null && typeof v.toNumber === 'function' ? v.toNumber() : Number(v ?? 0);
  }
  static _toJsonValue(v) {
    if (v == null) return v;
    if (typeof v.toString === 'function' && typeof v.toNumber === 'function') return v.toString();
    return v;
  }
}
