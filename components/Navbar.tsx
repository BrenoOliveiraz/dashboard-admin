"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/entregas", label: "Entregas", icon: "🚚" },
    { href: "/usuarios", label: "Usuários", icon: "👤" },
    { href: "/graficos", label: "Gráficos", icon: "📈" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <h1 className="text-xl font-bold p-6 border-b">Painel Admin</h1>
      <nav className="flex-1 p-4 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
