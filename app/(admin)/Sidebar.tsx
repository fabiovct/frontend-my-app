'use client';

import { useState } from 'react';
import { LayoutDashboard, Droplet, Users, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Reservatórios', href: '/reservatorios', icon: <Droplet size={20} /> },
    { name: 'Usuários', href: '/usuarios', icon: <Users size={20} /> },
  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* SIDEBAR */}
      <aside 
        className="bg-primary text-white shadow-lg d-flex flex-column"
        style={{ 
          width: isExpanded ? '250px' : '80px', 
          transition: 'width 0.3s ease',
          position: 'fixed',
          height: '100vh',
          zIndex: 1000
        }}
      >
        <div className="p-3 d-flex align-items-center justify-content-between">
          {isExpanded && <span className="fw-bold fs-5">Monitora SP</span>}
          <button 
            className="btn btn-sm text-white" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="nav flex-column mt-3 flex-grow-1 px-2">
          {menuItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`nav-link d-flex align-items-center mb-2 rounded transition-all ${
                pathname === item.href ? 'bg-white text-primary fw-bold' : 'text-white-50'
              }`}
            >
              <div className="me-3">{item.icon}</div>
              {isExpanded && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-top border-white-50">
          <button className="btn btn-link text-white text-decoration-none d-flex align-items-center p-0">
            <LogOut size={20} className="me-3" />
            {isExpanded && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO DINÂMICO */}
      <main 
        className="bg-light w-100"
        style={{ 
          marginLeft: isExpanded ? '250px' : '80px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh'
        }}
      >
        <div className="container-fluid p-4">
          {children}
        </div>
      </main>
    </div>
  );
}