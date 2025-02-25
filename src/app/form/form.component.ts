import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { AdminService } from '../services/admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatDialogModule],
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
    private adminService: AdminService,
    private dialog: MatDialog
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
    // Ensure year is a number
    this.registrationData.year = Number(this.registrationData.year);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Registration',
        message: 'Please check if all the information is correct before proceeding.',
        isError: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registrationService.submitRegistration(this.registrationData).subscribe({
          next: (response) => {
            this.dialog.open(ConfirmDialogComponent, {
              width: '400px',
              data: {
                title: 'Success',
                message: 'Registration successful!',
                isError: false
              }
            });
          },
          error: (error) => {
            console.error('Registration failed:', error);
            this.dialog.open(ConfirmDialogComponent, {
              width: '400px',
              data: {
                title: 'Error',
                message: 'Registration failed. Please try again.',
                isError: true
              }
            });
          },
        });
      }
    });
  }
}
