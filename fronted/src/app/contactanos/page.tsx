'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './CSS/contactanos.css';

const Contactanos: React.FC = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes integrar tu backend o servicio de email
    setStatus('Mensaje enviado. ¡Gracias por contactarnos!');
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <div className="contact-page">
      {/* Header fijo */}
      <header className="contact-header">
        <div className="header-left">CandiGo</div>
        <div className="header-right">
          <button className="header-btn" onClick={() => router.push('/')}>
            Inicio
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="contact-content">
        <h2>Contáctanos</h2>
        <p>¿Tienes dudas, sugerencias o quieres reportar un error? ¡Escríbenos!</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Escribe tu mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={5}
            required
          />
          <button type="submit" className="send-btn">Enviar</button>
        </form>

        {status && <p className="status-msg">{status}</p>}
      </main>

      {/* Pie de página */}
      <footer className="contact-footer">
        <p>© 2025 CandiGo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Contactanos;
