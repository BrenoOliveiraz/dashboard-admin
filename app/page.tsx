import UltimasEntregas from "@/components/UltimasEntregas";
import ContadorEntregas from "@/components/ContadorEntregas";
import Link from "next/link";
import ContadorUsuarios from "@/components/ContadorUsuarios";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition">
          <Link href="/entregas">
            <h3 className="text-lg font-semibold">Entregas</h3>
            <ContadorEntregas /> {/* 👈 Aqui mostra o número real de entregas */}
          </Link>
        </div>

        <div className="bg-white shadow rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition">
          <Link href="/usuarios">
            <h3 className="text-lg font-semibold">Usuários</h3>
            <ContadorUsuarios />
          </Link>
        </div>

        <div className="bg-white shadow rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition">
          <h3 className="text-lg font-semibold">Produtos</h3>
          <p className="text-2xl font-bold">12</p>
        </div>

        <UltimasEntregas />
        <Image
          src="/logo-conab.png"
          alt="Logo Conab"
          width={300}   
          height={300}  
          className="justify-self-end self-center" 
        />


      </div>
    </div>
  );
}
