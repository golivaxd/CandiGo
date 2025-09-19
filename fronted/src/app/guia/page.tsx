'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './guia.module.css';

interface GuiaItem {
  id: number;
  tipo: string;
  titulo: string;
  descripcion: string;
  icon: string;
  color_hex: string;
  orden: number;
  eleccion_id: number;
  created_at: string;
}

export default function Guia() {
  const [items, setItems] = useState<GuiaItem[]>([]);

  useEffect(() => {
    fetchGuia();
  }, []);

  const fetchGuia = async () => {
    const { data } = await supabase
      .from('guia_votante')
      .select('*')
      .order('orden', { ascending: true });
    if (data) setItems(data);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Guía del Votante</h1>
        <button onClick={() => window.location.href = '/dashboard'}>← Regresar</button>
      </header>

      <div className={styles.grid}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.card}
            style={{ backgroundColor: item.color_hex || '#eee' }}
          >
            <div className={styles.icon}>
              {item.icon ? <img src={item.icon} alt={item.titulo} /> : '🗳️'}
            </div>
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
            <span className={styles.tipo}>{item.tipo}</span>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        Guía del Votante &copy; 2025
      </footer>
    </div>
  );
}
