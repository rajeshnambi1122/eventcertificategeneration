import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Event {
  id: number;
  eventName: string;
  eventCoordinator: string;
  message: string;
  image: string;
  createdAt: string;
}

@Component({
  selector: 'app-eventpage',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [EventService],
  templateUrl: './eventpage.component.html',
  styleUrl: './eventpage.component.css',
})
export class EventpageComponent implements OnInit {
  events: Event[] = [];
  registrationCounts: { [eventName: string]: number } = {}; // Store counts by event name 
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) {}

ngOnInit() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe(
      (response) => {
        if (response.status === 'OK') {
          this.events = response.message.content.sort((a: Event, b: Event) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateA.getTime() - dateB.getTime(); // Oldest first
          });
  
          // After events are fetched, now fetch the registration counts
          this.eventService.getRegistrationCounts().subscribe(
            (regResponse) => {
              if (regResponse.status === 'OK') {
                // Map to easily access count by event name
                this.registrationCounts = {};
                regResponse.message.forEach((item: any) => {
                  this.registrationCounts[item.eventName] = item.count;
                });
              }
              this.isLoading = false;
            },
            (error) => {
              console.error('Error fetching registration counts:', error);
              this.isLoading = false;
            }
          );
        } else {
          this.isLoading = false;
        }
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.isLoading = false;
      }
    );
  }
  
  getImageUrl(base64String: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + base64String
    );
  }

  navigateToForm(eventType: string) {
    this.router.navigate(['/form'], {
      queryParams: { event: eventType },
    });
  }
}
