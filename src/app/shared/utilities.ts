import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSWCharactersCurrentPage } from '../_store/features/sw-characters/sw-characters.selector';
import { Observable, take, tap } from 'rxjs';
import { requestPaginatedSWCharacters } from '../_store/features/sw-characters/sw-characters.actions';

export interface MainRoute {
  routeName: MainRoutesEnum;
  displayName: string;
  description: string;
}

export enum MainRoutesEnum {
  starwars = 'star-wars-api',
  nest = 'nest-api',
  mock = 'mock-data',
}

export const mainRoutes: MainRoute[] = Object.values(MainRoutesEnum).map(
  (routeEnum) => ({
    routeName: routeEnum,
    displayName: getRouteData(routeEnum),
    description: getRouteData(routeEnum, false),
  })
);

function getRouteData(routeEnum: MainRoutesEnum, isName = true): string {
  switch (routeEnum) {
    case MainRoutesEnum.starwars:
      return isName
        ? 'Star Wars API'
        : 'Consuming Star Wars API. This API is open for public and free.';

    case MainRoutesEnum.nest:
      return isName
        ? 'Nest API'
        : 'Consuming API from a Nest app. This app has to be served locally in the first place.';

    case MainRoutesEnum.mock:
      return isName ? 'Mock Data' : 'Consuming data from a mock json file.';
  }
}

export const sWCharsResolver: ResolveFn<Observable<number | null>> = () => {
  const store = inject(Store);
  return store.select(selectSWCharactersCurrentPage).pipe(
    take(1),
    tap((currPage) => {
      if (currPage === null) {
        store.dispatch(requestPaginatedSWCharacters({ pageId: 1 }));
      }
    })
  );
};
