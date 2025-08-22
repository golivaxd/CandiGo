'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './reset.css';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Supabase envía access_token y refresh_token en el hash
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.slice(1));
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (error) throw error;
          setSessionReady(true);
        } else {
          setMessage('❌ Token inválido o expirado.');
        }
      } catch (err: any) {
        setMessage(`❌ ${err.message || 'No se pudo validar el enlace.'}`);
      }
    })();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionReady) {
      setMessage('❌ Aún no se ha validado el enlace. Refresca la página o solicita otro correo.');
      return;
    }
    if (password !== confirm) {
      setMessage('⚠️ Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage('Error: ' + error.message);
    } else {
      setMessage('✅ Contraseña actualizada con éxito. Redirigiendo...');
      setTimeout(() => router.push('/'), 2000);
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
