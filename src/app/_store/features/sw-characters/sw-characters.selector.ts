import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  sWCharactersAdapter,
  sWCharactersFeatureKey,
} from './sw-characters.reducer';
import { SWCharactersState } from './sw-characters.model';

export const selectSWCharactersState = createFeatureSelector<SWCharactersState>(
  sWCharactersFeatureKey
);

const { selectEntities } = sWCharactersAdapter.getSelectors();

export const selectSWCharactersLoading = createSelector(
  selectSWCharactersState,
  (state: SWCharactersState) => state.loading
);

export const selectSWCharactersError = createSelector(
  selectSWCharactersState,
  (state: SWCharactersState) => state.error
);

/////////////////////////

export const selectSWCharactersEntities = createSelector(
  selectSWCharactersState,
  (state: SWCharactersState) => selectEntities(state)
);

export const selectSWCharactersCurrentPage = createSelector(
  selectSWCharactersState,
  (state: SWCharactersState) => state.currentPage
);

export const selectSWCharactersTotalPages = createSelector(
  selectSWCharactersState,
  (state: SWCharactersState) => state.total_pages
);

export const selectSWCharactersTotalRecords = createSelector(
  selectSWCharactersState,
  (state: SWCharactersState) => state.total_records
);
