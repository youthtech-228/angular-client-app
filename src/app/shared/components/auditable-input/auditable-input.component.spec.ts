import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditableInputComponent } from './auditable-input.component';

describe('InputWithStatusComponent', () => {
  let component: AuditableInputComponent;
  let fixture: ComponentFixture<AuditableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditableInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
