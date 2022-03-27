import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCombatHealthComponent } from './hero-combat-health.component';

describe('HeroCombatHealthComponent', () => {
  let component: HeroCombatHealthComponent;
  let fixture: ComponentFixture<HeroCombatHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCombatHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCombatHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
