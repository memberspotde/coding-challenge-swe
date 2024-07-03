import { createAction, props } from '@ngrx/store';
import { SWCharacter } from './sw-characters.model';
import { HttpErrorResponse } from '@angular/common/http';

export const loadingPaginatedSWCharacters = createAction(
  '[SWCharacters/API] Loading Paginated SWCharacters'
);

export const cancelLoading = createAction('[SWCharacters] Cancel Loading');

export const requestPaginatedSWCharacters = createAction(
  '[SWCharacters/API] Request Paginated SWCharacters',
  props<{ pageId: number }>()
);

export const setPaginatedSWCharacters = createAction(
  '[SWCharacters/API] Set Paginated SWCharacters',
  props<{
    pageId: number;
    chars: SWCharacter[];
    total_pages: number;
    total_records: number;
  }>()
);

export const navigatePaginatedSWCharactersPage = createAction(
  '[Repositories] Navigate Paginated SWCharacters Page',
  props<{ page: number }>()
);

export const setPaginatedSWCharactersError = createAction(
  '[SWCharacters/API] Set Paginated SWCharacters Error',
  props<{ error: HttpErrorResponse | null }>()
);

export const resetSWCharacters = createAction(
  '[SWCharacters/API] Reset SWCharacters'
);
