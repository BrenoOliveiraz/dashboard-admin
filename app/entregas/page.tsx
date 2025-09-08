"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CardEntrega from "@/components/CardEntrega";
import { motion, AnimatePresence } from "framer-motion";

export default function EntregasPage() {
  const [entregas, setEntregas] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "entregasRealizadas"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntregas(data);
    };
    fetchData();
  }, []);

  const filteredEntregas = entregas.filter((entrega) => {
    const term = searchTerm.toLowerCase();
    return (
      entrega.cnpj?.toLowerCase().includes(term) ||
      entrega.codigoProjeto?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Entregas Realizadas</h2>

      <input
        type="text"
        placeholder="Buscar por CNPJ ou Número do TPAF"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full max-w-md transition-all"
      />

      <div className="grid gap-4">
        <AnimatePresence mode="wait">
          {filteredEntregas.map((entrega) => (
            <motion.div
              key={entrega.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CardEntrega
                entrega={entrega}
                codigoProjeto={entrega.codigoProjeto}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredEntregas.length === 0 && (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Nenhuma entrega encontrada.
          </motion.p>
        )}
      </div>
    </div>
  );
}
