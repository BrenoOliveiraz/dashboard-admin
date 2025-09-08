'use client'

import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import CardUsuario from '@/components/CardUsuario'

export default function Page() {
  const [usuarios, setUsuarios] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "usuarios"))
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setUsuarios(data)
    }
    fetchData()
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {usuarios.map((user) => (
        <CardUsuario
          key={user.id}
          nome={user.nome}
          email={user.email}
          cnpj={user.cnpj}
          tipo={user.tipo}
        />
      ))}
    </div>
  )
}
