"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CardEntrega from "@/components/CardEntrega";

export default function EntregasPage() {
  const [entregas, setEntregas] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "entregasRealizadas"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntregas(data);
    };
    fetchData();
  }, []);

  console.log(entregas)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Entregas Realizadas</h2>
      <div className="grid gap-4">
        {entregas.map((e) => (
          <CardEntrega key={e.id} entrega={e} />
        ))}
      </div>
    </div>
  );
}
