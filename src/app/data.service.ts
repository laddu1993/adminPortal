import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl + 'national_accounts');
  }

  add(item: any): Observable<any> {
    const formData = new FormData();    
    formData.append('national_account_name', item.national_account_name);
    formData.append('territory', item.territory); 
    return this.http.post<any>(this.apiUrl + 'national_account/add', formData);
  }

  update(item: any): Observable<any> {
    const formData = new FormData();    
    formData.append('national_account_name', item.national_account_name);
    formData.append('territory', item.territory); 
    formData.append('fleet_id', item.id); 
    return this.http.post<any>(`${this.apiUrl}national_account/edit`, formData);
  }

  delete(id: number): Observable<any> {
    const formData = new FormData();   
    formData.append('id', id.toString()); 
    return this.http.post<any>(`${this.apiUrl}national_account/delete`, formData);
  }
}
