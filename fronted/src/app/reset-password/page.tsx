'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './reset.css';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Extrae access_token y refresh_token de query o hash
  const parsed = useMemo(() => {
    if (typeof window === 'undefined') return {};
    // Primero intenta obtener de query params
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');
    // Si no están en query, intenta obtener del hash
    if (access_token && refresh_token) {
      return { access_token, refresh_token };
    }
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    return {
      access_token: access_token || hashParams.get('access_token'),
      refresh_token: refresh_token || hashParams.get('refresh_token'),
      type: hashParams.get('type'),
    };
  }, [searchParams]);

  // Establecer sesión desde el token del link
  useEffect(() => {
    (async () => {
      try {
        if (parsed.access_token && parsed.refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token: parsed.access_token,
            refresh_token: parsed.refresh_token,
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
  }, [parsed]);

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
      setMessage('❌ ' + error.message);
    } else {
      setMessage('✅ Contraseña actualizada con éxito. Redirigiendo...');
      setTimeout(() => router.push('/login'), 1500);
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
        />
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Actualizar contraseña'}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
