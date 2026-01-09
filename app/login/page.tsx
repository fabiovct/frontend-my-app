"use client";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === "admin@email.com" && senha === "123456") {
      alert("Login realizado com sucesso!");
    } else {
      setErro("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <form
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: 360 }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-3">Login</h3>

        {erro && <div className="alert alert-danger">{erro}</div>}

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

        <button className="btn btn-primary w-100" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
