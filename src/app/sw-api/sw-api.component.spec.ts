import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwApiComponent } from './sw-api.component';

describe('SwApiComponent', () => {
  let component: SwApiComponent;
  let fixture: ComponentFixture<SwApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
