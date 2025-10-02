'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './foro.module.css';

interface Debate {
  id: number;
  title: string;
  author: string;
  created_at: string;
  description: string;
}

interface Comentario {
  id: number;
  debate_id: number;
  autor: string;
  contenido: string;
  created_at: string;
  user_id: string;
}

export default function Foro() {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [selectedDebate, setSelectedDebate] = useState<Debate | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [newComentario, setNewComentario] = useState('');
  const [newDebateTitle, setNewDebateTitle] = useState('');
  const [newDebateDescription, setNewDebateDescription] = useState('');
  const [showNewDebateForm, setShowNewDebateForm] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchDebates();

    // Obtener usuario autenticado
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    // Escuchar cambios de auth
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const fetchDebates = async () => {
    const { data } = await supabase
      .from('debates')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setDebates(data);
  };

  const fetchComentarios = async (debateId: number) => {
    const { data } = await supabase
      .from('comentarios')
      .select('*')
      .eq('debate_id', debateId)
      .order('created_at', { ascending: true });
    if (data) setComentarios(data);
  };

  const handleDebateClick = (debate: Debate) => {
    setSelectedDebate(debate);
    fetchComentarios(debate.id);
  };

  const handleAddComentario = async () => {
    if (!newComentario.trim() || !selectedDebate || !user) return;

    const displayName = user.user_metadata?.full_name || user.user_metadata?.display_name || 'Usuario';

    const { data } = await supabase
      .from('comentarios')
      .insert({
        debate_id: selectedDebate.id,
        autor: displayName,
        contenido: newComentario,
        created_at: new Date().toISOString(),
        user_id: user.id
      })
      .select()
      .single();

    if (data) {
      setComentarios([...comentarios, data]);
      setNewComentario(''); // Limpiar textarea
    }
  };

  const handleAddDebate = async () => {
    if (!newDebateTitle.trim() || !newDebateDescription.trim() || !user) return;

    const displayName = user.user_metadata?.full_name || user.user_metadata?.display_name || 'Usuario';

    const { data } = await supabase
      .from('debates')
      .insert({
        title: newDebateTitle,
        description: newDebateDescription,
        author: displayName,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (data) {
      setDebates([data, ...debates]); // Mostrar nuevo debate de inmediato
      setShowNewDebateForm(false);
      setNewDebateTitle('');       // Limpiar campo
      setNewDebateDescription(''); // Limpiar campo
    }
  };

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Foro de Debates</h1>
        <button onClick={() => window.location.href = '/dashboard'}>← Regresar</button>
      </header>

      {/* LISTA DE DEBATES */}
      {!selectedDebate && !showNewDebateForm && (
        <>
          <button className={styles.newDebateButton} onClick={() => setShowNewDebateForm(true)}>
            + Nuevo Debate
          </button>
          <ul className={styles.debateList}>
            {debates.map((debate) => (
              <li key={debate.id} className={styles.debateItem} onClick={() => handleDebateClick(debate)}>
                <h3 className={styles.debateTitle}>{debate.title}</h3>
                <p className={styles.debateDescription}>{debate.description}</p>
                <small className={styles.debateAuthor}>
                  Por {debate.author} - {new Date(debate.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* FORMULARIO NUEVO DEBATE */}
      {showNewDebateForm && (
        <div>
          <button className={styles.backButton} onClick={() => setShowNewDebateForm(false)}>← Volver</button>
          <h2>Crear nuevo debate</h2>
          <input
            placeholder="Título del debate"
            value={newDebateTitle}
            onChange={(e) => setNewDebateTitle(e.target.value)}
            style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
          />
          <textarea
            placeholder="Descripción"
            value={newDebateDescription}
            onChange={(e) => setNewDebateDescription(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc', minHeight: '80px', marginBottom: '0.5rem' }}
          />
          <button className={styles.newDebateButton} onClick={handleAddDebate}>Crear Debate</button>
        </div>
      )}

      {/* DETALLE DE DEBATE */}
      {selectedDebate && (
        <div>
          <button className={styles.backButton} onClick={() => setSelectedDebate(null)}>← Volver a debates</button>
          <h2 className={styles.debateTitle}>{selectedDebate.title}</h2>
          <p className={styles.debateDescription}>{selectedDebate.description}</p>
          <small className={styles.debateAuthor}>
            Por {selectedDebate.author} - {new Date(selectedDebate.created_at).toLocaleString()}
          </small>

          <h3>Comentarios</h3>
          <div className={styles.comentariosList}>
            {comentarios.map((c) => (
              <div key={c.id} className={styles.comentario}>
                <strong>{c.autor}</strong> <small>{new Date(c.created_at).toLocaleString()}</small>
                <p>{c.contenido}</p>
              </div>
            ))}
          </div>

          <textarea
            className={styles.textareaComentario}
            placeholder="Escribe tu comentario..."
            value={newComentario}
            onChange={(e) => setNewComentario(e.target.value)}
          />
          <button className={styles.buttonComentario} onClick={handleAddComentario}>Enviar comentario</button>
        </div>
      )}


    </div>
  );
}

