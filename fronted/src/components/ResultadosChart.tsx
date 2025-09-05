'use client';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ResultadosChartProps {
  labels: string[];
  data: number[];
}

export default function ResultadosChart({ labels, data }: ResultadosChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: '% Probabilidad',
        data,
        backgroundColor: 'rgba(102, 87, 128, 0.7)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Probabilidades por candidato' },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
