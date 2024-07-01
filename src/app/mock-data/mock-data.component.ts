import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mock-data',
  standalone: true,
  imports: [],
  templateUrl: './mock-data.component.html',
  styleUrl: './mock-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockDataComponent {}
