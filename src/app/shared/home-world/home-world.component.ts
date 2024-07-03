import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  input,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHomeWorldByUrl } from '../../_store/features/home-world/home-world.selector';
import { filter, take, tap } from 'rxjs';
import { HomeWorld } from '../../_store/features/home-world/home-world.model';
import { requestHomeWorld } from '../../_store/features/home-world/home-world.actions';

@Component({
  selector: 'app-home-world',
  standalone: true,
  imports: [],
  templateUrl: './home-world.component.html',
  styleUrl: './home-world.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeWorldComponent {
  url = input.required<string>();

  homeWorld?: HomeWorld;

  constructor(
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    effect(
      () => {
        this.store
          .select(selectHomeWorldByUrl(this.url()))
          .pipe(
            tap((homeWorld) => {
              if (!homeWorld) {
                this.store.dispatch(requestHomeWorld({ url: this.url() }));
              }
            }),
            filter((homeWorld) => !!homeWorld),
            take(1)
          )
          .subscribe({
            next: (homeWorld) => {
              // console.log('home world', homeWorld)
              this.homeWorld = homeWorld;
              this.cdr.detectChanges();
            },
          });
      },
      { allowSignalWrites: true }
    );
  }

  // ngOnInit() {
  //   this.store.select(selectHomeWorldByUrl(this.url())).pipe(
  //     tap((homeWorld) => {
  //       if(!homeWorld) {
  //         this.store.dispatch(requestHomeWorld({url: this.url()}))
  //       }
  //     }),
  //     filter((homeWorld) => !!homeWorld),
  //     take(1),
  //   ).subscribe({
  //     next: (homeWorld) => {
  //       console.log('home world', homeWorld)
  //       this.homeWorld = homeWorld;
  //       // this.cdr.detectChanges();
  //     }
  //   })
  // }
}
