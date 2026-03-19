// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IUser.sol";

/**
 * @title User
 * @notice On-chain user profile: register, update profile, admin setVerified. Matches docs/class_diagram.puml.
 */
contract User is IUser, Ownable {
    uint256 private _nextUserId = 1;

    mapping(address => IUser.Profile) private _profiles;
    mapping(uint256 => address) private _userIdToWallet;

    address[] private _admins;
    mapping(address => bool) private _isAdmin;

    event Registered(address indexed wallet, uint256 userId);
    event ProfileUpdated(address indexed wallet);
    event VerifiedSet(address indexed wallet, bool verified);
    event AdminSet(address indexed admin, bool added);

    constructor() Ownable(msg.sender) {
        _admins.push(msg.sender);
        _isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(_isAdmin[msg.sender], "User: not admin");
        _;
    }

    function register(string calldata name, string calldata bio) external override {
        require(_profiles[msg.sender].createdAt == 0, "User: already registered");
        uint256 userId = _nextUserId++;
        _profiles[msg.sender] = IUser.Profile({
            userId: userId,
            walletAddress: msg.sender,
            name: name,
            bio: bio,
            isVerified: false,
            createdAt: block.timestamp
        });
        _userIdToWallet[userId] = msg.sender;
        emit Registered(msg.sender, userId);
    }

    function updateProfile(string calldata name, string calldata bio) external override {
        require(_profiles[msg.sender].createdAt != 0, "User: not registered");
        _profiles[msg.sender].name = name;
        _profiles[msg.sender].bio = bio;
        emit ProfileUpdated(msg.sender);
    }

    function setVerified(address wallet, bool verified) external override onlyAdmin {
        require(_profiles[wallet].createdAt != 0, "User: not registered");
        _profiles[wallet].isVerified = verified;
        emit VerifiedSet(wallet, verified);
    }

    function getProfile(address wallet) external view override returns (IUser.Profile memory) {
        return _profiles[wallet];
    }

    function getWalletByUserId(uint256 userId) external view override returns (address) {
        return _userIdToWallet[userId];
    }

    function isRegistered(address wallet) external view override returns (bool) {
        return _profiles[wallet].createdAt != 0;
    }

    function getAverageRating(address /* wallet */) external pure override returns (uint256) {
        return 0;
    }

    function addAdmin(address admin) external onlyOwner {
        require(admin != address(0) && !_isAdmin[admin], "User: invalid admin");
        _admins.push(admin);
        _isAdmin[admin] = true;
        emit AdminSet(admin, true);
    }

    function removeAdmin(address admin) external onlyOwner {
        require(_isAdmin[admin], "User: not admin");
        _isAdmin[admin] = false;
        emit AdminSet(admin, false);
    }

    function isAdmin(address account) external view returns (bool) {
        return _isAdmin[account];
    }
}
