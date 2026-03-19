import React from 'react';
import { useAuthContext } from '../../../context/index.js';
import { AuthPageShell } from '../components/AuthPageShell.jsx';
import { LoginForm } from '../components/LoginForm.jsx';

export function LoginPage() {
  const { login } = useAuthContext();

  return (
    <AuthPageShell
      title="Sign in"
      subtitle="Use your Taibah University email to continue."
    >
      <LoginForm onLogin={login} />
    </AuthPageShell>
  );
}
