import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import {} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="flex search-container justify-center py-4">
      <input
        type="text"
        [(ngModel)]="searchQuery"
        (ngModelChange)="onSearchQueryChange($event)"
        placeholder="Search characters"
        [formControl]="formControl"
        class="p-2 border border-gray-300 rounded mr-2"
      />
      <button (click)="onSearch()" class="bg-blue-600 text-white p-2 rounded">
        Search
      </button>
    </div>
  `,
  styles: [
    `
      /* Search bar container */
      .search-container {
        background-color: #fafafa;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Input field */
      .search-container input[type='text'] {
        width: 300px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px 0 0 4px;
        font-size: 16px;
        color: #333;
        outline: none;
        transition: border-color 0.3s ease;
      }

      .search-container input[type='text']::placeholder {
        color: #aaa;
      }

      /* Search button */
      .search-container button {
        padding: 10px 20px;
        border: none;
        border-radius: 0 4px 4px 0;
        background-color: #1e1e1e;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .search-container button:hover {
        background-color: #0056b3;
      }

      .search-container button:focus {
        outline: none;
      }
    `,
  ],
})
export class SearchBarComponent {
  @Input() formControl: FormControl = new FormControl('');
  searchQuery: string = '';
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchQueryChange: EventEmitter<string> =
    new EventEmitter<string>();

  constructor() {
    console.log('SearchBarComponent initialized');
  }

  onSearchQueryChange(newQuery: string): void {
    this.searchQuery = newQuery;
    console.log('Search query changed:', this.searchQuery);
    this.searchQueryChange.emit(this.searchQuery);
  }

  onSearch(): void {
    console.log('Search button clicked with query:', this.searchQuery);
    this.search.emit(this.searchQuery);
  }
}
