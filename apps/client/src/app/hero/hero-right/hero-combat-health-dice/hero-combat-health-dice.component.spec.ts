import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCombatHealthDiceComponent } from './hero-combat-health-dice.component';

describe('HeroCombatHealthDiceComponent', () => {
  let component: HeroCombatHealthDiceComponent;
  let fixture: ComponentFixture<HeroCombatHealthDiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCombatHealthDiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCombatHealthDiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
