import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegistrationRequest {
  eventName: string;
  studentName: string;
  collegeName: string;
  department: string;
  year: string;
  email: string;
  dob: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'https://snreventmanagement-btfbc9brepeweabh.northeurope-01.azurewebsites.net/api';
  //private apiUrl = 'https://snrcollege-h3h3ajhbbybbepfw.canadacentral-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  submitRegistration(data: RegistrationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrations`, data);
  }
}
