import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-card-bottom',
  standalone: true,
  template: `
    <ng-content></ng-content>
    <button
      class="text-white flex self-center h-[36px] w-[36px]"
      (click)="toggleButtonView()"
      (mouseenter)="onButtonHover(true)"
      (mouseleave)="onButtonHover(false)"
    >
      @if (detailsAreOpen) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.9199 16.9162L26.4243 23.4206C26.9769 23.9732 27.8728 23.9732 28.4254 23.4206C28.978 22.868 28.978 21.9721 28.4254 21.4195L19.4204 12.4145C18.8678 11.8619 17.9719 11.8619 17.4193 12.4145L8.41428 21.4195C7.86169 21.9721 7.86169 22.868 8.41428 23.4206C8.96687 23.9732 9.8628 23.9732 10.4154 23.4206L16.9198 16.9162L16.9198 16.915L18.4198 15.415L19.9198 16.915L19.9199 16.9162Z"
            fill="white"
          />
        </svg>
      } @else {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.92 18.9188L10.4156 12.4144C9.86296 11.8619 8.96704 11.8619 8.41444 12.4144C7.86185 12.967 7.86185 13.863 8.41444 14.4156L17.4194 23.4206C17.972 23.9732 18.868 23.9732 19.4206 23.4206L28.4256 14.4156C28.9782 13.863 28.9782 12.967 28.4256 12.4144C27.873 11.8619 26.977 11.8619 26.4245 12.4144L19.9201 18.9188L19.92 18.92L18.42 20.42L16.92 18.92L16.92 18.9188Z"
            fill="white"
          />
        </svg>
      }
    </button>
  `,
  styles: [
    `
      :host {
        @apply bg-transparent p-4;
      }
      :host(:hover) {
        @apply bg-black opacity-50; /* Example hover style */
      }
    `,
  ],
})
export class CardBottomComponent {
  @Input() back!: () => void;
  @Output() toggleViewEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() hoverEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  detailsAreOpen: boolean = false;

  toggleButtonView() {
    this.detailsAreOpen = !this.detailsAreOpen;
    this.toggleViewEvent.emit(this.detailsAreOpen);
  }

  onButtonHover(isHovering: boolean) {
    this.onMouseEnter();
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.onHover(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.onHover(false);
  }

  onHover(isHovering: boolean) {
    this.hoverEvent.emit(isHovering);
  }
}
