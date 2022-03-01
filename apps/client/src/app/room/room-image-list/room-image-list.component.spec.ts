import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomImageListComponent } from './room-image-list.component';

describe('RoomImageListComponent', () => {
  let component: RoomImageListComponent;
  let fixture: ComponentFixture<RoomImageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomImageListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
