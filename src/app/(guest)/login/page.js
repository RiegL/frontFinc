import LoginForm from "@/components/LoginForm";
import style from "./style.module.css";
import { Stack } from "@mui/material";


export const LoginPage = () => {
  return (
    <Stack className={style.container}>
      <Stack className={style.border} >
        <LoginForm />
      </Stack>
    </Stack>
  );
};

export default LoginPage;
