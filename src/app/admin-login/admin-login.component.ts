import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.status === 'ACCEPTED' && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/admin']);
        } else {
          this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            maxWidth: '95vw',
            panelClass: 'custom-dialog-container',
            data: {
              title: 'Login Failed',
              message: 'Invalid response from server',
              isError: true
            }
          });
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Invalid credentials';
        this.dialog.open(ConfirmDialogComponent, {
          width: '400px',
          maxWidth: '95vw',
          panelClass: 'custom-dialog-container',
          data: {
            title: 'Login Failed',
            message: this.errorMessage,
            isError: true
          }
        });
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
