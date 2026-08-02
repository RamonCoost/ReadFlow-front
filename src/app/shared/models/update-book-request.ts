export interface UpdateBookRequest {
    titulo: string;
    autor: string;
    totalPaginas: number;
    paginasLidas: number;
    abandonado: boolean;
}