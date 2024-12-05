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

  addSpectacles(spectacles: Spectacles): Observable<Spectacles> {
    return this.http.post<Spectacles>(this.baseUrl, spectacles);
  }

}