import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegistrationRequest {
  eventName: string;
  studentName: string;
  college: string;
  department: string;
  year: number;
  email: string;
  dob: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8080/api'; // Change to your dev API URL

  constructor(private http: HttpClient) {}

  submitRegistration(data: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrations`, data);
  }
}
