'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
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
    <>
      <Head>
        {/* Fuentes modernas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="faq-page">
        {/* Header fijo */}
        <header className="faq-header">
          <h1>Preguntas Frecuentes</h1>
          <button className="back-btn" onClick={() => router.push('/d3h7m1p4')}>
            Regresar
          </button>
        </header>

        {/* Contenido principal */}
        <main className="faq-container">
          <div className="faq-list">
            {faqs.length === 0 ? (
              <p className="no-faq">No hay preguntas frecuentes disponibles.</p>
            ) : (
              faqs.map((faq, idx) => (
                <div key={faq.id} className={`faq-item ${openIndex === idx ? 'active' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  >
                    {faq.question}
                    <span className="faq-icon">{openIndex === idx ? '−' : '+'}</span>
                  </button>
                  <div
                    className="faq-answer"
                    style={{ maxHeight: openIndex === idx ? '200px' : '0' }}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="faq-footer">
          <p>© 2025 CandiGo. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}