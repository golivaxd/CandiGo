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

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <img src={user.user_metadata?.avatar_url || "https://via.placeholder.com/80"} alt="Foto de perfil" className="profile-img"/>
      <h2 className="username">{user.user_metadata?.full_name || "Usuario"}</h2>
      <nav className="nav-menu">
        <button className="nav-btn">Opción 1</button>
        <button className="nav-btn">Opción 2</button>
        <button className="nav-btn">Opción 3</button>
        <button className="nav-btn">Opción 4</button>
        <button className="nav-btn">Opción 5</button>
      </nav>
      <button onClick={async () => { await supabase.auth.signOut(); router.push("https://candigo.vercel.app/"); }} className="logout-btn">
        Cerrar sesión
      </button>
    </aside>
  );
}
