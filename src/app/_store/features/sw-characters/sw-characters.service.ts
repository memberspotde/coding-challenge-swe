import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap, take } from 'rxjs';
import {
  SWCharacter,
  SWCharacterResp,
  SWCharacterSearchResp,
  SWCharactersPageResp,
} from './sw-characters.model';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class SWCharactersService {
  private httpClient = inject(HttpClient);
  baseUrl = environment.baseUrl;
  path = environment.getPaginatedSWCharsPath;

  requestPaginatedSWCharacters(page: number): Observable<{
    total_pages: number;
    total_records: number;
    chars: SWCharacter[];
  }> {
    return this.httpClient
      .get<SWCharactersPageResp>(this.baseUrl + this.path, {
        params: { page, limit: 10 },
      })
      .pipe(
        take(1),
        switchMap((resp) =>
          forkJoin(
            resp.results.map((res) => this.getSWCharacterObservable(res.url))
          ).pipe(
            take(1),
            map((chars) => ({
              chars,
              total_pages: resp.total_pages,
              total_records: resp.total_records,
            }))
          )
        )
      );
  }

  getSWCharacterObservable(url: string): Observable<SWCharacter> {
    return this.httpClient.get<SWCharacterResp>(url).pipe(
      take(1),
      map((charResp) => ({
        ...charResp.result.properties,
        description: charResp.result.description,
      }))
    );
  }

  searchSWCharactersByName(name: string): Observable<SWCharacter[]> {
    return this.httpClient
      .get<SWCharacterSearchResp>(this.baseUrl + this.path, {
        params: { name },
      })
      .pipe(
        map((resp) =>
          resp.result.map((e) => ({
            ...e.properties,
            description: e.description,
          }))
        )
      );
  }
}
