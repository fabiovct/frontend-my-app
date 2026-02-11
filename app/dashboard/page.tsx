// import Link from "next/link";

// export default function DashboardPage() {
//   return (
//     <div className="container">
//       <h1>Dashboard</h1>
//       <p>Área protegida do sistema</p>
//             <Link href="/usuarios" className="btn btn-primary mt-3">
//         Ir para Usuários
//       </Link>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/src/services/api";

export default function DashboardPage() {
  const router = useRouter();

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
    <div className="container mt-5">
      <h1>Dashboard</h1>
      <p>Área protegida do sistema (Sessão via Cookie)</p>
      
      <div className="d-flex gap-2">
        <Link href="/usuarios" className="btn btn-primary">
          Ir para Usuários
        </Link>

        <button 
          onClick={handleLogout} 
          className="btn btn-danger"
        >
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}
