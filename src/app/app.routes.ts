import { Routes } from '@angular/router';
import { MainRoutesEnum, sWCharsResolver } from './shared/utilities';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SWCharactersEffects } from './_store/features/sw-characters/sw-characters.effects';
import {
  sWCharactersFeatureKey,
  sWCharactersReducer,
} from './_store/features/sw-characters/sw-characters.reducer';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: MainRoutesEnum.starwars,
    providers: [
      provideEffects(SWCharactersEffects),
      provideState(sWCharactersFeatureKey, sWCharactersReducer),
    ],
    resolve: { currPage: sWCharsResolver },
    loadComponent: () =>
      import('./sw-api/sw-api.component').then((x) => x.SwApiComponent),
  },
  {
    path: MainRoutesEnum.nest,
    loadComponent: () =>
      import('./nest-api/nest-api.component').then((x) => x.NestApiComponent),
  },
  {
    path: MainRoutesEnum.mock,
    loadComponent: () =>
      import('./mock-data/mock-data.component').then(
        (x) => x.MockDataComponent
      ),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (x) => x.PageNotFoundComponent
      ),
  },
  { path: '**', redirectTo: 'page-not-found' },
];
