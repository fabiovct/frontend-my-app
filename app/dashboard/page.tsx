import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Área protegida do sistema</p>
            <Link href="/usuarios" className="btn btn-primary mt-3">
        Ir para Usuários
      </Link>
    </div>
  );
}
