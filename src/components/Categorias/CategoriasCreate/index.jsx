"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const CategoriasCreate = () => {
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
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
  }; //cria a categoria

  const handleClickOpen = () => {
    setOpen(true);
  }; //abre o dialog

  const handleClose = () => {
    setOpen(false);
  }; //fecha o dialog

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Button
          variant="contained"
          sx={{ width: "auto" }}
          onClick={handleClickOpen}
        >
          Criar nova categoria
        </Button>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: () => {
              handleClose();
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>Nova categoria</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nome"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setNome(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" color="primary">
              Criar
            </Button>
          </DialogActions>
        </Dialog>
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
