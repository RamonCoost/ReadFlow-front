export interface CreateBookRequest {
    titulo: string;
    autor: string;
    capa: string | null; 
    totalPaginas: number;
    paginasLidas: number;
}
