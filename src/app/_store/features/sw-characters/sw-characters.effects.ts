import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, mergeMap, tap, catchError, of } from 'rxjs';
import * as SWCharactersActions from './sw-characters.actions';
import { SWCharactersService } from './sw-characters.service';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SWCharactersEffects {
  private actions$ = inject(Actions);
  private sWCharactersService = inject(SWCharactersService);
  private store = inject(Store);

  getRepos = createEffect(() =>
    this.actions$.pipe(
      ofType(SWCharactersActions.requestPaginatedSWCharacters),
      tap(() => {
        this.store.dispatch(SWCharactersActions.loadingPaginatedSWCharacters());
      }),
      mergeMap((action) =>
        this.sWCharactersService
          .requestPaginatedSWCharacters(action.pageId)
          .pipe(
            map((response) => {
              return SWCharactersActions.setPaginatedSWCharacters({
                pageId: action.pageId,
                total_pages: response.total_pages,
                total_records: response.total_records,
                chars: response.chars,
              });
            }),
            catchError((error: HttpErrorResponse) => {
              // console.log(error.message, error)
              // return EMPTY

              return of(
                SWCharactersActions.setPaginatedSWCharactersError({ error })
              );
            })
          )
      )
    )
  );
}
