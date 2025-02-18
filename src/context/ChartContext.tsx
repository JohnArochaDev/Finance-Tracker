import React, { createContext, useState, ReactNode } from 'react';

interface Finances {
  totalIncome: number;
  totalExpenses: number;
  deficit: number;
  remaining: number;
  totalSavings: number;
  totalDebt: number;
}

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
  finances: Finances;
  setBarData: React.Dispatch<React.SetStateAction<ChartData>>;
  setPieData: React.Dispatch<React.SetStateAction<ChartData>>;
  setFinances: React.Dispatch<React.SetStateAction<Finances>>;
  updatePieData: (labels: string[], data: number[], backgroundColor: string[]) => void;
  updateBarData: (data: number[], type: 'spending' | 'savings') => void;
  updateFinancesData: (data: number, type: 'income' | 'savings' | 'debt') => void;
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

  const updateBarData = (data: number[], type: 'spending' | 'savings') => {
    if (type === 'spending') {
      setPieData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            ...pieData.datasets[0],
            data: data,
          },
        ],
      });
    } else if (type === 'savings') {
      setPieData({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            ...pieData.datasets[1],
            data: data,
          },
        ],
      });
    }
  };

  // Pie Context
  const [pieData, setPieData] = useState<ChartData>({
    labels: ['Housing', 'Debt', 'Food', 'Transportation', 'Dining', 'Childcare', 'Insurance', 'Utilities', 'Subscriptions', 'Savings'],
    datasets: [
      {
        label: 'Spending',
        data: [1200, 800, 450, 300, 400, 350, 200, 150, 100, 170],
        backgroundColor: [
          '#d53e4f',
          '#f46d43',
          '#fdae61',
          '#ffe498',
          '#ffffcd',
          '#e6f598',
          '#abdda4',
          '#66c2a5',
          '#3288bd',
          '#bd32aa',
        ],
        borderColor: [
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
          '#343a40',
        ],
        borderWidth: 1,
      },
    ],
  });

  const updatePieData = (labels: string[], data: number[], backgroundColor: string[]) => {
    setPieData({
      labels,
      datasets: [
        {
          ...pieData.datasets[0],
          data: data,
          backgroundColor: backgroundColor,
        },
      ],
    });
  };

  // Finances
  const totalExpenses = pieData.datasets[0].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const [finances, setFinances] = useState<Finances>({
    totalIncome: 4200,
    totalExpenses: totalExpenses,
    deficit: 4200 - totalExpenses,
    remaining: 4200 - totalExpenses,
    totalSavings: 0,
    totalDebt: 0,
  });
  
  const updateFinancesData = (data: number, type: 'income' | 'savings' | 'debt') => {
    setFinances((prevFinances) => {
      const newFinances = { ...prevFinances };

      if (type === 'income') {
        newFinances.totalIncome = data;
      } else if (type === 'savings') {
        newFinances.totalSavings = data;
      } else if (type === 'debt') {
        newFinances.totalDebt = data;
      }

      newFinances.deficit = newFinances.totalIncome - newFinances.totalExpenses;
      newFinances.remaining = newFinances.totalIncome - newFinances.totalExpenses;

      return newFinances;
    });
  };

  return (
    <ChartContext.Provider value={{ pieData, setPieData, barData, setBarData, updatePieData, updateBarData, finances, setFinances, updateFinancesData }}>
      {children}
    </ChartContext.Provider>
  );
};

export { ChartContext, ChartProvider };
