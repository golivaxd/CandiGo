'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/'); // Redirige al login si no hay sesión
      }
    };

    checkSession();
  }, [router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Dashboard</h1>
      <p>¡Has iniciado sesión correctamente!</p>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.push('/'); // Redirige al login después de cerrar sesión
        }}
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
      >
        Cerrar sesión
      </button>
    </main>
  );
}