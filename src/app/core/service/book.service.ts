import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BookResponse } from '../../shared/models/book-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = environment.api

  constructor(private http: HttpClient) { }

  listarLivros(): Observable<BookResponse[]> {
    return this.http.get<BookResponse[]>(`${this.url}/livros`);
  }
}
