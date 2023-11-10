import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditReviewComponent } from './audit-review.component';

describe('AuditReviewComponent', () => {
  let component: AuditReviewComponent;
  let fixture: ComponentFixture<AuditReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
