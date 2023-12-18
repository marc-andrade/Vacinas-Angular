import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Vacina } from '../models/Vacina';

@Injectable({
  providedIn: 'root'
})
export class VacinasService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Vacina>{
    return this.http.get<Vacina>(`${API_CONFIG.baseUrl}/vacinas/${id}`);
  }

  findAll(): Observable<Vacina[]> {
    return this.http.get<Vacina[]>(`${API_CONFIG.baseUrl}/vacinas`);
  }

  create(vacina: Vacina): Observable<Vacina> {
    return this.http.post<Vacina>(`${API_CONFIG.baseUrl}/vacinas`, vacina);
  }

  update(vacina: Vacina): Observable<Vacina> {
    return this.http.put<Vacina>(`${API_CONFIG.baseUrl}/vacinas/${vacina.id}`, vacina);
  }

  delete(id: any): Observable<Vacina>{
    return this.http.delete<Vacina>(`${API_CONFIG.baseUrl}/vacinas/${id}`);
  }
}
