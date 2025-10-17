import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartContainer } from '../styles/PerformanceChart.styles';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PerformanceChartProps {
  chartData: {
    labels: string[];
    datasets: any[];
  };
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Desempenho de ACS nas Últimas Partidas',
      },
    },
    scales: {
      y: {
        beginAtZero: false, 
        title: {
          display: true,
          text: 'Pontuação Média de Combate (ACS)'
        }
      }
    }
  };

  return (
    <ChartContainer>
      <Line options={options} data={chartData} />
    </ChartContainer>
  );
};

export default PerformanceChart;