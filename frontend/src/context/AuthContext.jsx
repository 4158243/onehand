import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase.js';
import { appSettings } from '../config/appSettings.js';

const USERS_COLLECTION = 'users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = useCallback(async (uid, email) => {
    if (!db || !uid) return { email: email ?? '', name: '', isVerified: false, walletAddress: '', bio: '', avatarUrl: '' };
    try {
      const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
      const data = snap.data();
      return {
        email: data?.email ?? email ?? '',
        name: data?.name ?? '',
        isVerified: Boolean(data?.isVerified),
        walletAddress: data?.walletAddress ?? '',
        bio: data?.bio ?? '',
        avatarUrl: data?.avatarUrl ?? '',
      };
    } catch {
      return { email: email ?? '', name: '', isVerified: false, walletAddress: '', bio: '', avatarUrl: '' };
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      const profile = await loadUserProfile(firebaseUser.uid, firebaseUser.email ?? '');
      setUser({
        uid: firebaseUser.uid,
        email: profile.email,
        name: profile.name,
        isVerified: profile.isVerified,
        walletAddress: profile.walletAddress,
      });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [loadUserProfile]);

  const login = async (email, password) => {
    if (!auth) throw new Error('Firebase is not configured');
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email, password, name) => {
    if (!auth) throw new Error('Firebase is not configured');
    if (!db) throw new Error('Firestore is not configured');
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, USERS_COLLECTION, cred.user.uid), {
      email: email.trim(),
      name: (name || '').trim(),
      isVerified: false,
      createdAt: serverTimestamp(),
    });
  };

  const verifyCode = async (code) => {
    if (!auth?.currentUser || !db) throw new Error('Not signed in or Firestore not configured');
    const uid = auth.currentUser.uid;
    const trimmed = String(code).trim();
    if (trimmed !== appSettings.verificationCode) {
      throw new Error('Invalid verification code');
    }
    await setDoc(
      doc(db, USERS_COLLECTION, uid),
      { isVerified: true, verifiedAt: serverTimestamp() },
      { merge: true }
    );
    const profile = await loadUserProfile(uid, auth.currentUser?.email ?? '');
    setUser((prev) => (prev ? { ...prev, ...profile } : null));
  };

  const linkWallet = async (walletAddress) => {
    if (!auth?.currentUser || !db) return;
    const uid = auth.currentUser.uid;
    await setDoc(
      doc(db, USERS_COLLECTION, uid),
      { walletAddress: walletAddress || null },
      { merge: true }
    );
    setUser((prev) => (prev ? { ...prev, walletAddress: walletAddress || '' } : null));
  };

  const updateProfileFirestore = async (updates) => {
    if (!auth?.currentUser || !db) throw new Error('Not signed in or Firestore not configured');
    const uid = auth.currentUser.uid;
    const allowed = {};
    if (updates.name !== undefined) allowed.name = String(updates.name).trim();
    if (updates.bio !== undefined) allowed.bio = String(updates.bio).trim();
    if (updates.avatarUrl !== undefined) allowed.avatarUrl = String(updates.avatarUrl).trim();
    if (Object.keys(allowed).length === 0) return;
    await setDoc(doc(db, USERS_COLLECTION, uid), allowed, { merge: true });
    setUser((prev) => (prev ? { ...prev, ...allowed } : null));
  };

  const logout = async () => {
    if (auth) await firebaseSignOut(auth);
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isVerified: Boolean(user?.isVerified),
    loading,
    login,
    logout,
    register,
    verifyCode,
    linkWallet,
    updateProfileFirestore,
    loadUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
