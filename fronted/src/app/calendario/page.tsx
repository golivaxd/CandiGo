'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/app/calendario/calendario.css';
import { useRouter } from 'next/navigation';

export default function CalendarioPage() {
  const [value, setValue] = useState(new Date());
  const router = useRouter();

  return (
    <div className="calendar-page">
      <header className="header">
        <button className="back-button" onClick={() => router.push('/menu')}>
          ⬅
        </button>
        <h1>Calendario</h1>
        {/* Espacio para alinear contenido, o puedes agregar otro botón */}
        <div style={{width: "1.5rem"}}></div>
      </header>
      <main className="main">
        <Calendar
          onChange={setValue}
          value={value}
        />
        <p>Fecha seleccionada: {value.toDateString()}</p>
      </main>
      <footer className="footer">
        © 2025 - Mi Aplicación
      </footer>
    </div>
  );
}