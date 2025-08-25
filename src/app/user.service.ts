import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {

    return this.http.get<any[]>(this.apiUrl + 'users');
  }

  add(item: any): Observable<any> {
    const formData = new FormData();    
    formData.append('email', item.email);
    formData.append('password', item.password); 
    return this.http.post<any>(this.apiUrl + 'user/add', formData);
  }

  update(item: any): Observable<any> {
    const formData = new FormData();    
    formData.append('email', item.email);
    formData.append('password', item.password);
    formData.append('id', item.id); 
    return this.http.post<any>(`${this.apiUrl}user/edit`, formData);
  }

  delete(id: number): Observable<any> {
    const formData = new FormData();   
    formData.append('id', id.toString()); 
    return this.http.post<any>(`${this.apiUrl}user/delete`, formData);
  }
  
  activate(id: number, status: number): Observable<any> {
    const formData = new FormData();   
    formData.append('id', id.toString()); 
    formData.append('active', status.toString()); 
    return this.http.post<any>(`${this.apiUrl}user/activate`, formData);
  }
}
