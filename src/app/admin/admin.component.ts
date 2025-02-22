import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Event, Registration } from '../interfaces/event.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, MatDialogModule],
  providers: [AdminService, HttpClient],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  activeTab: 'registrations' | 'events' = 'registrations';
  registrations: Registration[] = [];
  filteredRegistrations: Registration[] = [];
  events: Event[] = [];
  showAddEventForm = false;
  searchTerm = '';
  filterStatus: 'all' | 'pending' | 'approved' | 'rejected' = 'all';
  filterEvent = 'all';
  currentPage = 1;
  itemsPerPage = 12;
  sortField: 'date' | 'name' | 'event' = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  newEvent: Omit<Event, 'id' | 'status'> = {
    name: '',
    description: '',
    image: '',
    date: '',
  };

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadRegistrations();
    this.loadEvents();
  }

  loadRegistrations() {
    this.adminService.getRegistrations().subscribe((data) => {
      this.registrations = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    let filtered = [...this.registrations];

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (reg) =>
          reg.studentName.toLowerCase().includes(search) ||
          reg.college.toLowerCase().includes(search) ||
          reg.department.toLowerCase().includes(search)
      );
    }

    if (this.filterStatus !== 'all') {
      filtered = filtered.filter((reg) => reg.status === this.filterStatus);
    }

    if (this.filterEvent !== 'all') {
      filtered = filtered.filter((reg) => reg.eventName === this.filterEvent);
    }

    filtered.sort((a, b) => {
      const direction = this.sortDirection === 'asc' ? 1 : -1;
      switch (this.sortField) {
        case 'date':
          return (
            (new Date(a.registrationDate).getTime() -
              new Date(b.registrationDate).getTime()) *
            direction
          );
        case 'name':
          return a.studentName.localeCompare(b.studentName) * direction;
        case 'event':
          return a.eventName.localeCompare(b.eventName) * direction;
        default:
          return 0;
      }
    });

    this.filteredRegistrations = filtered;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRegistrations.length / this.itemsPerPage);
  }

  get paginatedRegistrations(): Registration[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredRegistrations.slice(start, start + this.itemsPerPage);
  }

  updateStatus(id: string, status: 'approved' | 'rejected') {
    this.adminService
      .updateRegistrationStatus(id, status)
      .subscribe((success) => {
        if (success) {
          this.loadRegistrations();
        }
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      // Convert to base64
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        // Store base64 string without the data:image/xxx;base64, prefix
        const base64String = (reader.result as string).split(',')[1];
        this.newEvent.image = base64String;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.selectedFile = null;
  }

  addNewEvent() {
    if (!this.newEvent.image) {
      alert('Please select an image');
      return;
    }

    // Now sending JSON instead of FormData
    this.adminService.addEvent(this.newEvent).subscribe({
      next: (response) => {
        this.events.push(response);
        this.showAddEventForm = false;
        this.removeImage();
      },
      error: (error) => {
        console.error('Error adding event:', error);
        alert('Failed to add event');
      },
    });
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  toggleSort(field: 'date' | 'name' | 'event') {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  loadEvents() {
    this.adminService.getEvents().subscribe((data) => {
      this.events = data;
    });
  }

  get totalRegistrations(): number {
    return this.registrations.length;
  }

  get pendingRegistrations(): number {
    return this.registrations.filter((r) => r.status === 'pending').length;
  }

  get approvedRegistrations(): number {
    return this.registrations.filter((r) => r.status === 'approved').length;
  }

  get rejectedRegistrations(): number {
    return this.registrations.filter((r) => r.status === 'rejected').length;
  }

  removeEvent(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to remove this event?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.removeEvent(id).subscribe((success) => {
          if (success) {
            this.loadEvents();
          }
        });
      }
    });
  }
}
