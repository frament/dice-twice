import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomHeroComponent } from './room-hero.component';

describe('RoomHeroComponent', () => {
  let component: RoomHeroComponent;
  let fixture: ComponentFixture<RoomHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomHeroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
