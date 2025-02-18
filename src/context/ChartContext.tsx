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
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

// ==============================
// Bar Context
// ==============================

  const [barData, setBarData] = useState<ChartData>({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Spending',
        data: [150, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Savings',
        data: [100, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150].reverse(),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  })

// ==============================
// Pie Context
// ==============================

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

  return (
    <ChartContext.Provider value={{ pieData, setPieData, barData, setBarData }}>
      {children}
    </ChartContext.Provider>
  );
};

export { ChartContext, ChartProvider };
