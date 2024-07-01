import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sw-api',
  standalone: true,
  imports: [],
  templateUrl: './sw-api.component.html',
  styleUrl: './sw-api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwApiComponent {}
