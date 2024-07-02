import { SWCharactersEntity, SWCharactersState } from './sw-characters.model';
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as SWCharactersActions from './sw-characters.actions';

export const sWCharactersFeatureKey = 'SWCharacters';

export const sWCharactersAdapter: EntityAdapter<SWCharactersEntity> =
  createEntityAdapter<SWCharactersEntity>({
    selectId: (sWCharsEntity) => sWCharsEntity.pageId,
  });

export const initialSWCharactersState: SWCharactersState =
  sWCharactersAdapter.getInitialState({
    loading: false,
    error: null,
    total_pages: 0,
    total_records: 0,
    currentPage: null,
  });

const reducer = createReducer(
  initialSWCharactersState,
  on(SWCharactersActions.loadingPaginatedSWCharacters, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    SWCharactersActions.setPaginatedSWCharacters,
    (state, { pageId, total_pages, total_records, chars }) => {
      const sWCharsPage: SWCharactersEntity = {
        characters: chars,
        pageId,
      };
      return sWCharactersAdapter.setOne(sWCharsPage, {
        ...state,
        loading: false,
        error: null,
        total_pages,
        total_records,
        currentPage: pageId,
      });
    }
  ),
  on(SWCharactersActions.setPaginatedSWCharactersError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(
    SWCharactersActions.navigatePaginatedSWCharactersPage,
    (state, { page }) => ({
      ...state,
      currentPage: page,
    })
  ),
  on(SWCharactersActions.resetSWCharacters, (state) => ({
    ...state,
    ...initialSWCharactersState,
  }))
);

export function sWCharactersReducer(
  state: SWCharactersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
