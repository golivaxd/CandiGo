// src/app/forgot-password/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://candigo.vercel.app/reset-password', // tu página de reset
    });

    if (error) setMessage('❌ ' + error.message);
    else setMessage('✅ Revisa tu correo para restablecer la contraseña.');
  };

  return (
    <div className="forgot-container">
      <h2>Recuperar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar correo</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
