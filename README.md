# Pagination App

## Run
- npm install
- npm run start

## Features
-1 Consumption of public Star Wars API to acquire characters (/people) in a paginated list.
- Star Wars API => https://www.swapi.tech/documentation
- The detail information of each character and nested aggregated property are retrieved as well.
-2 Search for Star Wars's character name case-insensitively. 
-2 Lazy loading paginated list (10-limited for each page).
-2 Eager loading nested character property (/people/:id) asynchronously - 1st level nested.
-2 Deferred loading (on viewport) nested planet property (/homeworld/:id) - 2nd level nested.
-2 All loaded data is cached except the search result.
-2 Reload button is available on each paginated page - Data freshness for the page(except homeworld).
-2 API error handling
-12 Responsive App
-1 Descriptive and friendly UI/UX
-1 Not found page
-1 Accessibility

## Frontend Development
-1 Angular 18 (Typescript strict)
-1 Tailwind + SCSS
-1 NgRx(effects + entity)
-1 Angular Material
-1 ESLint
-1 Prettier + Husky + Lint-staged (auto formating staged files upon commiting)
- PWA Service Worker (optional - no production deployment)

## Performance
-3 Default project settings - standalone components, AOT
-3 Onpush ChangeDetectionStrategy is preset by default in angular.json
-3 Reactive programming - NgRx, reactive form
-3 Use NgOptimizedImage - lazy loading webp image
-3 Use latest angular features - built-in control flow, track, defer, signals
-3 Lazy routing with Angular router

## Best Practices
-3 Clear folder structure
-3 Adapt clean and dry code
-3 No nested subscription
-3 Make good use of inner observables along with RxJs operators
-3 Proper unsubscription to prevent memory leaks - async pipe, rxjs operators, angular built-in operator
-3 Semantic html - header, footer, article, section, anchor, button
-3 Structured header tags - h1, h2, h3

## Improvement
- Instead of eager loading characters asynchronously, deferred loading it. Separate it from paginated list entity, create another feature store to store characters. Use defer block on viewport to fetch the detail of each character.
- Data freshness button for homeworld as well, not just only paginated list and characters.
- Alternatively, auto data freshness for current page. Auto fetching paginated list, characters and homeworld after some time, e.g. 10 minutes.
- Cache search result in the store.

## Some thoughts
- There are quite some methodologies implementing pagination list => lazy/eager loading and/or cached/non-cached
- Depending on the size of the list and how frequent the data is changed (CRUD, especially create and delete)
- Considering eager loading if the list is small.
- Issue scenario: user retrieved first page where data is ordered by descending date. Data is cached. A new item is created in database. The second page is then retrieved, the first element on the second page is the same as the last element of the first page.
- For a list with rather static data, use lazy loading + cached. When retrieving a new paginated page(next/prev) or forcing data freshness, if the total_records value changes(create, delete, restore operations), reset the store and cache new data.
- For dynamic data, where data is frequently updated in the database, lazy loading the list without caching. May consider using angular material paginator and table retrieving data through HTTP.
- Alternatively, may use websocket to handle dynamic data.

