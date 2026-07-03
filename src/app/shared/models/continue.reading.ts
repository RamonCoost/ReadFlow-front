import { StatusLeitura } from "../enums/status-leitura"

export interface ContinueReading{
    titulo: string
    totalPaginas: number
    paginasLidas: number
    statusLeitura: StatusLeitura
}
