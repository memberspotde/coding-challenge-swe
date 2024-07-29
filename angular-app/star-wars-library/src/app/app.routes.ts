// app.routes.ts
import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CharacterPageComponent } from './character-page/character-page.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'characters', component: CharacterPageComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for 404
];
