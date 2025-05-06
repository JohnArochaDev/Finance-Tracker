import React, { useState } from "react";
import Axios from "axios";
import {
  Container,
  Form,
  Label,
  Input,
  Button,
  ErrorMessage,
  InputContainer,
  ButtonContainer,
} from "./style";

import { useAuth } from "../../context/AuthContext";

function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const { setLoggedIn, setJWT, setUserId } = useAuth()

  const logIn = (username: string, password: string) => {
    Axios.post("http://localhost:8080/api/auth/login", {
      username,
      password,
    })
      .then(function (response) {
        console.log(response);
        // add the context update here
        if (response.status === 200) {
          setLoggedIn(true)
          setJWT(response.data.token)
          setUserId(response.data.userID)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const register = (username: string, password: string) => {
    Axios.post("http://localhost:8080/api/auth/register", {
      username,
      password,
    })
      .then(function (response) {
        console.log('response', response);
        // Clear fields and switch to login card
        setUsername("");
        setPassword("");
        setShowRegister(false);
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
    if (showRegister) {
      register(username, password);
    } else {
      logIn(username, password);
    }
    console.log("Username:", username);
    console.log("Password:", password);

    setError("");
  };

  return (
    <Container>
      <h2>{showRegister ? "Register" : "Login"}</h2>
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
        <Form onSubmit={handleSubmit}>
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
            <Button type="submit">Register</Button>
            <Button type="button" onClick={() => setShowRegister(false)}>
              Back to Login
            </Button>
          </ButtonContainer>
        </Form>
      )}
    </Container>
  );
}

export default LogIn;
