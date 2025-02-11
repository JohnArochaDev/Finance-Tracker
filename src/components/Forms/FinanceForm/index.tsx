import React, { useState } from 'react';
import { Button, Form, Row, Col, Container, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PieChartForm: React.FC = () => {
  const [labels, setLabels] = useState(['Utilities', 'Housing', 'Food', 'Insurance', 'Transportation', 'Debt', 'Childcare', 'Dining', 'Subscriptions']);
  const [data, setData] = useState([150, 1200, 450, 200, 300, 800, 350, 400, 100]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);

  const handleLabelChange = (index: number, value: string) => {
    const newLabels = [...labels];
    newLabels[index] = value;
    setLabels(newLabels);
  };

  const handleDataChange = (index: number, value: number) => {
    const newData = [...data];
    newData[index] = value;
    setData(newData);
  };

  const addLabel = () => {
    setLabels([...labels, '']);
    setData([...data, 0]);
  };

  const removeLabel = (index: number) => {
    const newLabels = labels.filter((_, i) => i !== index);
    const newData = data.filter((_, i) => i !== index);
    setLabels(newLabels);
    setData(newData);
  };

  return (
    <Container>
      <Card className="mt-5">
        <Card.Header>
          <h3>Manage Your Finances</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="monthlyIncome">
                  <Form.Label>Monthly Income:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your monthly income"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(parseInt(e.target.value))}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="savingsGoal">
                  <Form.Label>Savings Goal:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your savings goal"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(parseInt(e.target.value))}
                  />
                </Form.Group>
              </Col>
            </Row>
            {labels.map((label, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col md={5}>
                  <Form.Group controlId={`label-${index}`}>
                    <Form.Label>Expense:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Label"
                      value={label}
                      onChange={(e) => handleLabelChange(index, e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group controlId={`value-${index}`}>
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Value"
                      value={data[index]}
                      onChange={(e) => handleDataChange(index, parseInt(e.target.value))}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="text-center">
                  <Button variant="danger" onClick={() => removeLabel(index)} className="mt-4">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Col>
              </Row>
            ))}
            <Button variant="primary" onClick={addLabel} className="mt-3">
              Add Label
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PieChartForm;