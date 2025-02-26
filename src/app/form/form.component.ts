import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatDialogModule],
  providers: [RegistrationService, AdminService, AuthService],
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
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.eventType = params['event'] || '';
      this.registrationData.eventName = this.eventType;
      // Get event ID for the selected event type
      this.adminService.getEvents().subscribe((events) => {
        const selectedEvent = events.find(
          (event: { eventName: string }) => event.eventName === this.eventType
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

  login() {
    const userName = 'admin'; // Replace with actual input if needed
    const passWord = 'admin@123'; // Replace with actual input if needed

    this.authService.login(userName, passWord).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Handle successful login (e.g., navigate to another page)
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., show a dialog)
      }
    });
  }

  onSubmit() {
    // Check if all required fields are filled
    if (!this.registrationData.studentName || 
        !this.registrationData.college ||
        !this.registrationData.department ||
        !this.registrationData.year ||
        !this.registrationData.email ||
        !this.registrationData.dob) {
      
      this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        maxWidth: '95vw',
        panelClass: 'custom-dialog-container',
        data: {
          title: 'Required Fields',
          message: 'Please fill in all required fields before submitting.',
          isError: true
        }
      });
      return;
    }

    // If all fields are filled, proceed with form submission
    const formattedData = {
      eventName: this.eventType,
      studentName: this.registrationData.studentName,
      collegeName: this.registrationData.college,
      department: this.registrationData.department,
      year: this.registrationData.year.toString(),
      email: this.registrationData.email,
      dob: this.registrationData.dob
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Confirm Registration',
        message: 'Please check if all the information is correct before proceeding.',
        isError: false
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.registrationService.submitRegistration(formattedData).subscribe({
          next: (response) => {
            if (response.status === 'ALREADY_REPORTED') {
              this.dialog.open(ConfirmDialogComponent, {
                width: '400px',
                maxWidth: '95vw',
                panelClass: 'custom-dialog-container',
                data: {
                  title: 'Already Registered',
                  message: response.message || 'You have already registered for this event.',
                  isError: true
                }
              });
              return;
            }

            console.log('Registration successful:', response);
            this.dialog.open(ConfirmDialogComponent, {
              width: '400px',
              maxWidth: '95vw',
              panelClass: 'custom-dialog-container',
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
              maxWidth: '95vw',
              panelClass: 'custom-dialog-container',
              data: {
                title: 'Error',
                message: error.error?.message || 'Registration failed. Please try again.',
                isError: true
              }
            });
          },
        });
      }
    });
  }
}
