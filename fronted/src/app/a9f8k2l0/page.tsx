'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './foro.css';

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
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });
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

    const displayName =
      user.user_metadata?.full_name ||
      user.user_metadata?.display_name ||
      'Usuario';

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
      setNewComentario('');
    }
  };

  const handleAddDebate = async () => {
    if (!newDebateTitle.trim() || !newDebateDescription.trim() || !user) return;

    const displayName =
      user.user_metadata?.full_name ||
      user.user_metadata?.display_name ||
      'Usuario';

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
      setDebates([data, ...debates]);
      setShowNewDebateForm(false);
      setNewDebateTitle('');
      setNewDebateDescription('');
    }
  };

  return (
    <div className="foro-container">
      {/* HEADER */}
      <header className="foro-header">
        <h1>Foro de Debates</h1>
        <div className="foro-header-buttons">
          <button
            className="header-btn new"
            onClick={() => setShowNewDebateForm(true)}
          >
            + Nuevo Debate
          </button>
          <button
            className="header-btn back"
            onClick={() => (window.location.href = '/d3h7m1p4')}
          >
            ← Regresar
          </button>
        </div>
      </header>

      <main className="foro-main">
        {/* LISTA DE DEBATES */}
        {!selectedDebate && !showNewDebateForm && (
          <ul className="debate-list">
            {debates.map((debate) => (
              <li
                key={debate.id}
                className="debate-item"
                onClick={() => handleDebateClick(debate)}
              >
                <h3>{debate.title}</h3>
                <p>{debate.description}</p>
                <small>
                  Por {debate.author} • {new Date(debate.created_at).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        )}

        {/* NUEVO DEBATE */}
        {showNewDebateForm && (
          <div className="new-debate">
            <button
              className="back-btn"
              onClick={() => setShowNewDebateForm(false)}
            >
              ← Volver
            </button>
            <h2>Crear nuevo debate</h2>
            <input
              placeholder="Título del debate"
              value={newDebateTitle}
              onChange={(e) => setNewDebateTitle(e.target.value)}
            />
            <textarea
              placeholder="Descripción del debate"
              value={newDebateDescription}
              onChange={(e) => setNewDebateDescription(e.target.value)}
            />
            <button className="send-btn" onClick={handleAddDebate}>
              Crear Debate
            </button>
          </div>
        )}

        {/* DETALLE DEL DEBATE */}
        {selectedDebate && (
          <div className="debate-detalle">
            <h2>{selectedDebate.title}</h2>
            <p>{selectedDebate.description}</p>
            <small>
              Por {selectedDebate.author} • {new Date(selectedDebate.created_at).toLocaleString()}
            </small>

            <h3>Comentarios</h3>
            <div className="comentarios">
              {comentarios.map((c) => (
                <div key={c.id} className="comentario">
                  <strong>{c.autor}</strong>{' '}
                  <small>{new Date(c.created_at).toLocaleString()}</small>
                  <p>{c.contenido}</p>
                </div>
              ))}
            </div>

            <textarea
              className="comentario-input"
              placeholder="Escribe tu comentario..."
              value={newComentario}
              onChange={(e) => setNewComentario(e.target.value)}
            />
            <div className="comentario-buttons">
              <button className="send-btn" onClick={handleAddComentario}>
                Enviar Comentario
              </button>
              <button
                className="back-btn inline"
                onClick={() => setSelectedDebate(null)}
              >
                Volver a debates
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
