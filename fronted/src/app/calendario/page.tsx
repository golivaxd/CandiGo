'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/app/calendario/calendario.css';
import { useRouter } from 'next/navigation';

// Eventos: clave es fecha en formato 'YYYY-MM-DD'
const eventos: Record<string, string[]> = {
  '2025-10-10': ['Reunión con equipo'],
  '2025-10-15': ['Elecciones federales'],
  '2025-10-20': ['Conferencias oficiales'],
};

function getISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function CalendarioPage() {
  const [value, setValue] = useState<Date | null>(new Date());
  const router = useRouter();

  // Eventos del día seleccionado
  const eventosDelDia = value ? eventos[getISODate(value)] : undefined;

  return (
    <div className="calendar-page">
      <header className="header">
        <button className="back-button" onClick={() => router.push('/dashboard')}>
          Regresar
        </button>
        <h1>Calendario</h1>
        {/* Espacio para alinear contenido, o puedes agregar otro botón */}
        <div style={{width: "1.5rem"}}></div>
      </header>
      <main className="main">
        <Calendar
          onChange={(val) => setValue(val as Date)}
          value={value}
          tileContent={({ date, view }) => {
            if (view === 'month' && eventos[getISODate(date)]) {
              return <span style={{ color: '#2563eb', fontSize: '1.2em' }}>•</span>;
            }
            return null;
          }}
        />
        <p>Fecha seleccionada: {value ? value.toDateString() : 'No hay fecha seleccionada'}</p>
        {eventosDelDia && (
          <div className="eventos-dia">
            <h3>Eventos:</h3>
            <ul>
              {eventosDelDia.map((ev, idx) => (
                <li key={idx}>{ev}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
      
    </div>
  );
}