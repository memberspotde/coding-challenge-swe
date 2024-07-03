import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  totalPages = input.required<number>();
  currentPage = input.required<number>();

  beforePrevPageNum = computed(() => this.currentPage() - 2);
  prevPageNum = computed(() => this.currentPage() - 1);
  nextPageNum = computed(() => this.currentPage() + 1);
  afterNextPageNum = computed(() => this.currentPage() + 2);

  onPageNavigation = output<number>();

  navigate(page: number) {
    this.onPageNavigation.emit(page);
  }
}
