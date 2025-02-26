import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminService } from '../services/admin.service';
import { Event, Registration } from '../interfaces/event.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface RegistrationStats {
  totalParticipants: number;
  approvedStatus: number;
  pendingStatus: number;
  rejectedStatus: number;
}

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
  minDate: string;

  newEvent: any = {
    eventName: '',
    eventCoordinator: '',
    message: '',
    image: '',
    createdAt: ''
  };

  stats: RegistrationStats = {
    totalParticipants: 0,
    approvedStatus: 0,
    pendingStatus: 0,
    rejectedStatus: 0
  };

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    // Set min date to today
    this.minDate = new Date().toISOString().split('T')[0];
  }

  ngOnInit() {
    this.loadRegistrations();
    this.loadEvents();
    this.loadRegistrationStats();
  }

  loadRegistrations() {
    this.adminService.getRegistrations().subscribe({
      next: (response) => {
        console.log('Raw registrations response:', response);
        if (response.status === 'OK' && response.message && response.message.content) {
          console.log('Registrations loaded:', response.message.content);
          this.registrations = response.message.content;
          this.applyFilters();
        } else {
          console.error('Unexpected registrations response structure:', response);
          this.registrations = [];
        }
      },
      error: (error) => {
        console.error('Error loading registrations:', error);
        this.registrations = [];
      }
    });
  }

  applyFilters() {
    let filtered = [...this.registrations];

    if (this.searchTerm) {
      const search = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (reg) =>
          reg.studentName.toLowerCase().includes(search) ||
          reg.collegeName.toLowerCase().includes(search) ||
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
    this.adminService.updateRegistrationStatus(id, status).subscribe({
      next: (response) => {
        console.log('Status updated successfully:', response);
        this.loadRegistrations(); // Reload the list
      },
      error: (error) => {
        console.error('Error updating status:', error);
        alert('Failed to update status');
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

    // Format the date to match API requirements (YYYY-MM-DD)
    const formattedDate = new Date(this.newEvent.createdAt).toISOString().split('T')[0];

    // Format the event data according to the API requirements
    const eventData = {
      eventName: this.newEvent.eventName,
      eventCoordinator: this.newEvent.eventCoordinator,
      message: this.newEvent.message,
      image: this.newEvent.image,
      createdAt: formattedDate
    };

    // Send to the API
    this.adminService.addEvent(eventData).subscribe({
      next: (response) => {
        console.log('Event added successfully:', response);
        this.events.push(response);
        this.showAddEventForm = false;
        this.removeImage();
        // Reset form
        this.newEvent = {
          eventName: '',
          eventCoordinator: '',
          message: '',
          image: '',
          createdAt: ''
        };
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
    this.adminService.getEvents().subscribe({
      next: (response) => {
        console.log('Raw API response:', response);
        if (response.status === 'OK' && response.message && response.message.content) {
          console.log('Events loaded:', response.message.content);
          this.events = response.message.content;
        } else {
          console.error('Unexpected response structure:', response);
          this.events = [];
        }
      },
      error: (error) => {
        console.error('Error loading events:', error);
        this.events = [];
      }
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
        this.adminService.removeEvent(id).subscribe({
          next: (response) => {
            console.log('Event deleted successfully:', response);
            this.loadEvents(); // Reload the events list
          },
          error: (error) => {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
          }
        });
      }
    });
  }

  getImageUrl(base64String: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(
      'data:image/jpeg;base64,' + base64String
    );
  }

  loadRegistrationStats() {
    this.adminService.getRegistrationStats().subscribe({
      next: (response) => {
        if (response.status === 'OK' && response.message) {
          this.stats = response.message;
        }
      },
      error: (error) => {
        console.error('Error loading registration stats:', error);
      }
    });
  }
}
