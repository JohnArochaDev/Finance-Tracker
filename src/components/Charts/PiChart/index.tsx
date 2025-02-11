import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = {
  labels: ['Utilities', 'Housing', 'Food', 'Insurance', 'Transportation', 'Debt', 'Childcare', 'Dining', 'Subscriptions'],
  datasets: [
    {
      label: 'Spending',
      data: [150, 1200, 450, 200, 300, 800, 350, 400, 100],
      backgroundColor: [
        'rgba(213, 62, 79, 1)',
        'rgba(244, 109, 67, 1)',
        'rgba(253, 174, 97, 1)',
        'rgba(254, 224, 139, 1)',
        'rgba(255, 255, 191, 1)',
        'rgba(230, 245, 152, 1)',
        'rgba(171, 221, 164, 1)',
        'rgba(102, 194, 165, 1)',
        'rgba(50, 136, 189, 1)',
      ],
      borderColor: [
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)',
        'rgba(52, 58, 64, 1)'
      ],
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
        color: 'white',
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    title: {
      display: true,
      text: 'Expenses',
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
  return <Pie data={data} options={options} />;
};

export default PieChart;