import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMiscComponent } from './hero-misc.component';

describe('HeroMiscComponent', () => {
  let component: HeroMiscComponent;
  let fixture: ComponentFixture<HeroMiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMiscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
