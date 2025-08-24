
export default function CardEntrega({ entrega }: { entrega: any }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="font-semibold">{entrega.produto}</p>
        <p className="text-sm text-gray-500">
          {entrega.data || "Data não informada"} - {entrega.hora || "Hora não informada"}
        </p>
      </div>
      <span className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm">
        {entrega.status}
      </span>
    </div>
  );
}
