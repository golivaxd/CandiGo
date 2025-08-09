'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import './CSS/d.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);  // nuevo estado

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');  // Mejor que '/' si usas login separado
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  if (loading) {
    return <p>Cargando...</p>;  // O spinner, mientras valida sesión
  }

  if (!user) {
    return null; // Por seguridad, no renderizar dashboard sin usuario
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <img
          src={user.user_metadata?.avatar_url || 'https://via.placeholder.com/80'}
          alt="Foto de perfil"
          className="profile-img"
        />
        <h2 className="username">{user.user_metadata?.full_name || 'Usuario'}</h2>

        <nav className="nav-menu">
          <button className="nav-btn">Opción 1</button>
          <button className="nav-btn">Opción 2</button>
          <button className="nav-btn">Opción 3</button>
          <button className="nav-btn">Opción 4</button>
          <button className="nav-btn">Opción 5</button>
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('https://candigo.vercel.app/');
          }}
          className="logout-btn"
        >
          Cerrar sesión
        </button>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        <h1>Bienvenido al Dashboard</h1>
        <p>¡Has iniciado sesión correctamente!</p>
      </main>
    </div>
  );
}
