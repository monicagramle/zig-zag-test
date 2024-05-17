import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreedDetails } from './breed.model';

@Injectable({
  providedIn: 'root',
})
export class BreedService {
  private apiUrl = 'http://localhost:3000/api/breed';

  constructor(private http: HttpClient) {}

  public getBreedList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}`);
  }

  public getBreedDetails(breedName: string): Observable<BreedDetails[]> {
    return this.http.get<BreedDetails[]>(`${this.apiUrl}/${breedName}`);
  }
}
