import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES } from '../../../config/constants.js';
import { UserAbi } from '../../../config/abis/UserAbi.js';
import { User } from '../../../models/index.js';

const address = CONTRACT_ADDRESSES.User;

export function useUserContract(walletAddress) {
  const [contract, setContract] = useState(null);
  const [onChainProfile, setOnChainProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async (wallet) => {
    if (!address || !wallet || !ethers.utils.isAddress(wallet)) {
      setOnChainProfile(null);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const userContract = new ethers.Contract(address, UserAbi, provider);
      const registered = await userContract.isRegistered(wallet);
      if (!registered) {
        setOnChainProfile(null);
        setLoading(false);
        return;
      }
      const raw = await userContract.getProfile(wallet);
      setOnChainProfile(User.fromContract(raw));
    } catch (err) {
      console.warn('useUserContract:', err.message || err);
      // CALL_EXCEPTION = no contract on this network or call reverted → treat as not registered
      const isCallException = err.code === 'CALL_EXCEPTION' || (err.message && err.message.includes('CALL_EXCEPTION'));
      if (isCallException) {
        setOnChainProfile(null);
        setError(null); // Don't show red error; page will show "Not yet registered on-chain"
      } else {
        setError(err.message || 'Failed to load on-chain profile.');
        setOnChainProfile(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile(walletAddress);
  }, [walletAddress, fetchProfile]);

  const registerOnChain = useCallback(async (name, bio) => {
    if (!address || !walletAddress) throw new Error('No contract or wallet');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(address, UserAbi, signer);
    const tx = await userContract.register(name || '', bio || '');
    await tx.wait();
    await fetchProfile(walletAddress);
  }, [walletAddress, fetchProfile]);

  const updateProfileOnChain = useCallback(async (name, bio) => {
    if (!address || !walletAddress) throw new Error('No contract or wallet');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(address, UserAbi, signer);
    const tx = await userContract.updateProfile(name || '', bio || '');
    await tx.wait();
    await fetchProfile(walletAddress);
  }, [walletAddress, fetchProfile]);

  return {
    contractAddress: address,
    onChainProfile,
    loading,
    error,
    isRegisteredOnChain: onChainProfile != null,
    registerOnChain,
    updateProfileOnChain,
    refetch: () => fetchProfile(walletAddress),
  };
}
