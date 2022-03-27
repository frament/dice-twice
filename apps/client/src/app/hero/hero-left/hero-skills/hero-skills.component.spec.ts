import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSkillsComponent } from './hero-skills.component';

describe('HeroSkillsComponent', () => {
  let component: HeroSkillsComponent;
  let fixture: ComponentFixture<HeroSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
