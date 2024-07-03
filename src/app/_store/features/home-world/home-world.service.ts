import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HomeWorld, HomeWorldResp } from './home-world.model';

@Injectable({
  providedIn: 'root',
})
export class HomeWorldService {
  private httpClient = inject(HttpClient);

  requestHomeWorld(url: string): Observable<HomeWorld> {
    return this.httpClient.get<HomeWorldResp>(url).pipe(
      take(1),
      map((hw) => hw.result.properties)
    );
  }
}
