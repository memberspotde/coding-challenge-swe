import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainRoute, mainRoutes } from '../utilities';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatAnchor } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatAnchor, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  mainRoutes: MainRoute[] = mainRoutes;
}
