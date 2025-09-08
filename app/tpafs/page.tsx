"use client";

import CardTpaf from "@/components/CardTpaf";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";




export default function Tpafs() {
  const [tpafs, setTpafs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "tpaf"))
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setTpafs(data)
    }
    fetchData()
  }, [])

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {tpafs.map((tpaf) => (
        <motion.div
          key={tpaf.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >

          <CardTpaf
            key={tpaf.id}
            cnpjProponente={tpaf.cnpjProponente}
            nomeProponente={tpaf.nomeProponente}
            numTpaf={tpaf.numTpaf}
            produtos={tpaf.produtos}


          />

        </motion.div>

      ))}
    </div>
  )



}