import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCombatMainComponent } from './hero-combat-main.component';

describe('HeroCombatMainComponent', () => {
  let component: HeroCombatMainComponent;
  let fixture: ComponentFixture<HeroCombatMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroCombatMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroCombatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
