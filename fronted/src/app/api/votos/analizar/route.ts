import { supabaseServer } from '@/lib/supabaseServerClient';
const { MultinomialNB } = require('ml-classify-text');

export async function GET() {
  try {
    // Traer votos
    const { data: votos, error } = await supabaseServer
      .from('votos')
      .select('candidato');

    console.log('Votos obtenidos desde Supabase:', votos, 'Error:', error);

    if (error) throw new Error(error.message);

    if (!votos || votos.length === 0) {
      return new Response(JSON.stringify({ totalVotos: 0, probabilidades: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Preparar datos para Naive Bayes
    const X = votos.map((v: any) => v.candidato);
    const y = votos.map((v: any) => v.candidato);

    const nb = new MultinomialNB();
    nb.train(X, y);

    // Calcular probabilidades
    const candidatosUnicos = Array.from(new Set(y));
    const probabilidades = candidatosUnicos.map((c) => {
      const probs = nb.predictProb(c);
      return { candidato: c, probabilidad: probs[0] };
    });

    console.log('Probabilidades calculadas:', probabilidades);

    return new Response(JSON.stringify({ totalVotos: y.length, probabilidades }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Error analizar votos:', err);
    return new Response(JSON.stringify({ error: err.message || 'Error desconocido' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
