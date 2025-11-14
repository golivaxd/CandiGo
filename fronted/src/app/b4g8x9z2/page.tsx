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
  category: string;
};

export default function PreguntasPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('category', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error cargando FAQs:', error.message);
      } else {
        setFaqs(data || []);
      }
    };

    fetchFaqs();
  }, []);

  const faqsPorCategoria = faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="faq-page">
        <header className="faq-header">
          <h1>Preguntas Frecuentes</h1>
          <button className="back-btn" onClick={() => router.push('/d3h7m1p4')}>
            Regresar
          </button>
        </header>

        <main className="faq-container">
          {Object.keys(faqsPorCategoria).length === 0 ? (
            <p className="no-faq">No hay preguntas frecuentes disponibles.</p>
          ) : (
            Object.entries(faqsPorCategoria).map(([categoria, preguntas]) => (
              <div
                key={categoria}
                className={`faq-category ${openCategory === categoria ? 'active' : ''}`}
              >
                <h2
                  onClick={() =>
                    setOpenCategory(openCategory === categoria ? null : categoria)
                  }
                >
                  {categoria}
                  <span className="faq-icon">
                    {openCategory === categoria ? '' : ''}
                  </span>
                </h2>

                <div
                  className="faq-list"
                  style={{ maxHeight: openCategory === categoria ? '2000px' : '0' }}
                >
                  {preguntas.map((faq, idx) => {
                    const globalIdx = idx; // cada item puede abrirse individualmente
                    return (
                      <div
                        key={faq.id}
                        className={`faq-item ${openIndex === globalIdx ? 'active' : ''}`}
                      >
                        <button
                          className="faq-question"
                          onClick={() =>
                            setOpenIndex(openIndex === globalIdx ? null : globalIdx)
                          }
                        >
                          {faq.question}
                          <span className="faq-icon">
                            {openIndex === globalIdx ? '−' : '+'}
                          </span>
                        </button>
                        <div
                          className="faq-answer"
                          style={{
                            maxHeight: openIndex === globalIdx ? '500px' : '0',
                          }}
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </main>

        <footer className="faq-footer">
          <p>© 2025 CandiGo. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}
