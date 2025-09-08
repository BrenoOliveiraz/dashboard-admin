"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ContadorEntregas() {
  const [totalEntregas, setTotalEntregas] = useState<number | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const coll = collection(db, "entregasRealizadas");
        const snapshot = await getCountFromServer(coll);
        setTotalEntregas(snapshot.data().count);
      } catch (error) {
        console.error("Erro ao contar entregas:", error);
        setTotalEntregas(0);
      }
    };

    fetchCount();
  }, []);

  return (
    <p className="text-2xl font-bold">
      {totalEntregas !== null ? (
        totalEntregas
      ) : (
        <span className="text-sm font-normal text-gray-500">Carregando...</span>
      )}
    </p>
  );

}
