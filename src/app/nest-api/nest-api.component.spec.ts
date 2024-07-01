import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NestApiComponent } from './nest-api.component';

describe('NestApiComponent', () => {
  let component: NestApiComponent;
  let fixture: ComponentFixture<NestApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NestApiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NestApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
