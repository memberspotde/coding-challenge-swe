import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nest-api',
  standalone: true,
  imports: [],
  templateUrl: './nest-api.component.html',
  styleUrl: './nest-api.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestApiComponent {}
