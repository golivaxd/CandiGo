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
      <img
        src={user.user_metadata?.avatar_url || "https://via.placeholder.com/80"}
        alt="Foto de perfil"
        className="profile-img"
      />
      <h2 className="username">{user.user_metadata?.full_name || "Usuario"}</h2>
      <nav className="nav-menu">
             
        <button className="nav-btn" onClick={() => router.push('/noticias')}>Noticias</button>
        <button className="nav-btn" onClick={() => router.push('/preguntas')}>Preguntas</button>
        <button className="nav-btn" onClick={() => router.push('/votaciones')}>Votar</button>
        <button className="nav-btn" onClick={() => router.push('/mapa')}>Mapa</button>
        <button className="nav-btn" onClick={() => router.push('/calendario')}>Calendario</button>
        <button className="nav-btn" onClick={() => router.push('/foro')}>Debate</button>
        <button className="nav-btn" onClick={() => router.push('/guia')}>Guia</button>
      </nav>
    </aside>
  );
}
