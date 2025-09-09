"use client";

import { useEffect, useState } from "react";
import UltimasEntregas from "@/components/UltimasEntregas";
import Link from "next/link";
import Image from "next/image";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion"; // <-- Importação

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    entregas: null,
    usuarios: null,
    tpafs: null,
  });

  useEffect(() => {
    const fetchAllCounts = async () => {
      try {
        const [entregasSnap, usuariosSnap, tpafsSnap] = await Promise.all([
          getCountFromServer(collection(db, "entregasRealizadas")),
          getCountFromServer(collection(db, "usuarios")),
          getCountFromServer(collection(db, "tpaf")),
        ]);

        setCounts({
          entregas: entregasSnap.data().count,
          usuarios: usuariosSnap.data().count,
          tpafs: tpafsSnap.data().count,
        });
      } catch (error) {
        console.error("Erro ao carregar contadores:", error);
        setCounts({ entregas: 0, usuarios: 0, tpafs: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchAllCounts();
  }, []);

  const renderContador = (valor: number | null) => (
    <p className="text-2xl font-bold">
      {!loading && valor !== null ? (
        valor
      ) : (
        <span className="text-sm font-normal text-gray-500">Carregando...</span>
      )}
    </p>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Entregas realizadas */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition"
          >
            <Link href="/entregas">
              <h3 className="text-lg font-semibold">Entregas realizadas</h3>
              {renderContador(counts.entregas)}
            </Link>
          </motion.div>

          {/* Usuários cadastrados */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition"
          >
            <Link href="/usuarios">
              <h3 className="text-lg font-semibold">Usuários cadastrados</h3>
              {renderContador(counts.usuarios)}
            </Link>
          </motion.div>

          {/* Tpafs ativas */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white shadow rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition"
          >
            <Link href="/tpafs">
              <h3 className="text-lg font-semibold">Tpafs ativas</h3>
              {renderContador(counts.tpafs)}
            </Link>
          </motion.div>

          {/* Últimas entregas */}
          {/* Últimas entregas + Logo lado a lado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-full flex flex-col md:flex-row items-start justify-start gap-50"
          >
            {/* Últimas Entregas */}
            <div className="w-md">
              <UltimasEntregas />
            </div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="self-center md:self-start mt-20"
            >
              <Image
                src="/logo-conab.png"
                alt="Logo Conab"
                width={300}
                height={300}
                className="object-contain"
              />
            </motion.div>
          </motion.div>


        </motion.div>
      </AnimatePresence>
    </div>
  );
}
