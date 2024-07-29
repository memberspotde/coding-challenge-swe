import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoListComponent } from './card-info-list.component';

describe('CardInfoListComponent', () => {
  let component: CardInfoListComponent;
  let fixture: ComponentFixture<CardInfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
