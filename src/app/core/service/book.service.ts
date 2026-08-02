import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BookResponse } from '../../shared/models/book-response';
import { Observable } from 'rxjs';
import { CreateBookRequest } from '../../shared/models/create-book-request';
import { UpdateBookRequest } from '../../shared/models/update-book-request';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = environment.api

  constructor(private http: HttpClient) { }

  listarLivros(): Observable<BookResponse[]> {
    return this.http.get<BookResponse[]>(`${this.url}/livros`);
  }

  criarLivro(body: CreateBookRequest): Observable<BookResponse> {
    return this.http.post<BookResponse>(`${this.url}/livros`, body)
  }

  atualizarLivro(id: number, body: UpdateBookRequest): Observable<BookResponse>{
    return this.http.put<BookResponse>(`${this.url}/livros/${id}`, body)
  }

  deletarLivro(id: number): Observable<void>{
   return this.http.delete<void>(`${this.url}/livros/${id}`)
  }
}
