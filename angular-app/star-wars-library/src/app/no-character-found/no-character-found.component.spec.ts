import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoCharacterFoundComponent } from './no-character-found.component';

describe('NoCharacterFoundComponent', () => {
  let component: NoCharacterFoundComponent;
  let fixture: ComponentFixture<NoCharacterFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoCharacterFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoCharacterFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
