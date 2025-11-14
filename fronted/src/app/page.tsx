'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import './CSS/Login.css'; // Estilos del login (form)

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage('Error: ' + error.message);
    else router.push('/d3h7m1p4');
    setIsSubmitting(false);
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    setMessage('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Cuenta creada, revisa tu correo para confirmar.');
    setIsSubmitting(false);
  };

  const handleResetPassword = async () => {
    setIsSubmitting(true);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://candigo.vercel.app/reset-password', // Cambia esta URL según tu app
    });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Revisa tu correo para restablecer la contraseña.');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') await handleLogin();
    else if (mode === 'signup') await handleSignup();
    else if (mode === 'reset') await handleResetPassword();
  };

  return (
    <>
      {/* Header fijo */}
      <header className="header">
        <div className="header-left">CandiGo</div>
        <div className="header-right">
          <button className="header-btn" onClick={() => router.push('/nosotros')}>
            Nosotros
          </button>
          <button className="header-btn" onClick={() => router.push('/contactanos')}>
            Contactanos
          </button>
        </div>
      </header>

      <div className="main-content-area"> {/* Cambiado de main-container a main-content-area para mejor semántica */}
        {/* Login/signup/reset a la izquierda */}
        <div className="auth-form-container"> {/* Cambiado a auth-form-container */}
          <div className="form-card"> {/* Agregado form-card para el estilo de la tarjeta del formulario */}
            <div className="heading">
              {mode === 'login' && '¡Bienvenido!'}
              {mode === 'signup' && 'Crear Cuenta'}
              {mode === 'reset' && 'Restablecer Contraseña'}
            </div>
            <form className="form" onSubmit={handleSubmit}>
              {mode === 'signup' && (
                <input
                  placeholder="Nombre completo"
                  className="input"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setMessage('');
                  }}
                />
              )}
              <input
                placeholder="Correo Electrónico"
                id="email"
                name="email"
                type="email"
                className="input"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                }}
              />
              {(mode === 'login' || mode === 'signup') && (
                <input
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  type="password"
                  className="input"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setMessage('');
                  }}
                />
              )}
              {mode === 'login' && (
                <span className="forgot-password">
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setMode('reset');
                      setMessage('');
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </span>
              )}
              <input
                value={
                  isSubmitting
                    ? mode === 'login'
                      ? 'Iniciando sesión...'
                      : mode === 'signup'
                      ? 'Creando cuenta...'
                      : 'Enviando correo...'
                    : mode === 'login'
                    ? 'Iniciar Sesión'
                    : mode === 'signup'
                    ? 'Crear Cuenta'
                    : 'Enviar correo'
                }
                type="submit"
                className="submit-button" 
                disabled={isSubmitting}
              />
            </form>
            <p style={{ color: '#E74C3C', textAlign: 'center', marginTop: '1rem' }}>{message}</p> {/* Color rojo más específico */}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              {mode === 'login' && (
                <button className="link-btn" onClick={() => setMode('signup')}>
                  Crear una cuenta nueva
                </button>
              )}
              {(mode === 'signup' || mode === 'reset') && (
                <button className="link-btn" onClick={() => setMode('login')}>
                  Volver a iniciar sesión
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sección de Bienvenida Visual a la derecha */}
        <div className="welcome-visual-container"> {/* Cambiado a welcome-visual-container */}
          <div className="welcome-content">
            <h1 className="welcome-title">Tu Voz, Tu Futuro</h1>
            <p className="welcome-subtitle">
              Participa en elecciones transparentes y seguras.
            </p>
            {/* Puedes mantener tu logo si encaja, o usar una ilustración general */}
            <img src="/LogoSolo.png" alt="CandiGo Logo" className="welcome-image" /> 
            {/* El botón de descarga ahora es más un CTA complementario */}
<button
  className="welcome-cta-button"
  onClick={() => {
    window.location.href = "https://github.com/Richards117/mi-app-votacion/releases/download/v1.0.0/app-release.apk";
  }}
>
  Descargar Nuestra App
</button>

          </div>
        </div>
      </div>
    </>
  );
}