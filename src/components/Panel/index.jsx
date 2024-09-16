import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "../Card";
import axios from "axios";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";

export const Panel = () => {
  const [despesas, setDespesas] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    const getTransacao = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/transacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transacoesData = response.data.data;

        // Soma as transações por tipo (despesa e receita)
        const despesasTotal = transacoesData
          .filter((transacao) => transacao.tipo === "Despesa")
          .reduce((acc, curr) => acc + curr.valor, 0);

        const receitasTotal = transacoesData
          .filter((transacao) => transacao.tipo === "Receita")
          .reduce((acc, curr) => acc + curr.valor, 0);

        // Calcula o saldo (receitas - despesas)
        const saldoTotal = receitasTotal - despesasTotal;

        // Atualiza os estados
        setDespesas(despesasTotal);
        setReceitas(receitasTotal);
        setSaldo(saldoTotal);
      } catch (error) {
        console.error("Erro ao buscar transações", error.message);
      }
    };

    getTransacao();
  }, []);

  // Função para formatar os valores em moeda brasileira (R$)
  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Grid container spacing={3} sx={{ maxWidth: "100%" }}>
        <Grid item xs={12} sm={6}>
          <Card
            icon={
              <AccountBalanceWalletRoundedIcon
                fontSize="large"
                sx={{ color: "#299D91" }}
              />
            }
            title="Saldo Atual"
            value={formatarMoeda(saldo)} // Exibe o saldo formatado como moeda
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            icon={
              <SwapHorizRoundedIcon
                fontSize="large"
                sx={{ color: "#299D91" }}
              />
            }
            title="Despesas"
            value={formatarMoeda(despesas)} // Exibe as despesas formatadas como moeda
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            icon={
              <LocalAtmRoundedIcon fontSize="large" sx={{ color: "#299D91" }} />
            }
            title="Receitas"
            value={formatarMoeda(receitas)} // Exibe as receitas formatadas como moeda
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            icon={
              <TrackChangesRoundedIcon
                fontSize="large"
                sx={{ color: "#299D91" }}
              />
            }
            title="Metas"
            value="R$ 400,00" // Exemplo para metas, você pode atualizar isso depois
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Panel;
