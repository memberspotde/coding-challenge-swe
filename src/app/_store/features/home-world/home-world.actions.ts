import { createAction, props } from '@ngrx/store';
import { HomeWorld } from './home-world.model';

export const requestHomeWorld = createAction(
  '[SWPlanet/API] Request Home World',
  props<{ url: string }>()
);

export const setHomeWorld = createAction(
  '[SWPlanet/API] Set Home World',
  props<{
    url: string;
    data: HomeWorld;
  }>()
);
