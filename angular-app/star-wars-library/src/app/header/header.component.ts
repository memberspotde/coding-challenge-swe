import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="header-container px-40">
      <div class="logo">
        <a href="/" style="color: inherit">Sebastian Mueller</a>
      </div>
      <div class="menu-icon menu">
        <ng-content />
      </div>
    </div>
  `,
  styles: [
    `
      .header-container {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        height: 60px;
        background-color: #fafafa;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 40 rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .logo a {
        color: #1e1e1e;
        font-size: 22px;
        font-family: 'Arial', Arial, sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        text-decoration: none;
      }

      .menu-icon img {
        width: 24px;
        height: 24px;
      }

      .menu {
        color: #1e1e1e;
        font-size: 15px;
        font-family: 'Arial', Arial, sans-serif;
        line-height: 1.3; /* Although it's crossed out in your image, I've included it */
        font-weight: 400;
        letter-spacing: -0.2px;
        background-position: center center;
        border-color: transparent;
        border-style: solid;
      }

      @media screen and (max-width: 640px) {
        .menu-icon img {
          width: 40px;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  constructor() {
    console.log('HeaderComponent initialized');
  }
}
