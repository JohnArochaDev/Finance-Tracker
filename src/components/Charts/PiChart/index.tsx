import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, TooltipItem } from 'chart.js';
import { ChartContext } from '../../../context/ChartContext';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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
        color: 'white',
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
      color: 'white',
      padding: {
        top: 10,
        bottom: 30,
      },
      align: 'center' as const,
      fullSize: true,
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      bodyFont: {
        size: 14,
        family: 'Arial',
      },
      callbacks: {
        title: function () { // removes the title from the tooltip
          return [];
        },
        label: function (tooltipItem: TooltipItem<'pie'>) {
          return `${tooltipItem.label}: $${tooltipItem.raw}`;
        },
      },
    },
  },
  animation: {
    delay: 250,
    duration: 1500,
    easing: 'easeOutBounce' as const,
    loop: false,
    animateScale: true,
    animateRotate: true
  },
};

const PieChart: React.FC = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('ChartContext must be used within a ChartProvider');
  }

  const { pieData } = context;

  return <Pie data={pieData} options={options} />;
};

export default PieChart;
  