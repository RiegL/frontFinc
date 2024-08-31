"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState, useEffect } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export const CategoriasUpdate = ({ categoriaId }) => {
  const [nome, setNome] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [catId, setCatId] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/categorias/${categoriaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNome(response.data.data.nome);
        setCatId(response.data.data.id);
        setUserId(response.data.data.user_id);
        // setAlertMessage({
        //   message: "Categoria buscada com sucesso!",
        //   type: "success",
        // });
      } catch (error) {
        console.error("Erro ao buscar categoria", error.message);
        setAlertMessage({
          message: "Erro ao buscar categoria escolhida",
          type: "error",
        });
      }
    };
    getCategoria();
  }, [categoriaId]);

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
        `http://localhost:8080/categorias/${catId}`,
        { nome },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlertMessage({
        message: "Categoria atualizada com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao atualizar categoria", error.message);
      setAlertMessage({
        message: "Erro ao atualizar a categoria",
        type: "error",
      });
    }
  };

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={1}>
          <styles.h1>Atualizar categoria</styles.h1>
          <styles.TextField
            onChange={(e) => setNome(e.target.value)}
            id="categoria"
            label="categoria atual"
            placeholder={nome}
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

export default CategoriasUpdate;
