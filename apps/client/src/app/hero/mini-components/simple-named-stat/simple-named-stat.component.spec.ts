import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNamedStatComponent } from './simple-named-stat.component';

describe('SimpleNamedStatComponent', () => {
  let component: SimpleNamedStatComponent;
  let fixture: ComponentFixture<SimpleNamedStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleNamedStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNamedStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
