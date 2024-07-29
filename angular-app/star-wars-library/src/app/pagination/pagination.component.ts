import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav aria-label="Page navigation">
      <ul class="pagination flex-row">
        <li class="page-item" [class.disabled]="currentPage === 1">
          <a class="page-link" (click)="onPageChange(currentPage - 1)"
            >Previous</a
          >
        </li>
        <li
          class="page-item"
          *ngFor="let page of pages"
          [class.active]="page === currentPage"
        >
          <a class="page-link" (click)="onPageChange(page)">{{ page }}</a>
        </li>
        <li class="page-item" [class.disabled]="currentPage === totalPages">
          <a class="page-link" (click)="onPageChange(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  `,
  styles: [
    `
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 0;
        font-size: 16px;
        background-color: #fafafa;
      }

      /* Pagination links */
      .pagination a {
        color: #1e1e1e;
        padding: 8px 16px;
        margin: 0 4px;
        text-decoration: none;
        border: 1px solid #1e1e1e;
        border-radius: 4px;
        transition:
          background-color 0.3s ease,
          color 0.3s ease;
      }

      .pagination a:hover {
        background-color: #1e1e1e;
        color: #fff;
      }

      .pagination a.active {
        background-color: #1e1e1e;
        color: #fff;
        border-color: #1e1e1e;
      }

      .pagination a.disabled {
        color: #ccc;
        cursor: not-allowed;
        border-color: #ccc;
      }

      .pagination a:first-child {
        margin-left: 0;
      }

      .pagination a:last-child {
        margin-right: 0;
      }
    `,
  ],
})
export class PaginationComponent {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 0;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    const pages = Math.ceil(this.totalItems / this.itemsPerPage);
    return isFinite(pages) && pages > 0 ? pages : 1; // Ensure totalPages is at least 1
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChanged.emit(page);
    }
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    return Array.from({ length: totalPages }, (_, i) => i + 1); // Safeguard array generation
  }
}
