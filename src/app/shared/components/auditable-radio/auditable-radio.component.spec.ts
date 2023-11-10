import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditableRadioComponent } from './auditable-radio.component';

describe('AuditableRadioComponent', () => {
  let component: AuditableRadioComponent;
  let fixture: ComponentFixture<AuditableRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditableRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditableRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
