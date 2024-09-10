"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import * as styles from "./style";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { NumericFormat } from "react-number-format";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="R$ "
    />
  );
});

export const TransacoesCreate = () => {
  const [open, setOpen] = React.useState(false);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [dataTransacao, setDataTransacao] = useState("");
  const [tipo, setTipo] = useState("Receita");
  const [categoria, setCategoria] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/categorias", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("PEGANDO CATEGORIAS ->", response.data.data);

        // Verifique se response.data.data é um array
        if (Array.isArray(response.data.data)) {
          setCategorias(response.data.data);
        } else {
          console.error("Dados recebidos não são um array", response.data.data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias", error.message);
        setAlertMessage({
          show: true,
          message: "Erro ao buscar categorias",
          severity: "error",
        });
      }
    };
    getCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valorEmCentavos = valor * 100;
    try {
      const formattedDate = dayjs(dataTransacao).format("YYYY-MM-DD");
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/transacoes",
        {
          descricao,
          valor: valorEmCentavos,
          data: formattedDate,
          tipo,
          categoria_id: categoria,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAlertMessage({
        show: true,
        message: "Transação realizada com sucesso!",
        severity: "success",
      });
    } catch (error) {
      console.error("Erro ao realizar uma transação", error.message);
      setAlertMessage({
        show: true,
        message: "Erro ao realizar transação",
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
        <Stack gap={1}>
          <Button
            variant="contained"
            sx={{ width: "auto" }}
            onClick={handleClickOpen}
          >
            Criar nova transação
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
            <DialogTitle sx={{ textAlign: "center" }}>
              Nova transação
            </DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="descricao"
                name="descricao"
                label="Descrição"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setDescricao(e.target.value)}
              />
            </DialogContent>
            <DialogContent>
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
              <FormControl fullWidth variant="standard">
                <InputLabel id="tipo">Tipo</InputLabel>
                <Select
                  labelId="tipo"
                  id="tipo_select"
                  name="tipo"
                  value={tipo}
                  label="Tipo"
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <MenuItem value="Despesa">Despesa</MenuItem>
                  <MenuItem value="Receita">Receita</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogContent>
              <FormControl fullWidth variant="standard">
                <InputLabel id="categoria">Categoria</InputLabel>
                <Select
                  labelId="categoria"
                  id="categoria_select"
                  name="categoria"
                  value={categoria}
                  label="Categoria"
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {Array.isArray(categorias) &&
                    categorias.map((categoria) => (
                      <MenuItem key={categoria.id} value={categoria.id}>
                        {categoria.nome}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogContent 
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      
                      
                      label="Data"
                      onChange={(newValue) => setDataTransacao(newValue)}
                    />
                  </LocalizationProvider>
            </DialogContent>
            <DialogContent>
              <Stack alignItems={"center"}>
                <styles.Button
                  color="success"
                  type="submit"
                  variant="contained"
                >
                  Enviar
                </styles.Button>
              </Stack>
            </DialogContent>
          </Dialog>
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

export default TransacoesCreate;
