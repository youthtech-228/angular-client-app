import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditMessageTemplateComponent } from './audit-message-template.component';

describe('AuditMessageTemplateComponent', () => {
  let component: AuditMessageTemplateComponent;
  let fixture: ComponentFixture<AuditMessageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditMessageTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditMessageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
