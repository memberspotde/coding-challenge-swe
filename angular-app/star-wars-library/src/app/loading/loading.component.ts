import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-anim',
  standalone: true,
  imports: [],
  template: ` <div class="loading">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="#000"
    >
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="#000"
        stroke-width="10"
        fill="none"
        stroke-linecap="round"
        opacity="0.2"
      />
      <circle
        cx="50"
        cy="50"
        r="35"
        stroke="#000"
        stroke-width="10"
        fill="none"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>`,
  styles: [
    `
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `,
  ],
})
export class LoadingComponent {}
