import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFlavorComponent } from './hero-flavor.component';

describe('HeroFlavorComponent', () => {
  let component: HeroFlavorComponent;
  let fixture: ComponentFixture<HeroFlavorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroFlavorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFlavorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
