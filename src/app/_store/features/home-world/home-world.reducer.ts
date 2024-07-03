import { HomeWorld, HomeWorldState } from './home-world.model';
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as HomeWorldActions from './home-world.actions';

export const HomeWorldFeatureKey = 'HomeWorld';

export const HomeWorldAdapter: EntityAdapter<HomeWorld> =
  createEntityAdapter<HomeWorld>({
    selectId: (entity) => entity.url,
  });

export const initialHomeWorldState: HomeWorldState =
  HomeWorldAdapter.getInitialState();

const reducer = createReducer(
  initialHomeWorldState,
  on(HomeWorldActions.setHomeWorld, (state, { url, data }) => {
    const HomeWorld: HomeWorld = {
      ...data,
      url,
    };
    return HomeWorldAdapter.setOne(HomeWorld, state);
  })
);

export function homeWorldReducer(
  state: HomeWorldState | undefined,
  action: Action
) {
  return reducer(state, action);
}
