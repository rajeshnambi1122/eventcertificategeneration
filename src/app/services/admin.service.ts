import { Injectable } from '@angular/core';
import { Event, Registration } from '../interfaces/event.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private dummyEvents: Event[] = [
    {
      id: '1',
      name: 'HACKATHON',
      description: 'Showcase your coding skills and innovative solutions',
      image: 'assets/images/HACKATHON.jpg',
      date: '2024-04-15',
      status: 'active',
    },
    // Add other events...
  ];

  private dummyRegistrations: Registration[] = [
    {
      id: '1',
      eventId: '1',
      eventName: 'HACKATHON',
      studentName: 'John Doe',
      college: 'SREC',
      department: 'Computer Science',
      email: 'john@example.com',
      dob: '2000-01-01',
      year: 3,
      status: 'pending',
      registrationDate: new Date().toISOString(),
    },
    // Add more dummy registrations...
  ];

  private apiUrl = 'your-api-url';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Event[]> {
    return of(this.dummyEvents);
  }

  getRegistrations(): Observable<Registration[]> {
    return of(this.dummyRegistrations);
  }

  updateRegistrationStatus(
    id: string,
    status: 'approved' | 'rejected'
  ): Observable<boolean> {
    const registration = this.dummyRegistrations.find((r) => r.id === id);
    if (registration) {
      registration.status = status;
      return of(true);
    }
    return of(false);
  }

  addEvent(event: Omit<Event, 'id' | 'status'>): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events`, event);
  }

  removeEvent(id: string): Observable<boolean> {
    const index = this.dummyEvents.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.dummyEvents.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
