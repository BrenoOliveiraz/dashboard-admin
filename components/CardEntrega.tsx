import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CardEntrega({ entrega }: { entrega: any }) {
  return (
    <Card className="shadow-md rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          {entrega.produto?.nome || "Produto não informado"}
        </CardTitle>
        {entrega.codigoProjeto && (
          <p className="text-sm text-gray-500">
            Tpaf: {entrega.codigoProjeto}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <p>
            Entrega: {entrega.dataEntrega || "Data não informada"} -{" "}
            {entrega.horaEntrega || "Hora não informada"}
          </p>
        </div>
        <Badge
          variant="secondary"
          className={`text-white px-3 py-1 rounded-lg text-sm ${
            entrega.status === "Concluído"
              ? "bg-green-500"
              : entrega.status === "Pendente"
              ? "bg-yellow-500"
              : "bg-gray-400"
          }`}
        >
          {entrega.status || "Sem status"}
        </Badge>
      </CardContent>
    </Card>
  )
}
