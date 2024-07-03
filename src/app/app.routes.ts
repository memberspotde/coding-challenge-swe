import { Routes } from '@angular/router';
import { MainRoutesEnum } from './shared/utilities';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { SWCharactersEffects } from './_store/features/sw-characters/sw-characters.effects';
import {
  sWCharactersFeatureKey,
  sWCharactersReducer,
} from './_store/features/sw-characters/sw-characters.reducer';
import { HomeWorldEffects } from './_store/features/home-world/home-world.effects';
import {
  HomeWorldFeatureKey,
  homeWorldReducer,
} from './_store/features/home-world/home-world.reducer';

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
      provideEffects(HomeWorldEffects),
      provideState(HomeWorldFeatureKey, homeWorldReducer),
    ],
    // resolve: { currPage: sWCharsResolver },
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
