/**
 * Shared hook: Firebase Auth + @taibahu.edu.sa, wallet–email link, verified state.
 */
export function useAuth() {
  // TODO: Firebase Auth, restrict to @taibahu.edu.sa, link wallet in Firestore
  return {
    user: null,
    isAuthenticated: false,
    isVerified: false,
    login: () => {},
    logout: () => {},
    register: () => {},
  };
}
