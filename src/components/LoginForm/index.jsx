"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";

export const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage('Formulário enviado')
    console.log("email:", email);
    console.log("senha:", password);
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.data.token); // Salvar token no local storage
    } catch (error) {
      console.log("Erro ao logar", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack maxWidth={250} gap={1}>
        <h1>login</h1>
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
        <styles.Button color="success" type="submit" variant="contained">
          Entrar
        </styles.Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
