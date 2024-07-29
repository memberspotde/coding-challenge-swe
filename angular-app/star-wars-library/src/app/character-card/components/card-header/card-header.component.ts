import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  standalone: true,
  template: `
    <div class="bg-transparent  p-4 flex justify-between items-center">
      <div>
        <h2 class="text-xl font-bold text-white">{{ name }}</h2>
        <p class="text-sm text-gray-200">{{ subtitle }}</p>
      </div>
      <button class="text-white">+</button>
    </div>
  `,
  styles: [
    `
      .card-header {
        padding: 10px;
      }
    `,
  ],
})
export class CardHeaderComponent {
  @Input() name!: string;
  @Input() subtitle!: string;
  @Input() bgColor!: string;
  @Input() textColor!: string;
}
