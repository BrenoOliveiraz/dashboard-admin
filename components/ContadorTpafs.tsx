'use client'

import { db } from '@/lib/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { useEffect, useState } from 'react'

export default function ContadorTpafs() {
    const [totalTpafs, setTotalTpafs] = useState('')

      useEffect(() => {
    const fetchCount = async () => {
      try {
        const coll = collection(db, "tpaf");
        const snapshot = await getCountFromServer(coll);
        setTotalTpafs(snapshot.data().count);
      } catch (error) {
        console.error("Erro ao contar entregas:", error);
        setTotalTpafs(0);
      }
    };

    fetchCount();
  }, []);


  return (
     <p className="text-2xl font-bold">
      {totalTpafs !== null ? (
        totalTpafs
      ) : (
        <span className="text-sm font-normal text-gray-500">Carregando...</span>
      )}
    </p>
  )
}
