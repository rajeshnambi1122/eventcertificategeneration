import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'https://tothefuture-production.up.railway.app/api/events';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
} 