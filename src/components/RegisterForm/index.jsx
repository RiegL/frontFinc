"use client";

import { Snackbar, Stack, Alert } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", response.data.data.token);
      setAlertMessage({
        show:true,
        message: "Usuário registrado com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao registrar", error.message);
      setAlertMessage({
        show:true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <styles.h1>Registrar</styles.h1>
          <styles.TextField
            onChange={(e) => setName(e.target.value)}
            id="name"
            label="Nome"
            type="text"
            variant="outlined"
            required
          />
          <styles.TextField
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="E-mail"
            type="email"
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
          <Stack alignItems={'center'}>
            <styles.Button color="success" type="submit" variant="contained">
              Registrar
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

export default RegisterForm;
