export interface BooksSearchResponse {
    titulo: string;
    autores: string[] | null;
    capa: string | null;
    descricao: string | null;
    editora: string | null;
    totalPaginas: number | null;
}
