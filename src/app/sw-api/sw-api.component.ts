import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectSWCharactersCurrentPage,
  selectSWCharactersEntities,
  selectSWCharactersError,
  selectSWCharactersLoading,
  selectSWCharactersTotalPages,
} from '../_store/features/sw-characters/sw-characters.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, filter, map, switchMap, take } from 'rxjs';
import {
  cancelLoading,
  loadingPaginatedSWCharacters,
  navigatePaginatedSWCharactersPage,
  requestPaginatedSWCharacters,
  setPaginatedSWCharactersError,
} from '../_store/features/sw-characters/sw-characters.actions';
import {
  SWCharacter,
  SWCharactersEntity,
} from '../_store/features/sw-characters/sw-characters.model';
import { AsyncPipe } from '@angular/common';
import { RefreshButtonComponent } from '../shared/refresh-button/refresh-button.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { HomeWorldComponent } from '../shared/home-world/home-world.component';
import { MatFormField } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { SWCharactersService } from '../_store/features/sw-characters/sw-characters.service';
import { Dictionary } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sw-api',
  standalone: true,
  imports: [
    AsyncPipe,
    RefreshButtonComponent,
    MatProgressSpinner,
    PaginationComponent,
    MatProgressBar,
    HomeWorldComponent,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './sw-api.component.html',
  styleUrl: './sw-api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwApiComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private sWCharsService = inject(SWCharactersService);
  private cdr = inject(ChangeDetectorRef);

  loading$ = this.store.select(selectSWCharactersLoading);
  error$ = this.store.select(selectSWCharactersError);

  characters?: SWCharacter[];
  currentPage = 1;
  totalPages!: number; // also the last page
  searchCtrl = new FormControl<string | null>(null);
  searchString?: string | null;
  searchMode = false;
  dic!: Dictionary<SWCharactersEntity>;

  ngOnInit() {
    this.store
      .select(selectSWCharactersCurrentPage)
      .pipe(
        switchMap((currPage) =>
          this.store.select(selectSWCharactersEntities).pipe(
            filter((charsDic) => {
              if (currPage === null || !charsDic[currPage]) {
                this.store.dispatch(
                  requestPaginatedSWCharacters({ pageId: currPage ?? 1 })
                );

                return false;
              } else {
                this.currentPage = currPage;
                this.dic = charsDic;
                return true;
              }
            }),
            map((charsDic) => charsDic[currPage!]!.characters)
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (chars) => {
          console.log('chars', chars);
          this.characters = chars;
        },
      });

    this.store
      .select(selectSWCharactersTotalPages)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (total) => {
          console.log('total pages', total);
          this.totalPages = total;
        },
      });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (searchString) => {
          // console.log('search string', searchString);
          this.searchString = searchString;
        },
      });
  }

  refresh() {
    this.store.dispatch(setPaginatedSWCharactersError({ error: null }));
    this.store.dispatch(
      requestPaginatedSWCharacters({ pageId: this.currentPage })
    );
  }

  navigate($event: number) {
    this.store.dispatch(navigatePaginatedSWCharactersPage({ page: $event }));
  }

  search() {
    if (this.searchString) {
      this.store.dispatch(loadingPaginatedSWCharacters());
      this.sWCharsService
        .searchSWCharactersByName(this.searchString)
        .pipe(
          take(1),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(setPaginatedSWCharactersError({ error }));

            return EMPTY;
          })
        )
        .subscribe({
          next: (result) => {
            this.store.dispatch(cancelLoading());
            this.characters = result;
            this.searchMode = true;
            this.cdr.detectChanges();
          },
          complete: () => {
            this.searchMode = true;
          },
        });
    } else {
      // this.navigate(1);
      this.characters = this.dic[this.currentPage]!.characters;
      this.searchMode = false;
    }
  }

  clear() {
    this.searchCtrl.reset();
    // this.navigate(1);
    this.characters = this.dic[this.currentPage]!.characters;
    this.searchMode = false;
  }

  ngOnDestroy(): void {
    this.store.dispatch(setPaginatedSWCharactersError({ error: null }));
  }
}
