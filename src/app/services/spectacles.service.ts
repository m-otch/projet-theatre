import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Spectacles } from '../models/spectacles.model';
import { Artists, ArtistWithSpectacle } from '../models/artists.model';

@Injectable({
  providedIn: 'root'
})
export class SpectaclesService {
  private baseUrl = 'http://localhost:3000/spectacles';
  private artistUrl = 'http://localhost:3000/artists';

  constructor(private http: HttpClient) {}

  getSpectacles(): Observable<Spectacles[]> {
    return this.http.get<Spectacles[]>(this.baseUrl);
  }

  getSpectacleById(id: string): Observable<Spectacles> {
    return this.http.get<Spectacles>(`${this.baseUrl}/${id}`);
  }
  
  addSpectacles(spectacles: Spectacles): Observable<Spectacles> {
    return this.http.post<Spectacles>(this.baseUrl, spectacles);
  }

  updateSpectacles(id: string, spectacle: Spectacles): Observable<Spectacles> {
    return this.http.put<Spectacles>(`${this.baseUrl}/${id}`, spectacle);
  }

  deleteSpectacle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getArtistWithSpectacle(): Observable<ArtistWithSpectacle[]> {
    return forkJoin([
      this.http.get<Spectacles[]>(this.baseUrl),  // Récupère les spectacles
      this.http.get<Artists[]>(this.artistUrl)    // Récupère les artistes
    ]).pipe(
      map(([spectacles, artists]: any[]) => {
        return artists.map((artist: Artists) => ({
          ...artist,  // On ajoute toutes les propriétés de l'artiste
          spectacle: spectacles.filter((spectacle: Spectacles) => spectacle.artistId === artist.id)  // On filtre les spectacles en fonction de l'artistId
        }));
      })
    );
  }

  // getStudentsWithSchoolCarData(): Observable<StudentWithSchoolCarData[]> {
  //   return forkJoin([
  //     this.http.get<Student[]>(this.studentUrl),
  //     this.http.get<School[]>(this.schoolUrl),
  //     this.http.get<Car[]>(this.carUrl),
  //   ]).pipe(
  //     map(([students, schools, cars]: any[]) => {
  //       return students.map((x: Student) => ({
  //         ...x,
  //         school: schools.find((y: School) => y.id == x.schoolId),
  //         car: cars.find((y: Car) => y.id == x.carId),
  //       }));
  //     })
  //   );
  // }
}