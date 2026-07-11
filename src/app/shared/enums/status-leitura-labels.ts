import { StatusLeitura } from "./status-leitura";

export const mapStatus: Record<StatusLeitura, string> = {
    [StatusLeitura.QUERO_LER]: "Próxima Leitura", 
    [StatusLeitura.LENDO]: "Em Leitura", 
    [StatusLeitura.CONCLUIDO]: "Concluído", 
    [StatusLeitura.ABANDONEI]: "Abandonado", 
}