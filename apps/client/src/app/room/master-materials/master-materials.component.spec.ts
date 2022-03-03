import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMaterialsComponent } from './master-materials.component';

describe('MasterMaterialsComponent', () => {
  let component: MasterMaterialsComponent;
  let fixture: ComponentFixture<MasterMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMaterialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
