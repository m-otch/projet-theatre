import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Spectacles } from '../models/spectacles.model';

@Injectable({
  providedIn: 'root'
})
export class SpectaclesService {
  private baseUrl = 'http://localhost:3000/spectacles';

  constructor(private http: HttpClient) {}

  getSpectacles(): Observable<Spectacles[]> {
    return this.http.get<Spectacles[]>(this.baseUrl);
  }

  getSpectacleById(id: number): Observable<Spectacles> {
    return this.http.get<Spectacles>(`${this.baseUrl}/${id}`);
  }
  
  addSpectacles(spectacles: Spectacles): Observable<Spectacles> {
    return this.http.post<Spectacles>(this.baseUrl, spectacles);
  }

  updateSpectacles(id: number, spectacle: Spectacles): Observable<Spectacles> {
    return this.http.put<Spectacles>(`${this.baseUrl}/${id}`, spectacle);
  }

  deleteSpectacle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}