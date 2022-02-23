import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebChatComponent } from './web-chat.component';

describe('WebChatComponent', () => {
  let component: WebChatComponent;
  let fixture: ComponentFixture<WebChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
