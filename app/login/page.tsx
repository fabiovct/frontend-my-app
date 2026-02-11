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
   <div 
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{ 
        // Substitua pelo nome exato do arquivo que você salvou
        backgroundImage: 'url("/imagens/fundo_login.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
    
      {/* Camada de escurecimento (Overlay) para dar contraste */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Escurece 40% da imagem
          zIndex: 1
        }}
      ></div>
  <form
    onSubmit={handleSubmit}
    className="card p-4 shadow-lg border-0"
    style={{ maxWidth: 400, width: '100%', borderRadius: '15px', position: 'relative', zIndex: 2 }}
  >
    <div className="text-center mb-4">
      <h3 className="fw-bold text-primary">Bem-vindo</h3>
      <p className="text-muted">Faça login para continuar</p>
    </div>

    {erro && (
      <div className="alert alert-danger py-2" role="alert">
        <small>{erro}</small>
      </div>
    )}

    <div className="mb-3">
      <label className="form-label fw-semibold text-secondary">E-mail</label>
      <input
        type="email"
        className="form-control form-control-lg bg-light border-0"
        placeholder="exemplo@email.com"
        value={email}
        style={{ fontSize: '0.9rem' }}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div className="mb-4">
      <label className="form-label fw-semibold text-secondary">Senha</label>
      <input
        type="password"
        className="form-control form-control-lg bg-light border-0"
        placeholder="••••••••"
        value={senha}
        style={{ fontSize: '0.9rem' }}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
    </div>

    <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm fw-bold">
      Entrar
    </button>

    <div className="text-center mt-4">
      <small className="text-muted">
        Esqueceu a senha? <a href="#" className="text-decoration-none">Recuperar</a>
      </small>
    </div>
  </form>
{/* Créditos da Imagem Posicionados Corretamente */}
  <div 
    className="fixed-bottom text-center pb-3" 
    style={{ zIndex: 2 }}
  >
    <a 
      href="https://br.freepik.com/fotos-gratis/maravilhoso-nascer-do-sol-em-uma-manha-de-agosto-em-durdle-door-em-dorset-inglaterra_9971295.htm#fromView=search&page=3&position=48&uuid=8f1a924c-c311-427f-a43d-9bfc46cf8bf8&from_element=images_discover&query=images"
      className="text-white-50 text-decoration-none" 
      style={{ fontSize: '0.75rem' }}
    >
      Imagem de wirestock no Freepik
    </a>
  </div>
</div>
  );
}
