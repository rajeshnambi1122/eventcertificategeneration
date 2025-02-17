import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eventpage',
  imports: [],
  templateUrl: './eventpage.component.html',
  styleUrl: './eventpage.component.css',
})
export class EventpageComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/form']);
  }
}
