'use client';

// 1. Mude o nome da importação para 'Sidebar'
import Sidebar from "./Sidebar"; 

// 2. Mantenha o nome da função como AdminLayout
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* 3. Use o componente com o novo nome aqui */}
      <Sidebar />

      <main className="flex-grow-1 bg-light">
        <div className="container-fluid p-4">
          {children}
        </div>
      </main>
    </div>
  );
}