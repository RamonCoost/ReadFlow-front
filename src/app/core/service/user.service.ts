import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../../shared/models/user-request';
import { Observable } from 'rxjs';
import { UserResponse } from '../../shared/models/user-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   private readonly url = environment.api

  constructor(private http: HttpClient) {}

  criarUsuario(body: UserRequest): Observable<UserResponse>{
    return this.http.post<UserResponse>(`${this.url}/usuario`, body)
  }
}
