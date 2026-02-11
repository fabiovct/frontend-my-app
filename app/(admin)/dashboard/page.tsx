"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/src/services/api";
import { useState, useEffect, FormEvent } from "react";

interface Dados {
  id?: number;
  name_sistema: string;
  chuva?: number;
//   preco: number;
  volumeUtilArmazenadoPorcentagem?: number;
//   categoria?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [dados, setDados] = useState<Dados[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

    async function carregarDados() {
    try {
      setCarregando(true);
      const response = await api.get("/dashboard/data");
      setDados(response.data.data || response.data || []);
      setErro("");
    } catch (err: any) {
      setErro(
        err.response?.data?.message || "Erro ao carregar dados"
      );
      console.error("Erro ao carregar dados:", err);
    } finally {
      setCarregando(false);
    }
  }

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");

      alert(response.data.message);
      // Redireciona para o login após o servidor invalidar o cookie
      router.push("/");
    } catch (err: any) {
      console.error("Erro ao deslogar", err);
    }
  };

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Dados Reservatórios</h1>
          {/* <button
            className="btn btn-primary"
            onClick={abrirModalNovo}
          >
            + Novo Produto
          </button> */}
        </div>

      {carregando && dados.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : dados.length === 0 ? (
          <div className="alert alert-info">
            Nenhum produto cadastrado. Clique em "Novo Produto" para começar.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Sistema</th>
                  <th>Chuva</th>
                  <th>Percentual</th>
                </tr>
              </thead>
              <tbody>
                {dados.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.name_sistema}</td>
                    <td>{produto.chuva}</td>
                    <td>{produto.volumeUtilArmazenadoPorcentagem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
  );
}
