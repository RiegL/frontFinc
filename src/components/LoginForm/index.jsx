"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });
  // const [alertSeverity, setAlertSeverity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token); // Salvar token no local storage
      setAlertMessage({
        show: true,
        message: "Login realizado com sucesso!",
        severity: "success",
      });
 
    } catch (error) {
      console.error("Erro ao logar", error.message);
      setAlertMessage({
        show: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };


  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <styles.h1>Login</styles.h1>
          <styles.TextField
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="E-mail"
            variant="outlined"
            required
          />
          <styles.TextField
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Senha"
            variant="outlined"
            type="password"
            required
          />
          <Stack alignItems={"center"}>
            <styles.Button color="success" type="submit" variant="contained">
              Entrar
            </styles.Button>
          </Stack>
        </Stack>
      </styles.Form>
      <Snackbar
        open={alertMessage.show}
        autoHideDuration={6000}
        onClose={() => setAlertMessage("")}
      >
        <Alert
          onClose={() => setAlertMessage("")}
          severity={alertMessage.severity}
          sx={{ width: "100%" }}
        >
          {alertMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
