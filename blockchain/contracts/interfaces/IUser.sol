// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IUser
 * @notice User registration and profile (SS1). Per class diagram: userId, walletAddress, name, bio, isVerified, createdAt.
 * Email and verification flow are handled off-chain (Firebase/Firestore); on-chain we store minimal profile.
 */
interface IUser {
    struct Profile {
        uint256 userId;
        address walletAddress;
        string name;
        string bio;
        bool isVerified;
        uint256 createdAt;
    }

    /// @notice Register a new user (caller = wallet).
    function register(string calldata name, string calldata bio) external;

    /// @notice Update caller's profile (name, bio).
    function updateProfile(string calldata name, string calldata bio) external;

    /// @notice Set verified flag (admin/verifier only).
    function setVerified(address wallet, bool verified) external;

    /// @notice Get profile by wallet address.
    function getProfile(address wallet) external view returns (Profile memory);

    /// @notice Get wallet address for a user id (for lookup).
    function getWalletByUserId(uint256 userId) external view returns (address);

    /// @notice Check if wallet is registered.
    function isRegistered(address wallet) external view returns (bool);

    /// @notice Placeholder for average rating (can be wired to Rating contract later).
    function getAverageRating(address wallet) external view returns (uint256);
}
