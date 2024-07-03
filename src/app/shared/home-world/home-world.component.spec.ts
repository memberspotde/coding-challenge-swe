import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWorldComponent } from './home-world.component';

describe('HomeWorldComponent', () => {
  let component: HomeWorldComponent;
  let fixture: ComponentFixture<HomeWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWorldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
