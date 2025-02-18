import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';
import { ChartContext } from '../../../context/ChartContext';

ChartJS.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 20,
        font: {
          size: 14,
          family: 'Arial',
          style: 'italic' as const,
          weight: 'bold' as const,
        },
        color: '#ffffff',
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: true,
      text: 'Monthly Expenses',
      position: 'top' as const,
      font: {
        size: 18,
        family: 'Arial',
        style: 'normal' as const,
        weight: 'bold' as const,
      },
      color: '#ffffff',
      padding: {
        top: 10,
        bottom: 30,
      },
      align: 'center' as const,
      fullSize: true,
    },
  },
  animation: {
    delay: 250,
    duration: 1500,
    easing: 'easeOutBounce' as const,
    loop: false,
    animateScale: true,
    animateRotate: true,
  },
  scales: {
    x: {
      grid: {
        color: '#000000',
      },
      ticks: {
        color: '#ffffff',
      },
    },
    y: {
      grid: {
        color: '#000000',
      },
      ticks: {
        color: '#ffffff',
      },
    },
  },
};

const BarChart: React.FC = () => {
    const context = useContext(ChartContext);
  
    if (!context) {
      throw new Error('ChartContext must be used within a ChartProvider');
    }

    const { barData } = context;

  return <Bar data={barData} options={options} />;
};

export default BarChart;
