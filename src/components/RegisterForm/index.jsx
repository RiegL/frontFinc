"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";

export const  RegisterForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

    const handleSubmit = async (e) => {
      e.preventDefault();
      // setMessage('Formulário enviado')
      console.log("email:", email);
      console.log("senha:", password);
      console.log("nome:", name);
      try {
        const response = await axios.post("http://localhost:8080/auth/register", {
          email,
          password,
          name,
        });
        localStorage.setItem("token", response.data.data.token); // Salvar token no local storage
      } catch (error) {
        console.log("Erro ao logar", error.message);
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <Stack maxWidth={250} gap={1}>
        <h1>Register</h1>
        <styles.TextField
          onChange={(e) => setName(e.target.value)}
          id="name"
          label="Nome"
          variant="outlined"
          required
        />
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

export default RegisterForm;
