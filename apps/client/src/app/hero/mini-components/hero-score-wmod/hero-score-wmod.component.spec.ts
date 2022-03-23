import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroScoreWModComponent } from './hero-score-wmod.component';

describe('HeroScoreWModComponent', () => {
  let component: HeroScoreWModComponent;
  let fixture: ComponentFixture<HeroScoreWModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroScoreWModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroScoreWModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
