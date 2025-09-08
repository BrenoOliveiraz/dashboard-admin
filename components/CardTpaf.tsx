import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UsuarioProps {
    nome: string
    email: string
    cnpj: string
    tipo: string
}

export default function CardTpaf({
    cnpjProponente, nomeProponente, numTpaf, produtos }: UsuarioProps) {
    return (
        <Card className="shadow-md rounded-2xl border border-gray-200 hover:bg-gray-100 cursor-pointer">
            <CardHeader>
                <CardTitle className="text-lg font-bold">{nomeProponente}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <p><span className="font-semibold">CNPJ:</span> {cnpjProponente}</p>
                <p><span className="font-semibold">TPAF:</span> {numTpaf}</p>
                <p>
                </p>
            </CardContent>
        </Card>
    )
}
