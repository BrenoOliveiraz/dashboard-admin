"use client";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Polpa de Abacaxi", value: 10 },
  { name: "Polpa de Caju", value: 5 },
];

export default function GraficosPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Estatísticas</h2>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
