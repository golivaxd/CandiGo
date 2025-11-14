'use client';
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

export default function Sidebar({ user, sidebarOpen, setSidebarOpen }: {
  user: User;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}) {
  const router = useRouter();

  // Función para navegar y cerrar sidebar en móviles
  const handleNav = (path: string) => {
    router.push(path);
    setSidebarOpen(false);
  }

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <img src="/perfil.png" alt="perfil" className="profile-img" />

      <h2 className="username">{user.user_metadata?.full_name || "Usuario"}</h2>
      <nav className="nav-menu">
        <button className="nav-btn" onClick={() => router.push('/nug1270o')}>Noticias</button>
        <button className="nav-btn" onClick={() => router.push('/b4g8x9z2')}>Preguntas</button>
        <button className="nav-btn" onClick={() => router.push('/votaciones')}>Votar</button>
        <button className="nav-btn" onClick={() => router.push('/m12osdhk')}>Mapa</button>
        <button className="nav-btn" onClick={() => router.push('/r9t2u5v1')}>Calendario</button>
        <button className="nav-btn" onClick={() => router.push('/a9f8k2l0')}>Debate</button>
        <button className="nav-btn" onClick={() => router.push('/g1hjak98')}>Guía</button>
      </nav>
    </aside>
  );
}
