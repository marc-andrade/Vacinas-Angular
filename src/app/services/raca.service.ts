import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raca } from '../models/Raca';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RacaService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Raca>{
    console.log(id)
    return this.http.get<Raca>(`${API_CONFIG.baseUrl}/racas/${id}`);
  }

  findAll(): Observable<Raca> {
    return this.http.get<Raca>(`${API_CONFIG.baseUrl}/racas`);
  }

  create(raca: Raca): Observable<Raca> {
    return this.http.post<Raca>(`${API_CONFIG.baseUrl}/racas`, raca);
  }

  update(raca: Raca): Observable<Raca> {
    return this.http.put<Raca>(`${API_CONFIG.baseUrl}/racas/${raca.id}`, raca);
  }

  delete(id: any): Observable<Raca>{
    return this.http.delete<Raca>(`${API_CONFIG.baseUrl}/racas/${id}`);
  }
}
