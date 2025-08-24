import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar fixa */}
        <Navbar />

        {/* Conteúdo principal */}
        <div className="flex flex-col flex-1">
          {/* Header fixo */}
          <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Administração</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">admin@painel.com</span>
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                Sair
              </button>
            </div>
          </header>

          {/* Área da página */}
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
