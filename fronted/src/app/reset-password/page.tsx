'use client';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import './reset.css';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  // Parseamos también el hash (#access_token=...&refresh_token=...&type=recovery)
  const parsed = useMemo(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : '';
    const hashParams = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash);
    const out = {
      code: searchParams.get('code') || hashParams.get('code'),
      type: searchParams.get('type') || hashParams.get('type'),
      access_token: searchParams.get('access_token') || hashParams.get('access_token'),
      refresh_token: searchParams.get('refresh_token') || hashParams.get('refresh_token'),
    };
    console.log('Token extraído:', out);
    return out;
  }, [searchParams]);

  // Establecer sesión desde la URL (hash o code)
  useEffect(() => {
    (async () => {
      try {
        // 1) Proveedor que retorna `code` (PKCE)
        if (parsed.code) {
          await supabase.auth.exchangeCodeForSession(window.location.href);
          setSessionReady(true);
          return;
        }

        // 2) Flujo típico de recuperación de Supabase: access + refresh en hash
        if (parsed.access_token && parsed.refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token: parsed.access_token,
            refresh_token: parsed.refresh_token,
          });
          if (error) throw error;
          setSessionReady(true);
          return;
        }

        // 3) Si el cliente ya detectó la sesión automáticamente
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          setSessionReady(true);
          return;
        }

        // Si no hay nada, avisamos
        setMessage('❌ Token inválido o expirado.');
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
    if (error) setMessage('Error: ' + error.message);
    else {
      setMessage('✅ Contraseña actualizada con éxito. Redirigiendo...');
      setTimeout(() => router.push('/'), 1800);
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p style={{textAlign:'center'}}>Cargando…</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
