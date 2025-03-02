import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header" [class.error-header]="data.isError">
        <div class="header-content">
          <span class="material-icons header-icon">
            {{ data.isError ? 'error_outline' : (data.loading ? 'hourglass_empty' : 'help_outline') }}
          </span>
          <h2>{{ data.title }}</h2>
        </div>
      </div>
      
      <div class="dialog-content">
        <p>{{ data.message }}</p>
      </div>

      <div class="dialog-actions" *ngIf="!data.loading">
        <button 
          *ngIf="!data.isError"
          class="btn-secondary" 
          [mat-dialog-close]="false"
          [disabled]="data.loading"
        >
          <span class="material-icons">close</span>
          Cancel
        </button>
        <button 
          class="btn-primary" 
          [class.btn-error]="data.isError"
          [mat-dialog-close]="true"
          [disabled]="data.loading"
        >
          <span class="material-icons">
            {{ data.isError ? 'close' : 'check' }}
          </span>
          {{ data.isError ? 'Close' : 'Confirm' }}
        </button>
      </div>
      
      <div class="loading-container" *ngIf="data.loading">
        <mat-spinner diameter="40"></mat-spinner>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      max-width: 400px;
      margin: 0;
      box-sizing: border-box;
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
      word-break: break-word;
    }

    .dialog-content {
      padding: 24px;
      color: #333;
      font-size: 16px;
      line-height: 1.5;
    }

    .dialog-content p {
      margin: 0;
      word-break: break-word;
    }

    .dialog-actions {
      padding: 16px 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      border-top: 1px solid #eee;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 24px;
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

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .material-icons {
      font-size: 20px;
    }

    @media (max-width: 480px) {
      .dialog-container {
        width: 100%;
        min-width: 100%;
        margin: 0;
        border-radius: 0;
      }

      .dialog-header {
        padding: 16px;
        border-radius: 0;
      }

      .dialog-content {
        padding: 16px;
      }

      .dialog-actions {
        padding: 16px;
        flex-direction: column;
      }

      button {
        width: 100%;
        justify-content: center;
        margin: 0;
      }
    }

    ::ng-deep .mat-dialog-container {
      padding: 0 !important;
      overflow: hidden !important;
      border-radius: 12px !important;
    }

    ::ng-deep .cdk-overlay-pane {
      max-width: 100vw !important;
      width: 100% !important;
      margin: 0 !important;
    }

    @media (max-width: 480px) {
      ::ng-deep .mat-dialog-container {
        border-radius: 0 !important;
      }

      ::ng-deep .mat-mdc-dialog-surface {
        border-radius: 0 !important;
      }

      ::ng-deep .mdc-dialog__surface {
        border-radius: 0 !important;
      }

      ::ng-deep .mat-mdc-dialog-container {
        --mdc-dialog-container-shape: 0px !important;
      }

      ::ng-deep .mat-dialog-content {
        padding: 16px !important;
      }

      ::ng-deep .cdk-overlay-pane {
        max-width: 100vw !important;
        width: 100% !important;
        margin: 0 !important;
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
      }

      ::ng-deep .mat-mdc-dialog-container .mdc-dialog__surface {
        width: 100% !important;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string, 
      message: string, 
      isError: boolean,
      loading?: boolean 
    }
  ) {}
}
