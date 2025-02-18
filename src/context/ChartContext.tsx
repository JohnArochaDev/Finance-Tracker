import React, { createContext, useState, ReactNode } from 'react';

interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface ChartContextType {
  data: ChartData;
  setData: React.Dispatch<React.SetStateAction<ChartData>>;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ChartData>({
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
    <ChartContext.Provider value={{ data, setData }}>
      {children}
    </ChartContext.Provider>
  );
};

export { ChartContext, ChartProvider };