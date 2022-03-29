import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomButtonsComponent } from './room-buttons.component';

describe('RoomButtonsComponent', () => {
  let component: RoomButtonsComponent;
  let fixture: ComponentFixture<RoomButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
