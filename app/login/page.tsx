"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { api } from "@/src/services/api";

export default function LoginPage() {
  const router            = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro]   = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro("");

    try {
      const response = await api.post("/login", {
        email,
        password: senha,
      });

      const { token, user } = response.data;

      // Salvar token (exemplo simples)
      // localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/`;


      console.log("Usuário logado:", user);
      alert("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (err: any) {
      setErro(
        err.response?.data?.message || "Erro ao realizar login"
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 shadow"
      style={{ maxWidth: 360 }}
    >
      <h4 className="text-center mb-3">Login</h4>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">E-mail</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Senha</label>
        <input
          type="password"
          className="form-control"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Entrar
      </button>
    </form>
  );
}
