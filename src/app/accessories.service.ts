import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Fetch all fleets
  getAccessories(data: any): Observable<Accessories[]> {
    return this.http.post<Accessories[]>(`${this.apiUrl}accessories`, data).pipe(
      catchError(error => {
        console.error('Error fetching users', error);
        return throwError(error);
      })
    );

  }

  // Fetch a single fleet by ID
  getAccessory(id: number): Observable<Accessories> {
    return this.http.get<Accessories>(`${this.apiUrl}/${id}`);
  }
  // add fleet
  addAccessories(item: any): Observable<Accessories[]> {
    const formData = new FormData();
    formData.append('sku', item.sku);
    formData.append('type', item.type);
    return this.http.post<Accessories[]>(`${this.apiUrl}accessories/add`, formData);

  }
  update(item: any): Observable<any> {
    const formData = new FormData();
    formData.append('sku', item.sku);
    formData.append('type', item.type);
    formData.append('id', item.id);
    return this.http.post<any>(`${this.apiUrl}accessories/edit`, formData);
  }

  // delete fleet
  deleteAccessories(id: any): Observable<Accessories[]> {
    const formData = new FormData();
    formData.append('id', id.toString());
    return this.http.post<Accessories[]>(`${this.apiUrl}accessories/delete`, formData);

  }
  // import fleet
  importAccessories(data: any): Observable<Accessories[]> {
    return this.http.post<Accessories[]>(`${this.apiUrl}accessories/import`, data);

  }
}
export interface Accessories { 
  sku: string;
  type: string;
}
