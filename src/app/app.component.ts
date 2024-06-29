import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageLoaderComponent } from './page-loader/page-loader.component';

declare let particlesJS: any;
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PageLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'coding-challenge-swe';

    public ngOnInit(): void {
      particlesJS.load('particles-js', '../assets/particles.json', null);
  }
}
