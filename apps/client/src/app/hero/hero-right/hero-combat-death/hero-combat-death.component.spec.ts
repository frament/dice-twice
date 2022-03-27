import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCombatDeathComponent } from './hero-combat-death.component';

describe('HeroCombatDeathComponent', () => {
  let component: HeroCombatDeathComponent;
  let fixture: ComponentFixture<HeroCombatDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCombatDeathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCombatDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
