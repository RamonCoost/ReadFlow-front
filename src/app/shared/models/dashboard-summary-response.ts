import { StatusLeitura } from "../enums/status-leitura";

export interface DashboardSummaryResponse {

    totalLivros: number;
    totalLivroPorStatus: Record<StatusLeitura, number>;
}
