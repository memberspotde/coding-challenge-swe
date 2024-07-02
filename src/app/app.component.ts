import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatAnchor, MatButton } from '@angular/material/button';
import { HeaderComponent } from './shared/header/header.component';
import { MainRoute, mainRoutes } from './shared/utilities';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButton,
    HeaderComponent,
    MatAnchor,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'swe';
  isMenuOpen = false;
  mainRoutes: MainRoute[] = mainRoutes;

  toggleMenu($event: boolean) {
    this.isMenuOpen = $event;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
