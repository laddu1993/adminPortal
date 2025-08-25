import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = !!localStorage.getItem('token');

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/auth/dashboard']);
    }
    //window.location.reload();
  }
  res:any;
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response) => {
         // Handle successful login here
        // console.log('Login successful:', response.status);
        this.res = response;
         if (this.res.status == true){//(username === 'admin' && password === 'password') {
           
           localStorage.setItem('token', this.res.token);
           this.router.navigate(['/auth/dashboard']);
         }else{
          alert('Invalid credentials');
         }
       });
      
    }
  }
}
