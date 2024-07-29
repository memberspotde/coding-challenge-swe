import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-image',
  standalone: true,
  template: `
    <img
      [src]="imageUrl"
      class="w-full h-full object-cover object-center"
      alt="Character Image"
    />
  `,
  styles: [
    `
      :host {
        @apply flex justify-center w-full h-full items-center bg-transparent overflow-hidden;
      }
    `,
  ],
})
export class CardImageComponent {
  @Input() imageUrl!: string;
}
