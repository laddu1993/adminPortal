import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FleetService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Fetch all fleets
  getFleets(data: any): Observable<Fleet[]> {
    return this.http.post<Fleet[]>(`${this.apiUrl}fleets`, data).pipe(
      catchError(error => {
        console.error('Error fetching users', error);
        return throwError(error);
      })
    );

  }

  // Fetch a single fleet by ID
  getFleet(id: number): Observable<Fleet> {
    return this.http.get<Fleet>(`${this.apiUrl}/${id}`);
  }
  // add fleet
  addFleet(item: any): Observable<Fleet[]> {
    const formData = new FormData();
    formData.append('sku', item.sku);
    formData.append('points', item.points);
    return this.http.post<Fleet[]>(`${this.apiUrl}fleet/add`, formData);

  }
  update(item: any): Observable<any> {
    const formData = new FormData();
    formData.append('sku', item.sku);
    formData.append('points', item.points);
    formData.append('id', item.id);
    return this.http.post<any>(`${this.apiUrl}fleet/edit`, formData);
  }

  // delete fleet
  deleteFleet(id: any): Observable<Fleet[]> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.http.post<Fleet[]>(`${this.apiUrl}fleet/delete`, formData);

  }
  // delete fleet
  importFleet(data: any): Observable<Fleet[]> {
    return this.http.post<Fleet[]>(`${this.apiUrl}fleet/import`, data);

  }

}

// Define User interface based on your API response
export interface Fleet {
  id: number;
  sku: string;
  points: number;
}
