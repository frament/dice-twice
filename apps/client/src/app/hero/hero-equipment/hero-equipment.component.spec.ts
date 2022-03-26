import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroEquipmentComponent } from './hero-equipment.component';

describe('HeroEquipmentComponent', () => {
  let component: HeroEquipmentComponent;
  let fixture: ComponentFixture<HeroEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
