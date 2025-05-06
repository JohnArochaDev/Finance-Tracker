import React, { useState } from "react";
import Axios from "axios";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%; /* Make input full width */
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:not(:last-child) {
    margin-right: 8px; /* Small space between buttons */
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 16px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RegisterCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const logIn = (username: string, password: string) => {
    Axios.post("http://localhost:8080/api/auth/login", {
      username,
      password,
    })
      .then(function (response) {
        console.log(response);
        // add the context update here
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    // Handle login logic here
    logIn(username, password);
    console.log("Username:", username);
    console.log("Password:", password);

    setError("");
  };

  return (
    <Container>
      <h2>{showRegister ? 'Register' : 'Login'}</h2>
      {!showRegister && (
        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <InputContainer>
            <Label>Username:</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <ButtonContainer>
            <Button type="submit">Log In</Button>
            <Button type="button" onClick={() => setShowRegister(true)}>
              Register
            </Button>
          </ButtonContainer>
        </Form>
      )}
      {showRegister && (
        <RegisterCard>
          <InputContainer>
            <Label>Username:</Label>
            <Input type="text" />
          </InputContainer>
          <InputContainer>
            <Label>Password:</Label>
            <Input type="password" />
          </InputContainer>
          <Button type="button">Register</Button>
        </RegisterCard>
      )}
    </Container>
  );
}

export default LogIn;
