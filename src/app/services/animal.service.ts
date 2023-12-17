import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../models/Animal';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  findById(id:any): Observable<Animal>{
    return this.http.get<Animal>(`${API_CONFIG.baseUrl}/animais/${id}`);
  }

  findAll(): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${API_CONFIG.baseUrl}/animais`);
  }

  create(animal: Animal): Observable<Animal> {
    console.log(animal)
    return this.http.post<Animal>(`${API_CONFIG.baseUrl}/animais`, animal);
  }

  update(animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(`${API_CONFIG.baseUrl}/animais/${animal.id}`, animal);
  }

  delete(id: any): Observable<Animal>{
    return this.http.delete<Animal>(`${API_CONFIG.baseUrl}/animais/${id}`);
  }
}
