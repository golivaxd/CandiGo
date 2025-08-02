'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error obteniendo la sesión:', error);
      } else {
        setSession(session);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      data?.subscription?.unsubscribe(); // Acceso correcto a la propiedad subscription
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage('Error: ' + error.message);
        console.error('Error al iniciar sesión:', error);
      } else {
        setMessage('Inicio de sesión exitoso.');
      }
    } catch (err) {
      console.error('Error inesperado:', err);
      setMessage('Ocurrió un error inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Login con Supabase</h1>
      {session ? (
        <>
          <p className="mb-2">Bienvenido, {session.user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <form onSubmit={handleLogin} className="flex flex-col items-center gap-2">
          <input
            type="email"
            placeholder="Tu correo"
            className="border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Tu contraseña"
            className="border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      )}
      <p className="mt-4">{message}</p>
    </main>
  );
}
