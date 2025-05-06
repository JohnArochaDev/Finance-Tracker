import React, { useState, useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useChartContext } from "../../../context/ChartContext";
import "./styles.css";

const PieChartForm: React.FC = () => {
  const { pieData, updateBarData, finances, setFinances } = useChartContext();

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [notes, setNotes] = useState<string[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [oldFinances, setOldFinances] = useState(0);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    if (
      pieData?.labels &&
      pieData?.datasets?.[0]?.data &&
      pieData?.datasets?.[0]?.backgroundColor
    ) {
      setLabels(pieData.labels);
      setData(pieData.datasets[0].data);
      setColors(pieData.datasets[0].backgroundColor as unknown as string[]);
    }
  }, [pieData]);

  useEffect(() => {
    const updateData = async () => {
      if (finances.totalIncome >= 1 && finances.remaining !== oldFinances) {
        setOldFinances(finances.remaining);
        await updateBarData(finances.remaining, currentMonth, "savings", null);
        await updateBarData(
          finances.totalExpenses,
          currentMonth,
          "spending",
          null
        );
        if (labels.map((label) => label.toLowerCase()).includes("debt")) {
          const index: number = labels
            .map((label) => label.toLowerCase())
            .indexOf("debt");
          const debtPayment = data[index];
          await updateBarData(
            finances.totalDebt,
            currentMonth,
            "debt",
            debtPayment
          );
        }
      }
    };

    updateData();
  }, [
    finances.remaining,
    updateBarData,
    currentMonth,
    labels,
    data,
    oldFinances,
  ]);

  useEffect(() => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
  };

  const handleDataChange = (index: number, value: number) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);

    const newTotalExpenses = newData.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    setFinances((prevFinances) => {
      const newFinances = {
        ...prevFinances,
        totalExpenses: newTotalExpenses,
        deficit:
          newTotalExpenses > prevFinances.totalIncome
            ? newTotalExpenses - prevFinances.totalIncome
            : 0,
        remaining:
          newTotalExpenses <= prevFinances.totalIncome
            ? prevFinances.totalIncome - newTotalExpenses
            : 0,
      };

      if (newFinances.deficit > 0) {
        newFinances.remaining = 0;
      } else if (newFinances.remaining > 0) {
        newFinances.deficit = 0;
      }

      return newFinances;
    });
  };

  const updateFinancesData = (
    data: number,
    type: "income" | "savings" | "debt"
  ) => {
    setFinances((prevFinances) => {
      const newFinances = { ...prevFinances };

      if (type === "income" && newFinances.totalIncome !== data) {
        newFinances.totalIncome = data;
        newFinances.deficit =
          newFinances.totalExpenses > newFinances.totalIncome
            ? newFinances.totalExpenses - newFinances.totalIncome
            : 0;
        newFinances.remaining =
          newFinances.totalExpenses <= newFinances.totalIncome
            ? newFinances.totalIncome - newFinances.totalExpenses
            : 0;

        if (newFinances.deficit > 0) {
          newFinances.remaining = 0;
        } else if (newFinances.remaining > 0) {
          newFinances.deficit = 0;
        }
      } else if (type === "savings" && newFinances.totalSavings !== data) {
        newFinances.totalSavings = data;
      } else if (type === "debt" && newFinances.totalDebt !== data) {
        newFinances.totalDebt = data;
      } else {
        return prevFinances;
      }

      return newFinances;
    });
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates);
  };

  const handleNotesChange = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  const addLabel = () => {
    const newLabels = [...labels, ""];
    const newData = [...data, 0];
    const newColors = [...colors, "#000000"];
    const newDates = [...dates, ""];
    const newNotes = [...notes, ""];
    setLabels(newLabels);
    setData(newData);
    setColors(newColors);
    setDates(newDates);
    setNotes(newNotes);
  };

  const submit = () => {
    // add logic here to make the post request, format the data first.
    const len = colors.length;
    const borderColor = new Array(len).fill("#343a40");

    console.log("formatted data", {
      totalIncome: finances.totalIncome,
      totalExpenses: finances.totalExpenses,
      deficit: finances.deficit,
      remaining: finances.remaining,
      totalSavings: finances.totalSavings,
      totalDebt: finances.totalDebt,
      charts: [
        {
          type: "PIE_DATA",
          labels: labels,
          datasets: [
            {
              label: "Spending",
              data,
              backgroundColor: colors,
              borderColor,
              borderWidth: 1,
            },
          ],
        },
        {
          type: "RADAR_DATA",
          labels: labels,
          datasets: [
            {
              label: "Spending",
              data,
              backgroundColor: ["rgba(243, 255, 21, 0.2)"],
              borderColor: ["rgb(243, 255, 21)"],
              borderWidth: 1,
            },
          ],
        },
        {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          type: "BAR_DATA",
          datasets: [
            {
              label: "Spending",
              // I need to dynamically fix these, they need to autocalculate
              data: [
                100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
              ],
              backgroundColor: ["rgba(213, 62, 79, 1)"],
              borderColor: ["rgb(132, 39, 50)"],
              borderWidth: 1,
            },
            {
              label: "Savings",
              data: [
                1200, 1100, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100,
              ],
              backgroundColor: ["rgba(102, 194, 165, 1)"],
              borderColor: ["rgb(70, 130, 111)"],
              borderWidth: 1,
            },
          ],
        },
      ],
    });
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

    const newTotalExpenses = newData.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    setFinances((prevFinances) => ({
      ...prevFinances,
      totalExpenses: newTotalExpenses,
      deficit: prevFinances.totalIncome - newTotalExpenses,
      remaining: prevFinances.totalIncome - newTotalExpenses,
    }));
  };

  return (
    <Form>
      <Table
        striped
        bordered
        hover
        variant="dark"
        style={{ marginTop: "5vh", marginBottom: "-3.2em" }}
      >
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
                onChange={(e) =>
                  updateFinancesData(parseInt(e.target.value), "income")
                }
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
      <Table striped bordered hover variant="dark" style={{ marginTop: "5vh" }}>
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
                  onChange={(e) =>
                    handleDataChange(index, parseInt(e.target.value))
                  }
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
              <Form.Group
                controlId="monthlyIncome"
                className="form-group text-center"
              >
                <Form.Label>Total Debt</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your debt amount"
                  value={monthlyIncome}
                  onChange={(e) => {
                    setMonthlyIncome(parseInt(e.target.value));
                    updateFinancesData(parseInt(e.target.value), "debt");
                  }}
                  className="invisible-input text-center"
                />
              </Form.Group>
            </td>
            <td colSpan={4}>
              <Form.Group
                controlId="savings"
                className="form-group text-center"
              >
                <Form.Label>Total Savings</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your savings"
                  value={savingsGoal}
                  onChange={(e) => {
                    setSavingsGoal(parseInt(e.target.value));
                    updateFinancesData(parseInt(e.target.value), "savings");
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
        <Button variant="dark" onClick={submit} className="mt-3 mb-5">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default PieChartForm;
