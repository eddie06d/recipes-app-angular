import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = environment.URL_AUTH;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signin(user: any) {
    return this.http.post(this.URL, user);
  }

  signout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}
