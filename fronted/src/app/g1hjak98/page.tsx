'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './guia.module.css';

interface GuiaItem {
  id: number;
  titulo: string;
  descripcion: string;
  orden: number;
}

export default function Guia() {
  const [items, setItems] = useState<GuiaItem[]>([]);

  useEffect(() => {
    fetchGuia();
  }, []);

  const fetchGuia = async () => {
    const { data } = await supabase
      .from('guia_votante')
      .select('id,titulo,descripcion,orden')
      .order('orden', { ascending: true });
    if (data) setItems(data);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Guía del Votante</h1>
        <button onClick={() => window.location.href = '/d3h7m1p4'}>Regresar</button>
      </header>

      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <h3>{item.titulo}</h3>
            <p>{item.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

