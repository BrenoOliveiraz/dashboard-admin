'use client'

import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<any>(null)
  const { id } = useParams()

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    tipo: '',
  })

  useEffect(() => {
    const fetchUsuarios = async () => {
      if (!id) return

      const docRef = doc(db, 'usuarios', id as string)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        setUsuarios({ id: docSnap.id, ...data })

        setFormData({
          nome: data.nome || '',
          email: data.email || '',
          tipo: data.tipo || '',
          cnpj: data.cnpj || '',
        })
      }
    }

    fetchUsuarios()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    if (!id) return
    setIsSaving(true)

    try {
      const docRef = doc(db, 'usuarios', id as string)
      await updateDoc(docRef, {
        nome: formData.nome,
        email: formData.email,
        tipo: formData.tipo,
        cnpj: formData.cnpj
      })

      setUsuarios((prev: any) => ({
        ...prev,
        ...formData,
      }))

      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar as alterações.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!usuarios) {
    return <p className="text-center text-gray-600">Carregando...</p>
  }

  return (
    <div className="bg-gray-100 px-4 py-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Detalhes do Usuário
        </h1>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Nome</p>
            {isEditing ? (
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              <p className="text-lg font-medium text-gray-700">{usuarios.nome}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">Email</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              <p className="text-lg font-medium text-gray-700">{usuarios.email}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">CNPJ</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.cnpj}
                onChange={handleChange}
                className="border rounded p-1 w-full"
              />
            ) : (
              <p className="text-lg font-medium text-gray-700">{usuarios.cnpj}</p>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">Tipo</p>
            {isEditing ? (
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="border rounded p-1 w-full"
              >
                <option value="">Selecione...</option>
                <option value="administrador">Administrador</option>
                <option value="usuario">Usuário</option>
            
              </select>
            ) : (
              <p className="text-lg font-medium text-gray-700 capitalize">{usuarios.tipo}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <button
            className="border rounded bg-blue-100 px-4 py-2 text-sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancelar Edição' : 'Habilitar Edição'}
          </button>

          {isEditing && (
            <button
              className="border rounded bg-green-200 px-4 py-2 text-sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
