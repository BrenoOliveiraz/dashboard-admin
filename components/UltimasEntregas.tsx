"use client";
import { useEffect, useState } from "react";

import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Entrega {
    id: string;
    cnpj: string;
    codigoProjeto: string;
    criadoEm: Date;
    dataEntrega: string;
    horaEntrega: string;
    produto: {
        nome: string;
        produtoId: string;

    };
    quantidade: number;
}

export default function UltimasEntregas() {
    const [entregas, setEntregas] = useState<Entrega[]>([]);

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const q = query(
                    collection(db, "entregasRealizadas"),
                    orderBy("criadoEm", "desc"),
                    limit(5)
                );

                const querySnapshot = await getDocs(q);

                const entregasList: Entrega[] = querySnapshot.docs.map((doc) => ({
                    id: doc.id,


                    ...doc.data(),
                })) as Entrega[];

                setEntregas(entregasList);
            } catch (error) {
                console.error("Erro ao buscar entregas: ", error);
            }
        };

        fetchEntregas();
    }, []);

    return (
        <div className="bg-white shadow rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Últimas Entregas</h3>
            <ul className="space-y-3">
                {entregas.map((entrega) => (
                    <li key={entrega.id} className="border-b pb-2">
                        <p className="font-bold">{entrega.produto?.nome}</p>
                        <p className="text-sm text-gray-600">
                            {entrega.dataEntrega} às {entrega.horaEntrega}
                        </p>
                        <p className="text-sm">Qtd: {entrega.quantidade}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
