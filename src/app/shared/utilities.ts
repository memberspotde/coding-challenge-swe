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
