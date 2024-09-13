"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CategoriasCreate } from "../../../components/Categorias/CategoriasCreate";
import { CategoriasUpdate } from "../../../components/Categorias/CategoriasUpdate";
import { MetasCreate } from "../../../components/Metas/MetasCreate";
import { MetasUpdate } from "../../../components/Metas/MetasUpdate";
import { TransacoesCreate } from "../../../components/Transacoes/TransacoesCreate";
import { TransacoesUpdate } from "../../../components/Transacoes/TransacoesUpdate";
import Chart from "@/components/Charts";

export const DashboardPage = () => {

  const [ user, setUser ] = useState({
    id:null
  });

    useEffect(() => {
        const token = localStorage.getItem("token"); 
        if (!token){ 
            window.location.href = "/login";
        } 
        axios.get("http://localhost:8080/users/me", {
            headers: { Authorization: `Bearer ${token}` },
        }).then(response =>{
          setUser(response.data.data);
        }).catch(error => {
            window.location.href = "/login";
        })

    }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* <CategoriasCreate />   */}
      {/* <CategoriasUpdate categoriaId={1} /> */}
      {/* <MetasCreate /> */}
      {/* <MetasUpdate metaId={6}/> */}
      {/* <TransacoesCreate/> */}
      {/* <TransacoesUpdate metaId={9}/> */}
      <Chart/>
    </div>
  );
};

export default DashboardPage;
