"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export const MetasCreate = () => {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataMeta, setDataMeta] = useState("");
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
        "http://localhost:8080/metas",
        { descricao, valor,data:dataMeta },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlertMessage({
        show: true,
        message: "Meta criada com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao criar Meta", error.message);
      setAlertMessage({
        show: true,
        message: "Erro ao criar Meta",
        severity: "error",
      });
    }
  };

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <styles.h1>Criar uma meta</styles.h1>
          <styles.TextField
            onChange={(e) => setDescricao(e.target.value)}
            id="meta"
            label="Meta"
            variant="outlined"
            type="text"
            name="meta"
            required
          />
          <styles.TextField
            onChange={(e) => setValor(e.target.value)}
            id="valor"
            label="Valor"
            variant="outlined"
            type="text"
            name="valor"
            required
          />
          <styles.TextField
            onChange={(e) => setDataMeta(e.target.value)}
            id="dataMeta"
            label="Data"
            variant="outlined"
            type="text"
            name="dataMeta"
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

export default MetasCreate;
