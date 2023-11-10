import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditableCheckboxComponent } from './auditable-checkbox.component';

describe('AuditableCheckboxComponent', () => {
  let component: AuditableCheckboxComponent;
  let fixture: ComponentFixture<AuditableCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditableCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditableCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
