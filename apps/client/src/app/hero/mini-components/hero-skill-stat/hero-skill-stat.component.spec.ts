import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSkillStatComponent } from './hero-skill-stat.component';

describe('HeroSkillStatComponent', () => {
  let component: HeroSkillStatComponent;
  let fixture: ComponentFixture<HeroSkillStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSkillStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSkillStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
