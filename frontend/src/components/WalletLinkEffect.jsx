import { useEffect, useRef } from 'react';
import { useAuthContext } from '../context/index.js';
import { useWalletContext } from '../context/index.js';

/**
 * When user is signed in and wallet is connected, link wallet address to their
 * Firestore profile so it's saved even if they didn't have wallet connected during verify.
 */
export function WalletLinkEffect() {
  const { isAuthenticated, user, linkWallet } = useAuthContext();
  const { address } = useWalletContext();
  const linkedRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated || !address || !linkWallet) return;
    if (linkedRef.current === address) return;
    linkedRef.current = address;
    linkWallet(address);
  }, [isAuthenticated, address, linkWallet]);

  return null;
}
