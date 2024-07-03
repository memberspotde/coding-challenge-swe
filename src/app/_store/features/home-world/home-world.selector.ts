import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HomeWorldAdapter, HomeWorldFeatureKey } from './home-world.reducer';
import { HomeWorldState } from './home-world.model';

export const selectHomeWorldState =
  createFeatureSelector<HomeWorldState>(HomeWorldFeatureKey);

const { selectEntities } = HomeWorldAdapter.getSelectors();

export const selectHomeWorldEntities = createSelector(
  selectHomeWorldState,
  (state: HomeWorldState) => selectEntities(state)
);

export const selectHomeWorldByUrl = (url: string) =>
  createSelector(selectHomeWorldEntities, (dic) => dic[url]);
