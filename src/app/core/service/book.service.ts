import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StatusLeitura } from '../../shared/enums/status-leitura';
import { BookResponse } from '../../shared/models/book-response';
import { CreateBookRequest } from '../../shared/models/create-book-request';
import { PageResponse } from '../../shared/models/page-response';
import { UpdateBookRequest } from '../../shared/models/update-book-request';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = environment.api

  constructor(private http: HttpClient) { }

  listarLivros(page: number, size: number, status: StatusLeitura | null, pesquisa: string | null): Observable<PageResponse<BookResponse>> {
    let params: {
      page: number;
      size: number;
      status?: StatusLeitura;
      pesquisa?: string
    } = {
      page,
      size
    }

    if (status != null) {
      params.status = status;
    }

    if (pesquisa != null && pesquisa.trim()) {
      params.pesquisa = pesquisa.trim();
    }

    return this.http.get<PageResponse<BookResponse>>(`${this.url}/livros`, { params });
  }

  criarLivro(body: CreateBookRequest): Observable<BookResponse> {
    return this.http.post<BookResponse>(`${this.url}/livros`, body)
  }

  atualizarLivro(id: number, body: UpdateBookRequest): Observable<BookResponse> {
    return this.http.put<BookResponse>(`${this.url}/livros/${id}`, body)
  }

  deletarLivro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/livros/${id}`)
  }
}
