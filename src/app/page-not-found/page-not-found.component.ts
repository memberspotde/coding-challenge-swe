import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, MatAnchor],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
