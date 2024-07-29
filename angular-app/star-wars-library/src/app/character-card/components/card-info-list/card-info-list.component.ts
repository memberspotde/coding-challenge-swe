import { Component, Input } from '@angular/core';
import { Character } from '../../../types';

@Component({
  selector: 'app-card-info-list',
  standalone: true,
  template: `
    <p>Height: {{ character.height }}</p>
    <p>Mass: {{ character.mass }}</p>
    <p>Hair Color: {{ character.hair_color }}</p>
    <p>Skin Color: {{ character.skin_color }}</p>
    <p>Eye Color: {{ character.eye_color }}</p>
    <p>Birth Year: {{ character.birth_year }}</p>
    <p>Gender: {{ character.gender }}</p>
    <p>Home world (aggregated): {{ character.homeworldData }}</p>
  `,
  styles: [
    `
      :host {
        @apply bg-transparent p-4 rounded-lg;
      }
    `,
  ],
})
export class CardInfoListComponent {
  @Input() character!: Character;
}
