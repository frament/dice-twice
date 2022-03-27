import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAttacksOtherComponent } from './hero-attacks-other.component';

describe('HeroAttacksOtherComponent', () => {
  let component: HeroAttacksOtherComponent;
  let fixture: ComponentFixture<HeroAttacksOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroAttacksOtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroAttacksOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
