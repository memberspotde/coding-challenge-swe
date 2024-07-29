import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { Character, CharacterSwapiData } from '../types';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule, CharacterCardComponent, LoadingComponent],
  template: `
    <div
      [ngClass]="{
        'xl:grid-cols-4': true,
        'md:grid-cols-2': true,
        'grid-cols-1': true,
      }"
      class=" list-view grid grid-flow-row justify-center items-center w-full gap-8 py-8 "
    >
      @for (character of characters; track character) {
        <div class="character-grid-item">
          <div #trigger class="trigger w-0 h-0"></div>
          @defer (on viewport(trigger)) {
            <app-character-card [character]="character"></app-character-card>
          } @placeholder {
            <div></div>
            <!-- ADD MINIMUM loading(minimum 300ms) ? -->
          } @loading {
            <app-loading-anim></app-loading-anim>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .list-view {
        background-color: #fafafa;
      }
      .character-grid-item {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .trigger {
        pointer-events: none; /* Ensure the trigger doesn't interfere with user interaction */
      }
    `,
  ],
})
export class ListViewComponent {
  @Input() characters: Character[] = [];

  constructor() {
    console.log('CharacterListComponent initialized');
  }
}
