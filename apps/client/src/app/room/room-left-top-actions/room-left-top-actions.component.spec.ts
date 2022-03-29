import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLeftTopActionsComponent } from './room-left-top-actions.component';

describe('RoomLeftTopActionsComponent', () => {
  let component: RoomLeftTopActionsComponent;
  let fixture: ComponentFixture<RoomLeftTopActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomLeftTopActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLeftTopActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
