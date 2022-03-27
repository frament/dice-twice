import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroScoresComponent } from './hero-scores.component';

describe('HeroScoresComponent', () => {
  let component: HeroScoresComponent;
  let fixture: ComponentFixture<HeroScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
