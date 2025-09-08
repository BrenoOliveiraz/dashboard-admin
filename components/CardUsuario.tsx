import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UsuarioProps {
  nome: string
  email: string
  cnpj: string
  tipo: string
}

export default function CardUsuario({ nome, email, cnpj, tipo }: UsuarioProps) {
  return (
    <Card className="shadow-md rounded-2xl border border-gray-200 hover:bg-gray-100 cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{nome}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">CNPJ:</span> {cnpj}</p>
        <p>
          <span className="font-semibold">Tipo:</span>{" "}
          <Badge variant="default" className="bg-blue-600 text-white">
            {tipo}
          </Badge>
        </p>
      </CardContent>
    </Card>
  )
}
