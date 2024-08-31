"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export const CategoriasCreate = () => {
  const [nome, setNome] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        "http://localhost:8080/categorias",
        { nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlertMessage({
        show: true,
        message: "Categoria criada com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao criar categoria", error.message);
      setAlertMessage({
        show: true,
        message: "Erro ao criar categoria",
        severity: "error",
      });
    }
  };

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <styles.h1>Criar uma categoria</styles.h1>
          <styles.TextField
            onChange={(e) => setNome(e.target.value)}
            id="categoria"
            label="Categoria"
            variant="outlined"
            type="text"
            required
          />
          <Stack alignItems={"center"}>
            <styles.Button color="success" type="submit" variant="contained">
              Criar
            </styles.Button>
          </Stack>
        </Stack>
      </styles.Form>
      <Snackbar
        open={alertMessage.show}
        autoHideDuration={6000}
        onClose={() => setAlertMessage({ ...alertMessage, show: false })}
      >
        <Alert
          onClose={() => setAlertMessage({ ...alertMessage, show: false })}
          severity={alertMessage.severity}
          sx={{ width: "100%" }}
        >
          {alertMessage.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CategoriasCreate;
