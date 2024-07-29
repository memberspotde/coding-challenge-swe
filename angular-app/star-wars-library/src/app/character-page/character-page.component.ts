import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Character, CharacterSwapiData } from '../types';

import { HeaderComponent } from '../header/header.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ListViewComponent } from '../list-view/list-view.component';
import { PaginationComponent } from '../pagination/pagination.component';
import {
  enhanceCharacterDataWithColors,
  enhanceCharacterDataWithImage,
} from '../character-card/enhance-data-for-frontend/enhance-character-data';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NoCharacterFoundComponent } from '../no-character-found/no-character-found.component';
import { LoadingComponent } from '../loading/loading.component';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SearchBarComponent,
    ListViewComponent,
    PaginationComponent,
    RouterModule,
    FormsModule,
    NoCharacterFoundComponent,
    LoadingComponent,
  ],
  providers: [ApiService],
  template: `
    <div class="characters-container">
      <h2>There are 82 Characters in Total.</h2>
      <p>You can search the characters by name.</p>
    </div>
    @defer (on idle) {
      @defer (when (isLoading==false)) {
        <app-search-bar
          class="fade-in"
          (search)="onSearch($event)"
          (searchQueryChange)="onSearchQueryChange($event)"
        ></app-search-bar>
        @if (totalItems == 0) {
          <app-no-character-found class="fade-in" />
        } @else {
          <app-list-view
            class="fade-in"
            [characters]="characters"
          ></app-list-view>
          <app-pagination
            class="fade-in"
            [totalItems]="totalItems"
            [itemsPerPage]="itemsPerPage"
            [currentPage]="currentPage"
            (pageChanged)="onPageChange($event)"
          ></app-pagination>
        }

        <div
          class="limit-per-page w-full place-content-center flex items-center"
        >
          <label for="limit">Limit Per Page:</label>
          <input
            type="number"
            id="limit"
            min="8"
            max="40"
            [(ngModel)]="itemsPerPage"
            (change)="onLimitChange(itemsPerPage)"
          />
        </div>
      } @loading {
        <app-loading-anim />
      }
    } @loading {
      <app-loading-anim />
    }
  `,
  styles: [
    `
      :host {
        padding: 10px 50px;
      }
      .characters-container {
        padding: 120px 20px 75px;
        text-align: center;
        background-color: #fafafa;
      }

      .characters-container h2 {
        font-size: 36px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .characters-container p {
        font-size: 18px;
      }

      @media screen and (max-width: 640px) {
        .characters-container h2 {
          font-size: 24px;
        }

        .characters-container p {
          font-size: 16px;
        }
      }

      pagination-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 20px 0;
      }

      //Limit per page
      /* Limit per page container */
      .limit-per-page {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px 0;
        font-size: 16px;
        background-color: #fafafa;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        width: 100%;
      }

      /* Label styling */
      .limit-per-page label {
        margin-right: 10px;
        color: #333;
      }

      /* Input styling */
      .limit-per-page input[type='number'] {
        width: 60px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        color: #333;
        outline: none;
        transition: border-color 0.3s ease;
      }

      .limit-per-page input[type='number']:focus {
        border-color: #007bff;
      }

      //fade
      .fade-in {
        opacity: 0;
        animation: fadeIn 0.5s forwards;
      }
      @keyframes fadeIn {
        to {
          opacity: 1;
        }
    `,
  ],
})
export class CharacterPageComponent {
  rawSwapiData: CharacterSwapiData[] = [];
  characters: Character[] = [];
  totalItems: number = 0;
  itemsPerPage: number = 12;
  currentPage: number = 1;
  searchQuery: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  private searchSubject = new BehaviorSubject<string>('');

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300), // Wait for 300ms pause in events
        distinctUntilChanged(), // Only emit if the current value is different than the last
        switchMap((query) => {
          this.isLoading = true;
          this.error = null;
          this.searchQuery = query;
          return this.fetchCharacters(4, 1000);
        }),
      )
      .subscribe({
        next: (data) => {
          this.rawSwapiData = data.results;
          this.totalItems = data.count;
          this.characters = this.enhanceCharacterData(this.rawSwapiData);
          this.isLoading = false;
          this.error = null;
        },
        error: (error) => {
          console.error('Error fetching characters:', error);
          this.error =
            'Failed to fetch character data. Please try again later.';
          this.isLoading = false;
        },
      });

    // Initial fetch
    this.searchSubject.next(this.searchQuery);
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  onSearchQueryChange(query: string): void {
    if (this.searchQuery !== query) {
      this.searchSubject.next(query);
      this.currentPage = 1; //search will trigger new pagination
    }
  }

  fetchCharacters(retries: number, delay: number): Observable<any> {
    const zeroBasedPage = this.currentPage - 1; // Convert to 0-based index
    let params: { [key: string]: any } = {
      pagination: true,
      page: zeroBasedPage,
      limit: this.itemsPerPage,
    };
    if (this.searchQuery) {
      params['search'] = this.searchQuery;
    }

    return this.apiService
      .get<{
        results: CharacterSwapiData[];
        count: number;
      }>('characters', params)
      .pipe(
        catchError((error) => {
          if (retries > 0) {
            // Retry after a delay
            return timer(delay).pipe(() =>
              this.fetchCharacters(retries - 1, delay * 2),
            );
          } else {
            this.handleApiError(error);
            return throwError(error);
          }
        }),
      );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.fetchCharacters(2, 500).subscribe({
      next: (data) => {
        this.rawSwapiData = data.results;
        this.totalItems = data.count;
        this.characters = this.enhanceCharacterData(this.rawSwapiData);
        this.isLoading = false;
        this.error = null;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
        this.error = 'Failed to fetch character data. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onLimitChange(limit: number): void {
    this.itemsPerPage = limit;
    this.currentPage = 1; // Reset to first page
    this.fetchCharacters(2, 500).subscribe({
      next: (data) => {
        this.rawSwapiData = data.results;
        this.totalItems = data.count;
        this.characters = this.enhanceCharacterData(this.rawSwapiData);
        this.isLoading = false;
        this.error = null;
      },
      error: (error) => {
        console.error('Error fetching characters:', error);
        this.error = 'Failed to fetch character data. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  private enhanceCharacterData(
    rawCharacterData: CharacterSwapiData[],
  ): Character[] {
    const colorEnhancedData = enhanceCharacterDataWithColors(rawCharacterData);
    const enhancedData = enhanceCharacterDataWithImage(colorEnhancedData);
    return enhancedData;
  }

  private handleApiError(error: any): void {
    console.error('Error fetching characters:', error);
    if (error.status === 0) {
      // Network error
      this.error = 'Network error: Please check your internet connection.';
    } else if (error.status >= 500) {
      // Server error
      this.error = 'Server error: Please try again later.';
    } else {
      // Other errors
      this.error = 'An error occurred: Please try again.';
    }
    this.isLoading = false;
  }
}
