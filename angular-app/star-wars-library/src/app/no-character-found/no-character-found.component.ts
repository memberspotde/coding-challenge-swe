import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-no-character-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="no-results-container text-center py-20 ">
      <!-- <p>Where is my buddy ?</p> -->
      <img
        src="assets/images/no-results.png"
        alt="No characters found"
        class="no-results-img mx-auto"
      />
      <!-- <p>Seems like there is no one here</p> -->
    </div>
  `,
  styles: [
    `
      .no-results-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #fafafa;
      }
      .no-results-img {
        max-width: 300px;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class NoCharacterFoundComponent {}
