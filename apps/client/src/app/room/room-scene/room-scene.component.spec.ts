import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomSceneComponent } from './room-scene.component';

describe('RoomSceneComponent', () => {
  let component: RoomSceneComponent;
  let fixture: ComponentFixture<RoomSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomSceneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
