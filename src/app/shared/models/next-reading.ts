import { StatusLeitura } from "../enums/status-leitura";

export interface NextReading {
    id: number;
    titulo: string;
    autor: string;
    statusLeitura: StatusLeitura
}
