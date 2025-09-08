"use client";

import CardTpaf from "@/components/CardTpaf";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";




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

  return(
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {tpafs.map((tpaf)=>(
        <CardTpaf
          key={tpaf.id}
          cnpjProponente={tpaf.cnpjProponente}
          nomeProponente={tpaf.nomeProponente}
          numTpaf={tpaf.numTpaf}
          produtos={tpaf.produtos}
        

        />

      ))}
    </div>
  )



}