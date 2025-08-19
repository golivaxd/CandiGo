'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import "./reset.css";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const access_token = searchParams.get("access_token");
    if (!access_token) {
      setMessage("Token inválido o expirado.");
    }
  }, [searchParams]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }
    setIsSubmitting(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("✅ Contraseña actualizada con éxito. Ya puedes iniciar sesión.");
      setTimeout(() => router.push("/"), 2000);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container">
      <h2 className="heading">Restablecer Contraseña</h2>
      <form onSubmit={handleReset} className="form">
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
        <button type="submit" className="login-button" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Actualizar contraseña"}
        </button>
      </form>
      <p style={{ color: "red", marginTop: "1rem" }}>{message}</p>
    </div>
  );
}
