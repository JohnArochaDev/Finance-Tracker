import React, { createContext, useState, ReactNode, useContext } from 'react';

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

export interface ChartData {
  labels: string[];
  datasets: Dataset[];
  type?: string | undefined;
}

interface ChartContextType {
  barData: ChartData;
  pieData: ChartData;
  radarData: ChartData;
  finances: Finances;
  setBarData: React.Dispatch<React.SetStateAction<ChartData>>;
  setPieData: React.Dispatch<React.SetStateAction<ChartData>>;
  setRadarData: React.Dispatch<React.SetStateAction<ChartData>>;
  setFinances: React.Dispatch<React.SetStateAction<Finances>>;
  updateBarData: (data: number, month: string, type: 'spending' | 'savings' | "debt", debtPayment: number | null | undefined) => void;
  updateFinancesData: (data: number, type: 'income' | 'savings' | 'debt') => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

fetch('')

const months: { [key: string]: number } = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};

const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Bar Context

  // this is where we initialize the bar data

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

  const updateBarData = async (data: number, monthOption: string, type: 'spending' | 'savings' | "debt", debtPayment: number | null | undefined) => {
    let spendingArr: number[] = [];
    const savingArr: number[] = [];
    const debtArr: number[] = []
  
    if (type === 'spending') {
      spendingArr = Array(12).fill(data);
    } else if (type === 'savings') {
      for (const month of Object.keys(months)) {
        if (monthOption.toLowerCase() === month) {
          for (let i = 0; i < 12; i++) {
            const monthIndex = (months[month as keyof typeof months] + i) % 12;
            savingArr[monthIndex] = data * (i + 1);
          }
          break;
        }
      }
    } else if (type === 'debt' && debtPayment) {
      console.log('DEBT')
      for (const month of Object.keys(months)) {
        if (monthOption.toLowerCase() === month) {
          let remainingDebt = data;
          for (let i = 0; i < 12; i++) {
            const monthIndex = (months[month as keyof typeof months] + i) % 12;
            remainingDebt -= debtPayment;
            debtArr[monthIndex] = remainingDebt > 0 ? remainingDebt : 0;
          }
          break;
        }
      }
    }
  
    return new Promise<void>((resolve) => {
      if (type === 'spending') {
        setBarData((prevBarData) => ({
          labels: prevBarData.labels,
          datasets: [
            {
              ...prevBarData.datasets[0],
              data: spendingArr,
            },
            {
              ...prevBarData.datasets[1],
            },
          ],
        }));
      } else if (type === 'savings') {
        setBarData((prevBarData) => ({
          labels: prevBarData.labels,
          datasets: [
            {
              ...prevBarData.datasets[0],
            },
            {
              ...prevBarData.datasets[1],
              data: savingArr,
            },
          ],
        }));
      } else if (type === 'debt') {
        setBarData((prevBarData) => ({
          labels: prevBarData.labels,
          datasets: [
            {
              ...prevBarData.datasets[0],
            },
            {
              ...prevBarData.datasets[1],
            },
            {
              label: 'Debt',
              data: debtArr,
              backgroundColor: 'rgba(141, 160, 203, 1)',
              borderColor: 'rgb(103, 117, 149)',
              borderWidth: 1,
            }
          ],
        }));
    }
      resolve();
    });
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

  // Radar Context
  const [radarData, setRadarData] = useState<ChartData>({
    labels: ['Housing', 'Debt', 'Food', 'Transportation', 'Dining', 'Childcare', 'Insurance', 'Utilities', 'Subscriptions', 'Savings'],
    datasets: [
      {
        label: 'Spending',
        data: [1200, 800, 450, 300, 400, 350, 200, 150, 100, 170],
        backgroundColor: 'rgba(243, 255, 21, 0.2)',
        borderColor: 'rgb(243, 255, 21)',
        borderWidth: 1,
      },
    ],
  });

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
    <ChartContext.Provider value={{ pieData, setPieData, barData, setBarData, radarData, setRadarData, updateBarData, finances, setFinances, updateFinancesData }}>
      {children}
    </ChartContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useChartContext = () => {
    const context = useContext(ChartContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


export { ChartContext, ChartProvider };
