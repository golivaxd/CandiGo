'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import './CSS/preguntas.css';

type Faq = {
  id: number;
  question: string;
  answer: string;
};

export default function PreguntasPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  // Cargar FAQs desde Supabase
  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error cargando FAQs:', error.message);
      } else {
        setFaqs(data || []);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <div className="faq-page">
      {/* Header fijo */}
      <header className="faq-header">
        <button className="back-btn" onClick={() => router.push('/dashboard')}>
          ⬅ Volver
        </button>
        <h1>Preguntas Frecuentes</h1>
      </header>

      {/* Contenido principal */}
      <main className="faq-container">
        <div className="faq-list">
          {faqs.length === 0 ? (
            <p>No hay preguntas frecuentes disponibles.</p>
          ) : (
            faqs.map((faq, idx) => (
              <div key={faq.id} className="faq-item">
                <button
                  className="faq-question"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  {faq.question}
                </button>
                {openIndex === idx && <p className="faq-answer">{faq.answer}</p>}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="faq-footer">
        <p>© 2025 Candigo - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
