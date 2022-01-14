import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomUserCardComponent } from './room-user-card.component';

describe('RoomUserCardComponent', () => {
  let component: RoomUserCardComponent;
  let fixture: ComponentFixture<RoomUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
