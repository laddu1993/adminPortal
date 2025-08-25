import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn = !!localStorage.getItem('token');
  isUATMode: boolean = environment.production;
  envName = environment.name;

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.checkAuthentication();
    
  }

  checkAuthentication(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isAuthenticated();
        
        if (!this.isLoggedIn) {
          this.router.navigate(['/login']);
        }
      }
    });

  }
  logout(): void {
    this.authService.logout();
    this.isLoggedIn = this.authService.isAuthenticated();

    this.router.navigate(['/login']);
  }
}
