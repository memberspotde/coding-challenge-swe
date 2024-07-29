// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, HeroComponent],
  template: `
    <div class="container mx-auto">
      <app-header>
        <nav class="flex gap-4 italic nav">
          <a routerLink="/characters">Characters</a>
          <a routerLink="/home">Info</a>
        </nav>
      </app-header>

      <app-hero />
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .nav {
        color: #1e1e1e;
        font-size: 15px;
        font-family: 'Arial', Arial, sans-serif;
        line-height: 1.3;
        font-weight: 400;
        letter-spacing: -0.2px;
        background-position: center center;
        border-color: transparent;
        border-style: solid;
      }
    `,
  ],
})
export class AppComponent {}
