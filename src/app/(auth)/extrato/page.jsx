"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CategoriasCreate } from "../../../components/Categorias/CategoriasCreate";
import { MetasCreate} from "../../../components/Metas/MetasCreate"
import {TransacoesCreate} from "../../../components/Transacoes/TransacoesCreate"
import {TransacoesList} from "../../../components/Transacoes/TransacoesList"

export const ExtratoPage = () => {
  const [user, setUser] = useState({
    id: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    axios
      .get("http://localhost:8080/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        window.location.href = "/login";
      });
  }, []);

  return (
    <>
    <div style={{ display: "flex", gap:'2%'}}>
      <TransacoesCreate/>
      <CategoriasCreate/>
      <MetasCreate/>
    </div>
    <TransacoesList/>
    </>
   
  );
};

export default ExtratoPage;
