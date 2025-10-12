'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './CSS/Nosotros.css';

const Nosotros: React.FC = () => {
  const router = useRouter();

  return (
    <div className="nosotros-page">
      {/* Header fijo */}
      <header className="nosotros-header">
        <div className="header-left">CandiGo</div>
        <div className="header-right">
          <button
            className="header-btn"
            onClick={() => router.push('/')}
          >
            Inicio
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="nosotros-content">
        <section className="intro">
          <h2>Sobre CandiGo</h2>
          <p>
            Somos <strong>CandiGo</strong>, una aplicación creada para que los ciudadanos tengan acceso a información clara y confiable sobre los candidatos y los procesos electorales.
          </p>
          <p>
            Nuestro objetivo es que puedas conocer, comparar y analizar propuestas de manera sencilla, evitando la desinformación y facilitando decisiones libres y conscientes en cada elección.
          </p>
          <p>
            En <strong>CandiGo</strong> creemos que la democracia se fortalece con ciudadanos informados. Por eso trabajamos para poner a tu alcance información imparcial, accesible y actualizada sobre quiénes son los candidatos, qué proponen y cuáles son sus trayectorias.
          </p>
          <p>
            No buscamos influir en tu voto, sino <strong>dar las herramientas necesarias para que seas tú quien decida</strong>.
          </p>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="nosotros-footer">
        <p>© 2025 CandiGo. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Nosotros;
