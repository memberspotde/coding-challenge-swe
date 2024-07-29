import { Component, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../types';
import { CardBottomComponent } from './components/card-bottom/card-bottom.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { CardImageComponent } from './components/card-image/card-image.component';
import { CardInfoListComponent } from './components/card-info-list/card-info-list.component';
import { HostBinding } from '@angular/core';
@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    CommonModule,
    CardHeaderComponent,
    CardImageComponent,
    CardBottomComponent,
    CardInfoListComponent,
  ],
  template: `
    <app-card-header
      [name]="character.name"
      subtitle="Subtitle Text"
      class="flex-none"
    ></app-card-header>

    <app-card-image
      [imageUrl]="character.imageUrl"
      class="flex grow justify-center w-full  items-center bg-transparent overflow-hidden"
    ></app-card-image>

    <app-card-bottom
      (toggleViewEvent)="onToggleView($event)"
      (hoverEvent)="handleHover($event)"
      [ngClass]="{
        'detailed-view': view === 'detailed',
        'normal-view': view === 'normal',
      }"
      class="flex flex-col justify-center align card-bottom"
    >
      @if (view == 'detailed') {
        <app-card-info-list
          [character]="character"
          [ngClass]="{
            'text-white': isHovering == true,
            'text-black': isHovering == false,
          }"
        />
      }
    </app-card-bottom>
  `,
  styles: [
    `
      :host {
        @apply bg-gray-300 overflow-hidden rounded-3xl shadow-lg border border-gray-200 flex flex-col transition-all duration-500 ease-in-out;
        @apply place-self-center;
        --additional-height: 0px;
        min-width: 200px;
        max-width: 400px;
        min-height: calc(300px + var(--additional-height));
      }
      @media (min-width: 768px) {
        :host {
          height: calc(500px + var(--additional-height));
          width: 300px;
        }
      }
      @media (min-width: 1024px) {
        :host {
          height: calc(500px + var(--additional-height));
          width: 300px;
        }
      }
      @media (min-width: 1280px) {
        :host {
          height: calc(500px + var(--additional-height));
          width: 300px;
        }
      }
      :host(:hover) {
        @apply transform scale-105 shadow-2xl transition-all duration-700 ease-in-out;
      }

      .card-bottom {
        height: calc(3rem + var(--additional-height));
      }
      .detailed-view .card-bottom {
        --additional-height: 250px;
      }
      .normal-view .card-bottom {
        --additional-height: 0px;
      }
    `,
  ],
})
export class CharacterCardComponent {
  @Input() character!: Character;
  isHovering: boolean = false;

  @HostBinding('style.backgroundColor') get backgroundColor() {
    return this.character.primaryColor || '#f3f3f3';
  }

  @HostBinding('class.detailed-view') get isDetailedView() {
    return this.view === 'detailed';
  }
  @HostBinding('style.--additional-height') get additionalHeight() {
    return this.view === 'detailed' ? '250px' : '0px';
  }

  view: 'normal' | 'detailed' = 'normal';

  constructor() {
    console.log('CharacterCardComponent initialized');
  }

  onToggleView = (detailsAreOpen: boolean) => {
    detailsAreOpen == true ? (this.view = 'detailed') : (this.view = 'normal');
    console.log('View is ', this.view);
  };

  handleHover(isHovering: boolean) {
    this.isHovering = isHovering;
  }
}
