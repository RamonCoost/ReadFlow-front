import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardSummaryResponse } from '../../shared/models/dashboard-summary-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = environment.api;
  private readonly http = inject(HttpClient);
  
  constructor() { }

  buscarResumo(): Observable<DashboardSummaryResponse> {
    return this.http.get<DashboardSummaryResponse>(`${this.url}/dashboard/resumo`)
  }

}
