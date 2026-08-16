import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../shared/models/login-request';
import { TokenResponse } from '../../shared/models/token-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = environment.api

  constructor(private http: HttpClient) { }

  login(body: LoginRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.url}/auth/login`, body)
  }

  salvarToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  obterToken(): string | null {
    return sessionStorage.getItem('token');
  }

  removerToken(){
    sessionStorage.removeItem('token')
  }
}
