import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeroDialogComponent } from './add-hero-dialog.component';

describe('AddHeroDialogComponent', () => {
  let component: AddHeroDialogComponent;
  let fixture: ComponentFixture<AddHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHeroDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
