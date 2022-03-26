import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMoneyCounterComponent } from './hero-money-counter.component';

describe('HeroMoneyCounterComponent', () => {
  let component: HeroMoneyCounterComponent;
  let fixture: ComponentFixture<HeroMoneyCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMoneyCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroMoneyCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
