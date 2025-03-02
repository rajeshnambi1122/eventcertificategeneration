import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://snrcollege-h3h3ajhbbybbepfw.canadacentral-01.azurewebsites.net/api/auth/login';

  constructor(private http: HttpClient) {}

  login(userName: string, passWord: string): Observable<any> {
    return this.http.post(this.apiUrl, { userName, passWord });
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  }
}
