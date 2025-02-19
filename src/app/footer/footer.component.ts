import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Contact Us</h3>
          <p>
            <i class="fas fa-map-marker-alt"></i> Vattamalaipalayam, Coimbatore
            – 641022
          </p>
          <p><i class="fas fa-phone"></i> +91 422 2692461</p>
          <p><i class="fas fa-envelope"></i> principal.ac.in</p>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/event-page">Events</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Follow Us</h3>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          &copy; 2025 Sri Ramakrishna Engineering College. All rights reserved.
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        background: #1a237e;
        color: white;
        padding: 2rem 0 0 0;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 0 1rem;
      }

      .footer-section h3 {
        color: #fff;
        margin-bottom: 1rem;
        font-size: 1.2rem;
      }

      .footer-section p {
        margin: 0.5rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .footer-section ul {
        list-style: none;
        padding: 0;
      }

      .footer-section ul li {
        margin: 0.5rem 0;
      }

      .footer-section a {
        color: white;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer-section a:hover {
        color: #90caf9;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-links a {
        font-size: 1.5rem;
      }

      .footer-bottom {
        text-align: center;
        padding: 1rem;
        margin-top: 2rem;
        background: rgba(0, 0, 0, 0.2);
      }

      .footer-bottom p {
        margin: 0;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .footer-section p {
          justify-content: center;
        }

        .social-links {
          justify-content: center;
        }
      }
    `,
  ],
})
export class FooterComponent {}
