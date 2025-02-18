import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { ChartContext } from '../../../context/ChartContext';
import './styles.css';

const PieChartForm: React.FC = () => {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error('ChartContext must be used within a ChartProvider');
  }

  const { pieData, updatePieData } = context;

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);

  useEffect(() => {
    setLabels(pieData.labels);
    setData(pieData.datasets[0].data);
    setColors(pieData.datasets[0].backgroundColor as unknown as string[]); // Initialize colors
    // Initialize dates and notes if needed
  }, [pieData]);

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
    updatePieData(newLabels, data, colors);
  };

  const handleDataChange = (index: number, value: number) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);
    updatePieData(labels, newData, colors);
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
    updatePieData(labels, data, newColors);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
    updatePieData(labels, data, colors);
  };

  const handleNotesChange = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
    updatePieData(labels, data, colors);
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
  };

  return (
    <Form>
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
            <Form.Label>Monthly Income</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your monthly income"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
              className="invisible-input text-center"
            />
            </Form.Group>
          </td>
          <td colSpan={4}>
            <Form.Group controlId="savingsGoal" className="form-group text-center">
            <Form.Label>Savings Goal</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your savings goal"
              value={savingsGoal}
              onChange={(e) => setSavingsGoal(parseInt(e.target.value))}
              className="invisible-input text-center"
            />
            </Form.Group>
          </td>
        </tr>
      </tbody>
      </Table>
      <Button variant="primary" onClick={addLabel} className="mt-3">
        Add Label
      </Button>
    </Form>
  );
};

export default PieChartForm;