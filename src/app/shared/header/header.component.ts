import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MainRoute, mainRoutes } from '../utilities';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatIcon } from '@angular/material/icon';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatAnchor,
    RouterLinkActive,
    NgOptimizedImage,
    MatIcon,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  mainRoutes: MainRoute[] = mainRoutes;
  private observer = inject(BreakpointObserver);
  isMobile$: Observable<boolean> = this.observer
    .observe('(max-width: 800px)')
    .pipe(map((state) => state.matches));
  isRouteMenuToggled = input.required<boolean>();
  onToggleMenu = output<boolean>();

  toggleMenu() {
    this.onToggleMenu.emit(!this.isRouteMenuToggled());
  }
}
