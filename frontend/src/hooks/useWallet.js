import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { SUPPORTED_CHAIN_ID } from '../config/chains.js';

const STORAGE_KEY = 'onehand_wallet_connected';

function getEthereum() {
  if (typeof window === 'undefined') return null;
  return window.ethereum ?? null;
}

/**
 * Wallet connection via MetaMask / window.ethereum (ethers v5).
 * Returns address, chainId, connect, disconnect, and wrong-network handling.
 */
export function useWallet() {
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ethereum = getEthereum();
  const supportedChainId = SUPPORTED_CHAIN_ID ? Number(SUPPORTED_CHAIN_ID) : null;
  const wrongNetwork = supportedChainId != null && chainId != null && chainId !== supportedChainId;

  const updateAccountAndChain = useCallback(async () => {
    if (!ethereum) return;
    setError(null);
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      const chainIdNum = network.chainId;
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setChainId(chainIdNum);
      } else {
        setAddress(null);
        setChainId(null);
      }
    } catch (err) {
      console.error('useWallet: updateAccountAndChain', err);
      setError(err.message || 'Failed to read wallet');
      setAddress(null);
      setChainId(null);
    }
  }, [ethereum]);

  const connect = useCallback(async () => {
    if (!ethereum) {
      setError('No wallet found. Install MetaMask.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      await updateAccountAndChain();
      if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, '1');
    } catch (err) {
      console.error('useWallet: connect', err);
      setError(err.message || 'Connection failed');
      if (err.code === 4001) setError('Connection rejected');
    } finally {
      setLoading(false);
    }
  }, [ethereum, updateAccountAndChain]);

  const disconnect = useCallback(() => {
    setAddress(null);
    setChainId(null);
    setError(null);
    if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const switchChain = useCallback(async () => {
    if (!ethereum || supportedChainId == null) return;
    setError(null);
    try {
      const hexChainId = `0x${supportedChainId.toString(16)}`;
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
      await updateAccountAndChain();
    } catch (err) {
      console.error('useWallet: switchChain', err);
      setError(err.message || 'Failed to switch network');
    }
  }, [ethereum, supportedChainId, updateAccountAndChain]);

  // Reconnect on load if previously connected
  useEffect(() => {
    if (!ethereum) return;
    const wasConnected = typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY);
    if (wasConnected) {
      updateAccountAndChain();
    }
  }, [ethereum, updateAccountAndChain]);

  // Listen to account and chain changes
  useEffect(() => {
    if (!ethereum) return;
    const onAccountsChanged = () => updateAccountAndChain();
    const onChainChanged = () => updateAccountAndChain();
    ethereum.on('accountsChanged', onAccountsChanged);
    ethereum.on('chainChanged', onChainChanged);
    return () => {
      ethereum.removeListener('accountsChanged', onAccountsChanged);
      ethereum.removeListener('chainChanged', onChainChanged);
    };
  }, [ethereum, updateAccountAndChain]);

  return {
    address,
    chainId,
    isConnected: Boolean(address),
    wrongNetwork: Boolean(wrongNetwork),
    supportedChainId,
    loading,
    error,
    connect,
    disconnect,
    switchChain,
    hasWallet: Boolean(ethereum),
  };
}
