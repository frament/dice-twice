import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroOtherLangComponent } from './hero-other-lang.component';

describe('HeroOtherLangComponent', () => {
  let component: HeroOtherLangComponent;
  let fixture: ComponentFixture<HeroOtherLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroOtherLangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroOtherLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
