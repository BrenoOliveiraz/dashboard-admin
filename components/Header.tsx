import React from 'react'

export default function Header() {
    return (
        <header className="bg-white shadow px-6 py-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Administração</h2>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">admin@painel.com</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm">
                    Sair
                </button>
            </div>
        </header>
    )
}
