import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header" [class.error-header]="data.isError">
        <div class="header-content">
          <span class="material-icons header-icon">
            {{ data.isError ? 'error_outline' : 'help_outline' }}
          </span>
          <h2>{{ data.title }}</h2>
        </div>
      </div>
      
      <div class="dialog-content">
        <p>{{ data.message }}</p>
      </div>

      <div class="dialog-actions">
        <button 
          *ngIf="!data.isError"
          class="btn-secondary" 
          [mat-dialog-close]="false"
        >
          <span class="material-icons">close</span>
          Cancel
        </button>
        <button 
          class="btn-primary" 
          [class.btn-error]="data.isError"
          [mat-dialog-close]="true"
        >
          <span class="material-icons">
            {{ data.isError ? 'close' : 'check' }}
          </span>
          {{ data.isError ? 'Close' : 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      min-width: 320px;
      max-width: 400px;
    }

    .dialog-header {
      background: #1a237e;
      padding: 16px 24px;
      color: white;
    }

    .error-header {
      background: #d32f2f;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-icon {
      font-size: 24px;
    }

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 500;
    }

    .dialog-content {
      padding: 24px;
      color: #333;
      font-size: 16px;
      line-height: 1.5;
    }

    .dialog-content p {
      margin: 0;
    }

    .dialog-actions {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid #eee;
    }

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-secondary {
      background: #f5f5f5;
      color: #333;
    }

    .btn-primary {
      background: #1a237e;
      color: white;
    }

    .btn-error {
      background: #d32f2f;
    }

    button:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }

    .material-icons {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      .dialog-container {
        width: 100%;
        max-width: none;
        margin: 16px;
      }

      .dialog-actions {
        flex-direction: column;
      }

      button {
        width: 100%;
        justify-content: center;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, message: string, isError: boolean }
  ) {}
}
