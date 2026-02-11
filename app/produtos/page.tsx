"use client";

import { useState, useEffect, FormEvent } from "react";
import { api } from "@/src/services/api";

interface Produto {
  id?: number;
  name: string;
  description?: string;
//   preco: number;
  qtd?: number;
//   categoria?: string;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  // Formulário
  const [name, setNome] = useState("");
  const [description, setDescricao] = useState("");
//   const [preco, setPreco] = useState("");
  const [qtd, setQuantidade] = useState("");
//   const [categoria, setCategoria] = useState("");

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    try {
      setCarregando(true);
      const response = await api.get("/list");
      setProdutos(response.data.data || response.data || []);
      setErro("");
    } catch (err: any) {
      setErro(
        err.response?.data?.message || "Erro ao carregar produtos"
      );
      console.error("Erro ao carregar produtos:", err);
    } finally {
      setCarregando(false);
    }
  }

  function abrirModalNovo() {
    setProdutoEditando(null);
    setNome("");
    setDescricao("");
    // setPreco("");
    setQuantidade("");
    // setCategoria("");
    setErro("");
    setMostrarModal(true);
  }

  function abrirModalEditar(produto: Produto) {
    setProdutoEditando(produto);
    setNome(produto.name);
    setDescricao(produto.description || "");
    // setPreco(produto.preco.toString());
    setQuantidade(produto.qtd?.toString() || "");
    // setCategoria(produto.categoria || "");
    setErro("");
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
    setProdutoEditando(null);
    setErro("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    try {
      const dadosProduto: Produto = {
        name,
        description: description || undefined,
        // preco: parseFloat(preco),
        qtd: qtd ? parseInt(qtd) : undefined,
        // categoria: categoria || undefined,
      };

      if (produtoEditando?.id) {
        // Atualizar
        await api.put(`/list/${produtoEditando.id}`, dadosProduto);
      } else {
        // Criar
        await api.post("/list", dadosProduto);
      }

      fecharModal();
      carregarProdutos();
    } catch (err: any) {
      setErro(
        err.response?.data?.message || 
        `Erro ao ${produtoEditando ? "atualizar" : "criar"} produto`
      );
      console.error("Erro ao salvar produto:", err);
    }
  }

  async function handleDeletar(id: number) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      await api.delete(`/list/${id}`);
      carregarProdutos();
    } catch (err: any) {
      setErro(
        err.response?.data?.message || "Erro ao excluir produto"
      );
      console.error("Erro ao deletar produto:", err);
    }
  }

  return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Produtos</h1>
          <button
            className="btn btn-primary"
            onClick={abrirModalNovo}
          >
            + Novo Produto
          </button>
        </div>

        {erro && !mostrarModal && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {erro}
            <button
              type="button"
              className="btn-close"
              onClick={() => setErro("")}
            ></button>
          </div>
        )}

        {carregando && produtos.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : produtos.length === 0 ? (
          <div className="alert alert-info">
            Nenhum produto cadastrado. Clique em "Novo Produto" para começar.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  {/* <th>Preço</th> */}
                  <th>Quantidade</th>
                  {/* <th>Categoria</th> */}
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.name}</td>
                    <td>{produto.description || "-"}</td>
                    {/* <td>
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(produto.preco)}
                    </td> */}
                    <td>{produto.qtd ?? "-"}</td>
                    {/* <td>{produto.categoria || "-"}</td> */}
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => abrirModalEditar(produto)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeletar(produto.id!)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {mostrarModal && (
          <div
            className="modal show d-block"
            tabIndex={-1}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {produtoEditando ? "Editar Produto" : "Novo Produto"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={fecharModal}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {erro && (
                      <div className="alert alert-danger" role="alert">
                        {erro}
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Nome *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setNome(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Descrição</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescricao(e.target.value)}
                      />
                    </div>

                    {/* <div className="mb-3">
                      <label className="form-label">Preço *</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className="form-control"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                      />
                    </div> */}

                    <div className="mb-3">
                      <label className="form-label">Quantidade</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={qtd}
                        onChange={(e) => setQuantidade(e.target.value)}
                      />
                    </div>

                    {/* <div className="mb-3">
                      <label className="form-label">Categoria</label>
                      <input
                        type="text"
                        className="form-control"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                      />
                    </div> */}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={fecharModal}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {produtoEditando ? "Atualizar" : "Criar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}
