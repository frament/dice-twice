import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPagesComponent } from './hero-pages.component';

describe('HeroPagesComponent', () => {
  let component: HeroPagesComponent;
  let fixture: ComponentFixture<HeroPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
