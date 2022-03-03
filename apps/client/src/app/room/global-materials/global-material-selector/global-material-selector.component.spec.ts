import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMaterialSelectorComponent } from './global-material-selector.component';

describe('GlobalMaterialSelectorComponent', () => {
  let component: GlobalMaterialSelectorComponent;
  let fixture: ComponentFixture<GlobalMaterialSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalMaterialSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMaterialSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
