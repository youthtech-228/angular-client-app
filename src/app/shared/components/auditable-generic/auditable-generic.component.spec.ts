import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditableGenericComponent } from './auditable-generic.component';

describe('AuditableGenericComponent', () => {
  let component: AuditableGenericComponent;
  let fixture: ComponentFixture<AuditableGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditableGenericComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditableGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
