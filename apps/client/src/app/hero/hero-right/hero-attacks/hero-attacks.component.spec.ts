import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAttacksComponent } from './hero-attacks.component';

describe('HeroAttacksComponent', () => {
  let component: HeroAttacksComponent;
  let fixture: ComponentFixture<HeroAttacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroAttacksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAttacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
