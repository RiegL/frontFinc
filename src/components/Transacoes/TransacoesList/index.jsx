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

export const TransacoesList = () => {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    const getTransacao = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/transacoes", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTransacoes(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar categorias", error.message);
      }
    };
    getTransacao();
  }, []);

  return (
    <TableContainer 
      component={Paper} 
      sx={{ padding: 5, maxWidth: 1000, boxShadow: 3, borderRadius: 2 }}
    >
      <Table sx={{ minWidth: 500 }} size="small" aria-label="tabela de transações">
        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Descrição</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Transação</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Data</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Situação</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transacoes.map((transacao) => (
            <TableRow
              key={transacao.descricao}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: dayjs(transacao.data).isBefore(dayjs()) ? '#e0f7fa' : '#ffebee',
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
                {dayjs(transacao.data).isBefore(dayjs()) ? 'realizada' : 'planejado'}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                R$ {(transacao.valor / 100).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
