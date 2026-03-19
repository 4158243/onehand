import React from 'react';
import { useAuthContext } from '../../../context/index.js';
import { AuthPageShell } from '../components/AuthPageShell.jsx';
import { RegisterForm } from '../components/RegisterForm.jsx';

export function RegisterPage() {
  const { register } = useAuthContext();

  return (
    <AuthPageShell
      title="Create account"
      subtitle="Use your Taibah University email to join One Hand."
    >
      <RegisterForm onRegister={register} />
    </AuthPageShell>
  );
}
