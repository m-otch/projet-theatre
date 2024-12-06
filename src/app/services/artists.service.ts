import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artists } from '../models/artists.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  private baseUrl = 'http://localhost:3000/artists'

  constructor(private http: HttpClient) {};

  getArtists(): Observable<Artists[]> {
    return this.http.get<Artists[]>(this.baseUrl);
  }

  getArtistsById(id: string): Observable<Artists> {
    return this.http.get<Artists>(`${this.baseUrl}/${id}`);
  }

  addArtists(artists: Artists): Observable<Artists> {
    return this.http.post<Artists>(this.baseUrl, artists);
  }

  updateArtists(id: string, artist: Artists): Observable<Artists> {
    return this.http.put<Artists>(`${this.baseUrl}/${id}`, artist);
  }

  deleteArtists(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
