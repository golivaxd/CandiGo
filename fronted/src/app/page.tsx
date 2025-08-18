'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import './CSS/Login.css';    // Estilos del login (form)
import './CSS/layout.css';   // Header y layout

export default function Home() {
  const router = useRouter();

  // Estados para el modo: login o signup o reset
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');

  // Datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // solo para signup
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para login
  const handleLogin = async () => {
    setIsSubmitting(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage('Error: ' + error.message);
    else router.push('/dashboard');
    setIsSubmitting(false);
  };

  // Función para crear cuenta
  const handleSignup = async () => {
    setIsSubmitting(true);
    setMessage('');
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Cuenta creada, revisa tu correo para confirmar.');
    setIsSubmitting(false);
  };

  // Función para reset password
  const handleResetPassword = async () => {
    setIsSubmitting(true);
    setMessage('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/reset-password', // Cambia esta URL según tu app
    });
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Revisa tu correo para restablecer la contraseña.');
    setIsSubmitting(false);
  };

  // Manejador del submit según modo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') await handleLogin();
    else if (mode === 'signup') await handleSignup();
    else if (mode === 'reset') await handleResetPassword();
  };

  return (
    <>
      <header className="header">
        <div className="header-left">CandiGo</div>
        <div className="header-right">
          <button className="header-btn">Botón 1</button>
          <button className="header-btn">Botón 2</button>
        </div>
      </header>

      <div className="main-container">
        {/* Login/signup/reset a la izquierda */}
        <div className="login-container">
          <div className="container">
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
                className="login-button"
                disabled={isSubmitting}
              />
            </form>

            <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>

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

        {/* Imagen + botón a la derecha */}
        <div className="right-container">
          <img
            src="https://www.pngarts.com/files/10/Whatsapp-Emoji-PNG-Download-Image.png"
            alt="Thumb up"
            className="logo-image"
          />
          <button className="download-btn">Descargar</button>
        </div>
      </div>
    </>
  );
}
