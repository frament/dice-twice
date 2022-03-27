import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCombatHealthTempComponent } from './hero-combat-health-temp.component';

describe('HeroCombatHealthTempComponent', () => {
  let component: HeroCombatHealthTempComponent;
  let fixture: ComponentFixture<HeroCombatHealthTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCombatHealthTempComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCombatHealthTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
