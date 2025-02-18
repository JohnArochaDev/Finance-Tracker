import React, { createContext, useState, ReactNode } from 'react';

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[] | string;
  borderColor: string[] | string;
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface ChartContextType {
  barData: ChartData;
  pieData: ChartData;
  setBarData: React.Dispatch<React.SetStateAction<ChartData>>;
  setPieData: React.Dispatch<React.SetStateAction<ChartData>>;
  updatePieData: (labels: string[], data: number[]) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Bar Context
  const [barData, setBarData] = useState<ChartData>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Spending',
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
        backgroundColor: 'rgba(213, 62, 79, 1)',
        borderColor: 'rgb(132, 39, 50)',
        borderWidth: 1,
      },
      {
        label: 'Savings',
        data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].reverse(),
        backgroundColor: 'rgba(102, 194, 165, 1)',
        borderColor: 'rgb(70, 130, 111)',
        borderWidth: 1,
      }
    ],
  });

  // Pie Context
  const [pieData, setPieData] = useState<ChartData>({
    labels: ['Housing', 'Debt', 'Food', 'Transportation', 'Dining', 'Childcare', 'Insurance', 'Utilities', 'Subscriptions'],
    datasets: [
      {
        label: 'Spending',
        data: [1200, 800, 450, 300, 400, 350, 200, 150, 100],
        backgroundColor: [
          'rgba(213, 62, 79, 1)',
          'rgba(244, 109, 67, 1)',
          'rgba(253, 174, 97, 1)',
          'rgb(255, 228, 152)',
          'rgb(255, 255, 205)',
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
  });

  // const updatePieData = (data: number[], labels: string[]) => {
  //   if (data.length !== labels.length) {
  //     return console.error('Mismatched fields');
  //   }
  //   setPieData({
  //     labels,
  //     datasets: [
  //       {
  //         ...pieData.datasets[0],
  //         data,
  //       },
  //     ],
  //   });
  // };

  const updatePieData = (labels: string[], data: number[]) => {
    setPieData({
      labels,
      datasets: [
        {
          ...pieData.datasets[0],
          data,
        },
      ],
    });
  };

  return (
    <ChartContext.Provider value={{ pieData, setPieData, barData, setBarData, updatePieData }}>
      {children}
    </ChartContext.Provider>
  );
};

export { ChartContext, ChartProvider };