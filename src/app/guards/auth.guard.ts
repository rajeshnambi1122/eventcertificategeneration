import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      data: {
        title: 'Access Denied',
        message: 'Please login to access the admin panel.',
        isError: true
      }
    });

    this.router.navigate(['/admin-login']);
    return false;
  }
}
