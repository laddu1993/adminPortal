import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import your authentication service

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthenticated = this.authService.isAuthenticated(); // Check authentication status

    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }
    
    return isAuthenticated;
  }
}
