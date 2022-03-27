import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSavesComponent } from './hero-saves.component';

describe('HeroSavesComponent', () => {
  let component: HeroSavesComponent;
  let fixture: ComponentFixture<HeroSavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroSavesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
