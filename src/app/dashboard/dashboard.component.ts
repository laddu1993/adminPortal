import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit{
  isLoggedIn = !!localStorage.getItem('token');
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    
  }
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isAuthenticated();
    
    this.router.navigate(['/login']);
  }
}
