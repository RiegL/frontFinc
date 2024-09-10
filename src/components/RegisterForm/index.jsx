"use client";
import {
  Stack,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import * as styles from "./style";
import { useState } from "react";
import axios from "axios";
import sx from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    show: false,
    message: "",
    severity: "",
  });
  const router = useRouter();

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
        show: true,
        message: "Usuário registrado com sucesso! Levando para o Login",
        severity: "success",
      });
      setTimeout(() => {
        router.push("/login");
      },2000)
    } catch (error) {
      console.error("Erro ao registrar", error.message);
      setAlertMessage({
        show: true,
        message: error.response.data.error,
        severity: "error",
      });
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <styles.Form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <styles.TP variant="h3" color="primary">
            YOURfinance.io
          </styles.TP>
          <TextField
            onChange={(e) => setName(e.target.value)}
            id="name"
            label="Nome"
            type="text"
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            label="E-mail"
            variant="outlined"
            type="email"
            required
            fullWidth
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            label="Senha"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack alignItems={"center"}>
            <styles.Button
              color="primary"
              type="submit"
              variant="contained"
              fullWidth
            >
              Fazer cadastro
            </styles.Button>
          </Stack>
          <Stack alignItems="center" mt={3}>
            <Stack className={sx.text}>Já possui uma conta?</Stack>

            <Link className={sx.clickAqui} href="/login" passHref>
              Faça login aqui
            </Link>
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
