'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './reset.css';   // 👈 Importamos estilos

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Chequear si llegó el token de Supabase
  useEffect(() => {
    const access_token = searchParams.get('access_token');
    if (!access_token) {
      setMessage('❌ Token inválido o expirado.');
    }
  }, [searchParams]);

  // Función para actualizar la contraseña
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage('⚠️ Las contraseñas no coinciden.');
      return;
    }
    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('✅ Contraseña actualizada con éxito. Redirigiendo...');
      setTimeout(() => router.push('/'), 2000); // redirigir al login
    }

    setIsSubmitting(false);
  };

  return (
    <div className="reset-container">
      <h2 className="reset-heading">Restablecer Contraseña</h2>

      <form onSubmit={handleReset} className="reset-form">
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="input"
        />

        <button type="submit" className="reset-button" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Actualizar contraseña'}
        </button>
      </form>

      {message && <p className="reset-message">{message}</p>}
    </div>
  );
}
