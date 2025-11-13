import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as dfd from 'danfojs-node';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const datasetPath = path.join(process.cwd(), 'public', 'data', 'dataset.csv');
    const df = await dfd.readCSV(datasetPath);

    // Variables de entrada
    const {
      Genero,
      Edad,
      Tema,
      ValorCandidato,
      Frecuencia,
      VotoGobierno,
      Economia,
      Seguridad,
      PoliticaSocial,
      MedioInformacion,
      Experiencia,
      Corriente,
    } = body;

    // Simulación de modelo simple basado en coincidencias de "tema"
    const result = df
      .query(df['Tema'].eq(Tema))
      .sample(1)
      .iloc({ rows: [0] })
      .toJSON()[0];

    return NextResponse.json({
      candidato: result['Candidato'],
      partido: result['Partido'],
    });
  } catch (error: any) {
    console.error('Error en predicción:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}
