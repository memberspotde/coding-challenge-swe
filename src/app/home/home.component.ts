import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MainRoute, mainRoutes } from '../shared/utilities';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  mainRoutes: MainRoute[] = mainRoutes;
}
