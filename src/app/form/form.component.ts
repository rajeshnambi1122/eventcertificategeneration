import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [RegistrationService, AdminService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  eventType: string = '';
  registrationData = {
    eventName: '',
    studentName: '',
    college: '',
    department: '',
    year: 0,
    email: '',
    dob: '',
  };

  constructor(
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.eventType = params['event'] || '';
      this.registrationData.eventName = this.eventType;
      // Get event ID for the selected event type
      this.adminService.getEvents().subscribe((events) => {
        const selectedEvent = events.find(
          (event) => event.name === this.eventType
        );
        if (selectedEvent) {
          this.registrationData.eventName = selectedEvent.id;
        }
      });
    });
    // Debug image paths
    console.log('Checking image at:', './assets/images/snr-logo.png');
    const img = new Image();
    img.onload = () => console.log('Image loaded successfully');
    img.onerror = () => console.error('Image failed to load');
    img.src = './assets/images/snr-logo.png';
  }

  onSubmit() {
    this.registrationService
      .submitRegistration(this.registrationData)
      .subscribe({
        next: (response) => {
          alert('Registration successful!');
          // Handle success (e.g., redirect or clear form)
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        },
      });
  }

  validateYear(event: Event) {
    const value = +((<HTMLInputElement>event.target)?.value || 0);
    this.registrationData.year = value > 4 ? 4 : value;
  }
}
