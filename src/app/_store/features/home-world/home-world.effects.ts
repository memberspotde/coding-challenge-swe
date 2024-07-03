import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import * as HomeWorldActions from './home-world.actions';
import { HomeWorldService } from './home-world.service';

@Injectable()
export class HomeWorldEffects {
  private actions$ = inject(Actions);
  private homeWorldService = inject(HomeWorldService);

  getRepos = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeWorldActions.requestHomeWorld),
      mergeMap((action) =>
        this.homeWorldService.requestHomeWorld(action.url).pipe(
          map((response) => {
            return HomeWorldActions.setHomeWorld({
              data: response,
              url: action.url,
            });
          })
        )
      )
    )
  );
}
