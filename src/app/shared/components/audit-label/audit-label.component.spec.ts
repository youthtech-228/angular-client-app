import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLabelComponent } from './audit-label.component';

describe('AuditLabelComponent', () => {
  let component: AuditLabelComponent;
  let fixture: ComponentFixture<AuditLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
