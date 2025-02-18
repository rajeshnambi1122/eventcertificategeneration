import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  eventType: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.eventType = params['event'] || '';
    });
    // Debug image paths
    console.log('Checking image at:', './assets/images/snr-logo.png');
    const img = new Image();
    img.onload = () => console.log('Image loaded successfully');
    img.onerror = () => console.error('Image failed to load');
    img.src = './assets/images/snr-logo.png';
  }
}
