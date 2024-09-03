"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { Label } from "@mui/icons-material";

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
  
      console.log('Response aqui :', response.data.data.token); // Verifique o que está sendo retornado
  
      localStorage.setItem("token", response.data.data.token);
       // Verifique se o token foi salvo
  
      setAlertMessage({
        show: true,
        message: "Login realizado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao logar", error.message);
      setAlertMessage({
        show: true,
        message: 'Erro ao Logar - Por favor, verifique seu email e senha.',
        severity: "error",
      });
    }
  };


  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={5}>
          <styles.TextField
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="E-mail"
            variant="outlined"
            type="email"
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
            <styles.Button color="primary" type="submit" variant="contained">
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
