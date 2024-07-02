import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectSWCharactersEntities,
  selectSWCharactersError,
  selectSWCharactersLoading,
} from '../_store/features/sw-characters/sw-characters.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sw-api',
  standalone: true,
  imports: [],
  templateUrl: './sw-api.component.html',
  styleUrl: './sw-api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwApiComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  loading$ = this.store.select(selectSWCharactersLoading);
  error$ = this.store.select(selectSWCharactersError);

  ngOnInit() {
    this.store
      .select(selectSWCharactersEntities)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (sWCharsDic) => {},
      });
  }
}
