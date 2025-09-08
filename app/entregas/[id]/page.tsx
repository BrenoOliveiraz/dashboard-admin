"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";


export default function EntregaDetalhesPage() {
  const { id } = useParams();
  const [entrega, setEntrega] = useState<any>(null);

  useEffect(() => {
    const fetchEntrega = async () => {
      if (!id) return;
      const docRef = doc(db, "entregasRealizadas", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEntrega({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchEntrega();
  }, [id]);

  if (!entrega) {
    return <p>Carregando detalhes da entrega...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">
        Entrega {entrega.codigoProjeto}
      </h2>

      <p><strong>CNPJ:</strong> {entrega.cnpj}</p>
      <p><strong>Status:</strong> {entrega.status}</p>
      <p><strong>Data da Entrega:</strong> {entrega.dataEntrega}</p>
      <p><strong>Hora da Entrega:</strong> {entrega.horaEntrega}</p>
      <p><strong>Observação:</strong> {entrega.observacao || "Nenhuma"}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Produto</h3>
        <p><strong>Nome:</strong> {entrega.produto?.nome}</p>
        <p><strong>Quantidade:</strong> {entrega.quantidade}</p>
      </div>
    </div>
  );
}
