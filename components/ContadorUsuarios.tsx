"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContadorUsuarios() {
  const [totalUsuarios, setTotalUsuarios] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const coll = collection(db, "usuarios");
        const snapshot = await getCountFromServer(coll);
        setTotalUsuarios(snapshot.data().count);
      } catch (error) {
        console.error("Erro ao contar entregas:", error);
        setTotalUsuarios(0);
      }
    };

    fetchCount();
  }, []);

  return (
    <p className="text-2xl font-bold">
      {totalUsuarios !== null ? (
        totalUsuarios
      ) : (
        <span className="text-sm font-normal text-gray-500">Carregando...</span>
      )}
    </p>

  );
}
