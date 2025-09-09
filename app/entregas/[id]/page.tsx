"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function EntregaDetalhesPage() {
  const { id } = useParams();
  const [entrega, setEntrega] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    cnpj: "",
    status: "",
    dataEntrega: "",
    horaEntrega: "",
    observacao: "",
    quantidade: "",
    nomeProduto: "",
  });

  useEffect(() => {
    const fetchEntrega = async () => {
      if (!id) return;
      const docRef = doc(db, "entregasRealizadas", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setEntrega({ id: docSnap.id, ...data });

        setFormData({
          cnpj: data.cnpj || "",
          status: data.status || "",
          dataEntrega: data.dataEntrega || "",
          horaEntrega: data.horaEntrega || "",
          observacao: data.observacao || "",
          quantidade: data.quantidade || "",
          nomeProduto: data.produto?.nome || "",
        });
      }
    };

    fetchEntrega();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!id) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, "entregasRealizadas", id as string);
      await updateDoc(docRef, {
        cnpj: formData.cnpj,
        status: formData.status,
        dataEntrega: formData.dataEntrega,
        horaEntrega: formData.horaEntrega,
        observacao: formData.observacao,
        quantidade: formData.quantidade,
        produto: {
          nome: formData.nomeProduto,
        },
      });

      setEntrega((prev: any) => ({
        ...prev,
        ...formData,
        produto: { nome: formData.nomeProduto },
      }));

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar as alterações.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!entrega) {
    return <p>Carregando detalhes da entrega...</p>;
  }

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">
        Entrega {entrega.codigoProjeto}
      </h2>

      <p>
        <strong>CNPJ:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          entrega.cnpj
        )}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {isEditing ? (
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          entrega.status
        )}
      </p>

      <p>
        <strong>Data da Entrega:</strong>{" "}
        {isEditing ? (
          <input
            type="date"
            name="dataEntrega"
            value={formData.dataEntrega}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          entrega.dataEntrega
        )}
      </p>

      <p>
        <strong>Hora da Entrega:</strong>{" "}
        {isEditing ? (
          <input
            type="time"
            name="horaEntrega"
            value={formData.horaEntrega}
            onChange={handleChange}
            className="border p-1 rounded"
          />
        ) : (
          entrega.horaEntrega
        )}
      </p>

      <p>
        <strong>Observação:</strong>{" "}
        {isEditing ? (
          <textarea
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        ) : (
          entrega.observacao || "Nenhuma"
        )}
      </p>

      <div className="mt-4">
        <h3 className="font-semibold">Produto</h3>

        <p>
          <strong>Nome:</strong>{" "}
          {isEditing ? (
            <input
              type="text"
              name="nomeProduto"
              value={formData.nomeProduto}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : (
            entrega.produto?.nome
          )}
        </p>

        <p>
          <strong>Quantidade:</strong>{" "}
          {isEditing ? (
            <input
              type="number"
              name="quantidade"
              value={formData.quantidade}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : (
            entrega.quantidade
          )}
        </p>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          className="border rounded-sm cursor-pointer bg-blue-100 p-1.5"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancelar Edição" : "Habilitar Edição"}
        </button>

        {isEditing && (
          <button
            className="border rounded-sm cursor-pointer bg-green-200 p-1.5"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </button>
        )}
      </div>
    </div>
  );
}
