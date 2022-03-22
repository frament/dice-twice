import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTopActionsComponent } from './right-top-actions.component';

describe('RightTopActionsComponent', () => {
  let component: RightTopActionsComponent;
  let fixture: ComponentFixture<RightTopActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightTopActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightTopActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
