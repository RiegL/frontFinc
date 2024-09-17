import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button, // Importando o Button do MUI
} from "@mui/material";

export const TransacoesList = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [transacoesTable, setTransacoesTable] = useState([]);
  const [tipo, setTipo] = useState("Todas");
  const [ano, setAno] = useState(""); // Ano selecionado
  const [anos, setAnos] = useState([]); // Anos disponíveis

  useEffect(() => {
    const getTransacao = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/transacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transacoesData = response.data.data;

        setTransacoes(transacoesData);
        setTransacoesTable(transacoesData); // Inicializa a tabela com todas as transações

        // Extrair os anos únicos das transações e ordenar em ordem ascendente
        const anosDisponiveis = [
          ...new Set(
            transacoesData.map((transacao) => dayjs(transacao.data).year())
          ),
        ].sort((a, b) => a - b); // Ordena os anos de forma crescente
        setAnos(anosDisponiveis); // Definir os anos para o select
      } catch (error) {
        console.error("Erro ao buscar transações", error.message);
      }
    };
    getTransacao();
  }, []); // Função para obter todas as transações

  useEffect(() => {
    let transacoesFiltradas = transacoes;

    // Filtro por tipo
    if (tipo === "Receitas") {
      transacoesFiltradas = transacoesFiltradas.filter(
        (transacao) => transacao.tipo === "Receita"
      );
    } else if (tipo === "Despesas") {
      transacoesFiltradas = transacoesFiltradas.filter(
        (transacao) => transacao.tipo === "Despesa"
      );
    }

    // Filtro por ano
    if (ano) {
      transacoesFiltradas = transacoesFiltradas.filter(
        (transacao) => dayjs(transacao.data).year() === parseInt(ano)
      );
    }

    setTransacoesTable(transacoesFiltradas); // Atualiza a tabela com os filtros aplicados
  }, [tipo, ano, transacoes]); // Filtro por tipo (Receitas, Despesas, Todas)

  const Filter = ({ label, isActive, onClick }) => (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        padding: "8px 16px",
        borderBottom: isActive ? "2px solid #299D91" : "none",
        transition: "border-bottom 0.3s",
        color: isActive ? "#299D91" : "inherit",
        fontWeight: isActive ? "bolder" : "normal",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderBottom = "2px solid #299D91";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderBottom = isActive
          ? "2px solid #299D91"
          : "none";
      }}
    >
      {label}
    </div>
  ); //criado para imitar um button

  return (
    <>
      <div style={{ display: "flex", gap: 10, margin: "30px 0" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="ano-select-label">Ano</InputLabel>
          <Select
            labelId="ano-select-label"
            id="ano-select"
            value={ano}
            label="Ano"
            onChange={(e) => setAno(e.target.value)}
          >
            <MenuItem value="">
              <em>Todos os anos</em>
            </MenuItem>
            {anos.map((ano) => (
              <MenuItem key={ano} value={ano}>
                {ano}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Botões estilizados usando MUI Button */}
        <Filter
          label="Todas transações"
          isActive={tipo === "Todas"}
          onClick={() => setTipo("Todas")}
        />
        <Filter
          label="Receitas"
          isActive={tipo === "Receitas"}
          onClick={() => setTipo("Receitas")}
        />
        <Filter
          label="Despesas"
          isActive={tipo === "Despesas"}
          onClick={() => setTipo("Despesas")}
        />
      </div>

      <TableContainer
        component={Paper}
        sx={{ padding: 5, maxWidth: 1000, boxShadow: 3, borderRadius: 2 }}
      >
        <Table
          sx={{ minWidth: 500 }}
          size="small"
          aria-label="tabela de transações"
        >
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Descrição</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Transação
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Data
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Situação
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Valor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transacoesTable.map((transacao) => (
              <TableRow
                key={transacao.descricao}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: dayjs(transacao.data).isBefore(dayjs())
                    ? "#e0f7fa"
                    : "#ffebee",
                }}
              >
                <TableCell component="th" scope="row">
                  {transacao.descricao}
                </TableCell>
                <TableCell align="right">{transacao.tipo}</TableCell>
                <TableCell align="right">
                  {dayjs(transacao.data).format("D MMM, YYYY")}
                </TableCell>
                <TableCell align="right">
                  {dayjs(transacao.data).isBefore(dayjs())
                    ? "realizada"
                    : "planejado"}
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transacao.valor / 100)}{" "}
                  {/* Converte e formata o valor em reais */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
