import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar fixa */}
        <Navbar />

      
        <div className="flex flex-col flex-1">

        <Header />

          {/* Área da página */}
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
