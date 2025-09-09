'use client'

import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import CardUsuario from '@/components/CardUsuario'
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link'

export default function Usuarios() {
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
      <AnimatePresence mode="wait">

        {usuarios.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <Link href={`/usuarios/${user.id}`}>
              <CardUsuario
                key={user.id}
                nome={user.nome}
                email={user.email}
                cnpj={user.cnpj}
                tipo={user.tipo}
                
              />
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>


  )
}
