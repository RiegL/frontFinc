"use client";

import { Stack } from "@mui/material";
import * as styles from "./style";
import { useState, forwardRef } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { NumericFormat } from "react-number-format";

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="R$"
    />
  );
});

export const MetasCreate = () => {
  const [open, setOpen] = React.useState(false);
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
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/metas",
        { descricao, valor, data: dataMeta },
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
          Criar nova meta
        </Button>
        <Dialog
          fullWidth
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              handleClose();
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>Nova meta</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="meta"
              name="meta"
              label="Meta"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setDescricao(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            {/* <TextField
              autoFocus
              required
              margin="dense"
              id="valor"
              name="valor"
              label="Valor"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setValor(e.target.value)}
            /> */}
            <TextField
            fullWidth
              required
              label="Valor"
              name="valor"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumericFormatCustom,
              }}
              variant="standard"
              onChange={(e) => setValor(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="data"
              name="data"
              type="date"
              fullWidth
              variant="standard"
              onChange={(e) => setDataMeta(e.target.value)}
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

export default MetasCreate;
