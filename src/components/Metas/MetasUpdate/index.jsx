"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export const MetasUpdate = ({ metaId }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataMeta, setDataMeta] = useState("");
  const [idMeta, setIdMeta] = useState("");
  const [userId, setUserId] = useState();


  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0]; // Retorna apenas a parte da data no formato 'YYYY-MM-DD'
  };


  useEffect(() => {
    const getMeta = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/metas/${metaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDescricao(response.data.data.descricao);
        setValor(response.data.data.valor);
        setDataMeta(formatDate(response.data.data.data));
        setIdMeta(response.data.data.id)
        setUserId(response.data.data.user_id);

        // setAlertMessage({
        //   message: "Categoria buscada com sucesso!",
        //   type: "success",
        // });
      } catch (error) {
        console.error("Erro ao buscar meta", error.message);
        setAlertMessage({
          message: "Erro ao buscar meta escolhida",
          type: "error",
        });
      }
    };
    getMeta();
  }, [metaId]);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/metas/${idMeta}`,
        { descricao, valor, data: formatDate(dataMeta) ,user_id: userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlertMessage({
        message: "Meta atualizada com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar meta", error.message);
      setAlertMessage({
        message: "Erro ao atualizar a meta",
        type: "error",
      });
    }
  };

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <styles.h1>Atualizar meta</styles.h1>
          <styles.TextField
            onChange={(e) => setDescricao(e.target.value)}
            id="meta"
            label="Meta atual"
            placeholder={descricao}
            variant="outlined"
            type="text"
            required
          />
          <styles.TextField
            onChange={(e) => setValor(e.target.value)}
            id="valor"
            label="Valor atual"
             placeholder={valor}
            variant="outlined"
            type="text"
            required
          />
          <styles.TextField
            onChange={(e) => setDataMeta(e.target.value)}
            id="data"
            label="Data atual"
             placeholder={dataMeta}
            variant="outlined"
            type="text"
            required
          />
          <Stack alignItems={"center"}>
            <styles.Button color="success" type="submit" variant="contained">
              atualizar
            </styles.Button>
          </Stack>
        </Stack>
      </styles.Form>
      
      {alertMessage && (
        <Alert
          severity={alertMessage.type}
          onClose={() => setAlertMessage(null)}
          sx={{ width: "100%", maxWidth: "400px" }}
        >
          {alertMessage.message}
        </Alert>
      )}
    </>
  );
};

export default MetasUpdate;
