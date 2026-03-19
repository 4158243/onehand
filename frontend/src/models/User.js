/**
 * User model — matches User contract and Firestore profile (docs/class_diagram.puml).
 * Used by SS1 Registration / account feature.
 */

import { UserRole } from './enums.js';

/**
 * User entity: on-chain + Firestore profile.
 * Every user can request and provide services; only isAdmin marks platform admins.
 */
export class User {
  /**
   * @param {Object} data - Plain object (from contract, Firestore, or JSON).
   */
  constructor(data = {}) {
    this.userId = data.userId ?? 0;
    this.walletAddress = data.walletAddress ?? '';
    this.email = data.email ?? '';
    this.name = data.name ?? '';
    this.bio = data.bio ?? '';
    /** Profile image URL (IPFS gateway, Firestore storage, or CDN). */
    this.avatarUrl = data.avatarUrl ?? '';
    this.isAdmin = Boolean(data.isAdmin);
    this.isVerified = Boolean(data.isVerified);
    this.createdAt = data.createdAt;
    this.averageRating = data.averageRating;
  }

  /**
   * Create User from contract struct or Firestore doc (handles BigNumber).
   * @param {Object} raw
   * @returns {User}
   */
  static fromContract(raw) {
    const userId = User._toNum(raw.userId);
    const createdAt = raw.createdAt != null ? User._toNum(raw.createdAt) : undefined;
    const averageRating = raw.averageRating != null ? Number(raw.averageRating) : undefined;
    return new User({
      userId,
      walletAddress: raw.walletAddress ?? '',
      email: raw.email ?? '',
      name: raw.name ?? '',
      bio: raw.bio ?? '',
      avatarUrl: raw.avatarUrl ?? '',
      isAdmin: Boolean(raw.isAdmin),
      isVerified: Boolean(raw.isVerified),
      createdAt,
      averageRating,
    });
  }

  /**
   * Alias for fromContract (same shape from backend).
   */
  static fromContractOrFirestore(raw) {
    return User.fromContract(raw);
  }

  /**
   * Create User from JSON (e.g. JSON.parse or Firestore).
   * @param {Object} json
   * @returns {User}
   */
  static fromJson(json) {
    return new User(json ?? {});
  }

  /**
   * Plain object for JSON.stringify, state, or Firestore.
   * @returns {Object}
   */
  toJson() {
    return {
      userId: this.userId,
      walletAddress: this.walletAddress,
      email: this.email,
      name: this.name,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      isAdmin: this.isAdmin,
      isVerified: this.isVerified,
      createdAt: this.createdAt,
      averageRating: this.averageRating,
    };
  }

  /**
   * Empty user for forms / placeholders.
   * @returns {User}
   */
  static createEmpty() {
    return new User({
      userId: 0,
      walletAddress: '',
      email: '',
      name: '',
      bio: '',
      avatarUrl: '',
      isAdmin: false,
      isVerified: false,
    });
  }

  /** @returns {boolean} */
  isVerifiedUser() {
    return this.isVerified;
  }

  /** @returns {boolean} */
  isAdmin() {
    return this.isAdmin;
  }

  static _toNum(v) {
    return v != null && typeof v.toNumber === 'function' ? v.toNumber() : Number(v ?? 0);
  }
}
