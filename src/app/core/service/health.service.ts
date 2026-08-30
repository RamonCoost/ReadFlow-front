import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HealthResponse } from '../../shared/models/health-response';


type EstadoBackend = 'Iniciando' | 'Disponivel' | 'Error';

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  private readonly url = environment.api

  estadoBackend = signal<EstadoBackend>('Iniciando');

  constructor(private http: HttpClient) { }


  verificarBackend(): void {
    this.http.get<HealthResponse>(`${this.url}/health`)
      .subscribe({
        next: () => this.estadoBackend.set('Disponivel'),
        error: () => this.estadoBackend.set('Error')
      })
  }


  tentarNovamente() {
    this.estadoBackend.set('Iniciando');
    this.verificarBackend();
  }
}