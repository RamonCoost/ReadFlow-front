import { StatusLeitura } from "../enums/status-leitura";

export interface BookResponse {
    id: number;
    titulo: string;
    autor: string;
    totalPaginas: number;
    paginasLidas: number;
    statusLeitura: StatusLeitura;
}


