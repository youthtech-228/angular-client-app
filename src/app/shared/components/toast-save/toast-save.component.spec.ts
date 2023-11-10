import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastSaveComponent } from './toast-save.component';

describe('ToastSaveComponent', () => {
  let component: ToastSaveComponent;
  let fixture: ComponentFixture<ToastSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
