import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">{{ data.title }}</h2>
      <mat-dialog-content class="dialog-content">
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions class="dialog-actions">
        <button mat-stroked-button class="btn-cancel" [mat-dialog-close]="false">Cancel</button>
        <button mat-flat-button color="primary" class="btn-confirm" [mat-dialog-close]="true">Confirm</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      font-family: 'Roboto', sans-serif;
    }
    .dialog-title {
      margin: 0 0 16px 0;
      font-size: 1.75rem;
      font-weight: 500;
      color: #424242;
    }
    .dialog-content {
      font-size: 1rem;
      color: #616161;
      margin-bottom: 24px;
      line-height: 1.5;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    .btn-cancel,
    .btn-confirm {
      text-transform: none;
      transition: box-shadow 0.2s ease;
    }
    .btn-cancel:hover,
    .btn-confirm:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }
  ) {}
}
