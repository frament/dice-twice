import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAudioComponent } from './room-audio.component';

describe('RoomAudioComponent', () => {
  let component: RoomAudioComponent;
  let fixture: ComponentFixture<RoomAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomAudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
