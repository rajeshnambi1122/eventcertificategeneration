import { Injectable } from '@angular/core';
import { Event, Registration } from '../interfaces/event.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'https://snreventmanagement-btfbc9brepeweabh.northeurope-01.azurewebsites.net/api';
  //private apiUrl = 'https://snrcollege-h3h3ajhbbybbepfw.canadacentral-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/events`);
  }

  getRegistrations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registrations`);
  }

  updateRegistrationStatus(
    id: string,
    status: 'approved' | 'rejected'
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/registrations/${id}/status?status=${status}`, {});
  }

  addEvent(event: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/events`, event);
  }

  removeEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/events/${id}`);
  }

  getRegistrationStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registrations/status`);
  }
}
