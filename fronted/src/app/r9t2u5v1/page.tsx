'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendario.css';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Evento {
  id: number;
  number?: number;
  titulo: string;
  categoria?: string;
  descripcion: string;
  fecha: string; // ISO
  created_at?: string;
  user_id: string;
}

function getISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function CalendarioPage({ userId }: { userId: string }) {
  const [value, setValue] = useState<Date | null>(new Date());
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoDescripcion, setNuevoDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Obtener eventos desde Supabase
  const fetchEventos = async () => {
    const { data, error } = await supabase
      .from('eventos')
      .select('*')
      .order('fecha', { ascending: true });
    if (error) {
      console.error('Error al obtener eventos:', error);
      return;
    }
    if (data) setEventos(data as Evento[]);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const eventosDelDia = value
    ? eventos.filter((ev) => ev.fecha === getISODate(value))
    : [];

  // Agregar evento
  const agregarEvento = async () => {
    if (!value || !nuevoTitulo) {
      alert('Completa todos los campos');
      return;
    }

    setLoading(true);
    const fechaISO = getISODate(value);

    const { data, error } = await supabase
      .from('eventos')
      .insert([
        {
          titulo: nuevoTitulo,
          descripcion: nuevoDescripcion,
          fecha: fechaISO,
          categoria: 'personal',
          user_id: userId,
        },
      ])
      .select() as any; // <-- importante para devolver el registro insertado

    setLoading(false);

    if (error) {
      console.error('Error al insertar evento:', error);
      alert('No se pudo agregar el evento');
      return;
    }

    if (data) {
      setEventos([...eventos, ...data]);
      setNuevoTitulo('');
      setNuevoDescripcion('');
    }
  };

  return (
    <div className="calendar-page">
      <header className="header">
        <h1>Calendario</h1>
        <button className="back-button" onClick={() => router.push('/dashboard')}>
          Regresar
        </button>
        <div style={{ width: '1.5rem' }} />
      </header>

      <main className="main">
        <Calendar
          onChange={(val) => setValue(val as Date)}
          value={value}
          tileContent={({ date, view }) => {
            if (view === 'month' && eventos.some((ev) => ev.fecha === getISODate(date))) {
              return <span style={{ color: '#2563eb', fontSize: '1.2em' }}>•</span>;
            }
            return null;
          }}
        />

        <p>
  Fecha seleccionada: {value ? value.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'No hay fecha seleccionada'}
</p>


        {eventosDelDia.length > 0 && (
          <div className="eventos-dia">
            <h3>Eventos del día:</h3>
            <ul>
              {eventosDelDia.map((ev) => (
                <li key={ev.id}>
                  <strong>{ev.titulo}</strong>: {ev.descripcion} {ev.user_id === userId && '(Tuyo)'}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="nuevo-evento">
          <h3>Agregar evento</h3>
          <input
            type="text"
            placeholder="Título"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
          <textarea
            placeholder="Descripción"
            value={nuevoDescripcion}
            onChange={(e) => setNuevoDescripcion(e.target.value)}
          />
          <button onClick={agregarEvento} disabled={loading}>
            {loading ? 'Agregando...' : 'Agregar'}
          </button>
        </div>
      </main>
    </div>
  );
}
