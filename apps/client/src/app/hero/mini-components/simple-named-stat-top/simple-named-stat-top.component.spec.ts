import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNamedStatTopComponent } from './simple-named-stat-top.component';

describe('SimpleNamedStatTopComponent', () => {
  let component: SimpleNamedStatTopComponent;
  let fixture: ComponentFixture<SimpleNamedStatTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleNamedStatTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNamedStatTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
