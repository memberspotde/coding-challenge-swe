import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  template: `<div
    class="hero-container h-[300px] flex flex-col gap-y-20 pt-[150px] "
  >
    <div class="hero-content flex  flex-col  lg:flex-row gap-12 lg:gap-28">
      <h1>Star Wars Roster</h1>
      <div class="flex flex-col gap-y-8 pt-6">
        <p class="hidden lg:block md:text-sm lg:text-base xl:text-lg">
          This is a small app showcasing Star Wars characters using data from
          the SWAPI and enhanced with AI-generated images. Search and explore
          their profiles, and the visuals that celebrate the Star Wars universe.
        </p>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .hero-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        background-color: #fafafa;
      }

      .hero-content {
        z-index: 1;
      }

      .hero-content h1 {
        font-size: 48px;
        font-weight: 700;
        margin-bottom: 20px;
      }

      .hero-content p {
        max-width: 600px;
        margin-bottom: 20px;
      }

      .hero-content button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #000;
        color: #fff;
        border: none;
        cursor: pointer;
      }

      .hero-image {
        max-width: none; /* Override the global max-width */
        height: auto; /* Maintains the aspect ratio */
        display: block; /* Removes any extra space at the bottom of the image */
        z-index: 1; /* Ensure background images are below content */
        position: absolute;
        object-fit: cover;
      }

      @media screen and (max-width: 640px) {
        .hero-content h1 {
          font-size: 32px;
        }

        .hero-content p {
          font-size: 16px;
        }
      }
    `,
  ],
})
export class HeroComponent {}
