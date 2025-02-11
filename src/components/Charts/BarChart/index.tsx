import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [
    {
      label: 'Spending',
      data: [150, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

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
        color: '#333',
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
      color: '#000',
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
};

const BarChart: React.FC = () => {
  return <Bar data={data} options={options} />;
};

export default BarChart;