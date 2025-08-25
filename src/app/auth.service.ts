import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  error: string | null = null;
  constructor(private http: HttpClient) { }
  // Example implementation; replace with real authentication logic
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Check if a token exists in localStorage
  }

  login(username: string, password: string): Observable<any[]> {
    const formData = new FormData();
    formData.append('email', username);
    formData.append('password', password);
    return this.http.post<any>(`${this.apiUrl}login`, formData);
    /*.subscribe(
       (response) => {
        // Handle successful login here
       // console.log('Login successful:', response.status);
        if (response.status == true){//(username === 'admin' && password === 'password') {
          
          localStorage.setItem('token', response.token);
          return true;
        }else{
          return false;
        }
      });
      if(this.isAuthenticated()){
        return true;
      }else{
        return false;
      }
    */
    /*if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'fake-jwt-token');
      return true;
    }
    return false;*/
    /*const formData = new FormData();
    formData.append('email', username);
    formData.append('password', password);
    this.http.post<any>(`${this.apiUrl}/login`, formData).subscribe({
      next: (response) => {
        // Handle successful login here
        console.log('Login successful:', response);
        if (response.status == true){//(username === 'admin' && password === 'password') {
          localStorage.setItem('token', response.token);
          //return true;
        }
      },
      error: (err) => {
        // Handle error here
        console.log('Login error:', err);
        this.error = 'Login failed. Please try again.';
      }
    });
    if(this.error === null){
      console.log('Login successful:', );
      return true;
    }else{
      return false;
    }*/
    /*const body = { "email": username, "password": password };
    const httpHeaders = new HttpHeaders({      
      
      'Custom-Header-1': JSON.stringify(body)
    });

    
    this.http.post<any>(`${this.apiUrl}/login`, {}, {headers: httpHeaders}).subscribe({
      next: (response) => {
        // Handle successful login here
        console.log('Login successful:', response);
        if (response.status == true){//(username === 'admin' && password === 'password') {
          localStorage.setItem('token', response.token);
          //return true;
        }
      },
      error: (err) => {
        // Handle error here
        console.log('Login error:', err);
        this.error = 'Login failed. Please try again.';
      }
    });
    if(this.error === null){
      return true;
    }else{
      return false;
    }*/
    /*if (username === 'admin' && password === 'password') {
      localStorage.setItem('token', 'fake-jwt-token');
      return true;
    }
    return false;*/
    /*const formData = new FormData();
    formData.append('email', username);
    formData.append('password', password);*/
    /*const body = { "email": username, "password": password };
    const headers = new HttpHeaders({      
      'Custom-Header-1': JSON.stringify(body)
    });
    this.http.post<any>(`${this.apiUrl}/login`, {}, {headers}).subscribe({
      next: (response) => {
        // Handle successful login here
        console.log('Login successful:', response);
        if (response.status == true){//(username === 'admin' && password === 'password') {
          localStorage.setItem('token', 'fake-jwt-token');
          //return true;
        }
      },
      error: (err) => {
        // Handle error here
        console.error('Login error:', err);
        this.error = 'Login failed. Please try again.';
      }
    });
    if(this.error === null){
      return true;
    }else{
      return false;
    }*/
    // Implement actual login logic here
    // For demo purposes, we'll just set a token
    
    
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
  }
}
