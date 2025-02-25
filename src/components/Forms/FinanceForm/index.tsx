import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { ChartContext } from '../../../context/ChartContext';
import './styles.css';

interface Finances {
  totalIncome: number;
  totalExpenses: number;
  deficit: number;
  remaining: number;
  totalSavings: number;
  totalDebt: number;
}

const PieChartForm: React.FC = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('ChartContext must be used within a ChartProvider');
  }

  const { pieData, updatePieData, updateBarData, updateRadarData } = context;

  const totalExpenses = pieData.datasets[0].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const [finances, setFinances] = useState<Finances>({
    totalIncome: 0,
    totalExpenses: totalExpenses,
    deficit: 0,
    remaining: 0,
    totalSavings: 0,
    totalDebt: 0,
  });

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [oldFinances, setOldFinances] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    if (pieData?.labels && pieData?.datasets?.[0]?.data && pieData?.datasets?.[0]?.backgroundColor) {
      setLabels(pieData.labels);
      setData(pieData.datasets[0].data);
      setColors(pieData.datasets[0].backgroundColor as unknown as string[]);
    }
  }, [pieData]);

  useEffect(() => {
    const updateData = async () => {
      if (finances.totalIncome >= 1) {
        setOldFinances(finances.remaining);
      }
      if (finances.remaining !== oldFinances && finances.totalIncome >= 1) {
        await updateBarData(finances.remaining, currentMonth, 'savings');
        await updateBarData(finances.totalExpenses, currentMonth, 'spending');
      }
    };
  
    updateData();
  }, [finances.remaining, updateBarData]);

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });
    setCurrentMonth(month);
  }, []);

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
    updatePieData(newLabels, data, colors);
    updateRadarData(newLabels, data);
  };

  const handleDataChange = (index: number, value: number) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);
    updatePieData(labels, newData, colors);
    updateRadarData(labels, newData);

    const newTotalExpenses = newData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setFinances((prevFinances) => ({
      ...prevFinances,
      totalExpenses: newTotalExpenses,
      deficit: prevFinances.totalIncome - newTotalExpenses,
      remaining: prevFinances.totalIncome - newTotalExpenses,
    }));
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
    updatePieData(labels, data, newColors);
    updateRadarData(labels, data);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
    updatePieData(labels, data, colors);
    updateRadarData(labels, data);
  };

  const handleNotesChange = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
    updatePieData(labels, data, colors);
    updateRadarData(labels, data);
  };

  const addLabel = () => {
    const newLabels = [...labels, ''];
    const newData = [...data, 0];
    const newColors = [...colors, '#000000']; // Default color
    const newDates = [...dates, ''];
    const newNotes = [...notes, ''];
    setLabels(newLabels);
    setData(newData);
    setColors(newColors);
    setDates(newDates);
    setNotes(newNotes);
    updatePieData(newLabels, newData, newColors);
    updateRadarData(newLabels, newData);
  };

  const removeLabel = (index: number) => {
    const newLabels = labels.filter((_, i) => i !== index);
    const newData = data.filter((_, i) => i !== index);
    const newColors = colors.filter((_, i) => i !== index);
    const newDates = dates.filter((_, i) => i !== index);
    const newNotes = notes.filter((_, i) => i !== index);

    setLabels(newLabels);
    setData(newData);
    setColors(newColors);
    setDates(newDates);
    setNotes(newNotes);
    updatePieData(newLabels, newData, newColors);
    updateRadarData(newLabels, newData);

    const newTotalExpenses = newData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    setFinances((prevFinances) => ({
      ...prevFinances,
      totalExpenses: newTotalExpenses,
      deficit: prevFinances.totalIncome - newTotalExpenses,
      remaining: prevFinances.totalIncome - newTotalExpenses,
    }));
  };

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
    <Form>
      <Table striped bordered hover variant="dark" style={{ marginTop: '5vh', marginBottom: '-3.2em' }}>
        <thead>
          <tr>
            <th>Income</th>
            <th>Total Expenses</th>
            <th>Remaining Income</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                type="number"
                placeholder="Value"
                value={finances.totalIncome}
                onChange={(e) => updateFinancesData(parseInt(e.target.value), 'income')}
                className="invisible-input"
              />
            </td>
            <td>
              <Form.Control
                type="number"
                placeholder="Value"
                value={finances.totalExpenses}
                readOnly
                className="invisible-input"
              />
            </td>
            <td>
              <Form.Control
                type="number"
                placeholder="Value"
                value={finances.remaining}
                readOnly
                className="invisible-input"
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Table striped bordered hover variant="dark" style={{ marginTop: '5vh' }}>
        <thead>
          <tr>
            <th>Expense</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Color</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Label"
                  value={label}
                  onChange={(e) => handleLabelChange(index, e.target.value)}
                  className="invisible-input"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="Value"
                  value={data[index]}
                  onChange={(e) => handleDataChange(index, parseInt(e.target.value))}
                  className="invisible-input"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  placeholder="Day"
                  min="1"
                  max="31"
                  value={dates[index]}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="invisible-input"
                />
              </td>
              <td>
                <Form.Control
                  type="color"
                  value={colors[index]}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="invisible-input"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Notes"
                  value={notes[index]}
                  onChange={(e) => handleNotesChange(index, e.target.value)}
                  className="invisible-input"
                />
              </td>
              <td className="text-center">
                <Button variant="danger" onClick={() => removeLabel(index)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}>
              <Form.Group controlId="monthlyIncome" className="form-group text-center">
                <Form.Label>Total Debt</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your debt amount"
                  value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(parseInt(e.target.value));
                    updateFinancesData(parseInt(e.target.value), 'income');
                  }}
                  className="invisible-input text-center"
                />
              </Form.Group>
            </td>
            <td colSpan={4}>
              <Form.Group controlId="savings" className="form-group text-center">
                <Form.Label>Total Savings</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your savings"
                  value={savingsGoal}
                  onChange={(e) => {
                    setSavingsGoal(parseInt(e.target.value));
                    updateFinancesData(parseInt(e.target.value), 'savings');
                  }}
                  className="invisible-input text-center"
                />
              </Form.Group>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="text-center">
        <Button variant="dark" onClick={addLabel} className="mt-3 mb-5">
          Add Label
        </Button>
      </div>
    </Form>
  );
};

export default PieChartForm;