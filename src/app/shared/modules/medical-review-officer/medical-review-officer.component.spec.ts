import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalReviewOfficerComponent } from './medical-review-officer.component';

describe('MedicalReviewOfficerComponent', () => {
  let component: MedicalReviewOfficerComponent;
  let fixture: ComponentFixture<MedicalReviewOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalReviewOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalReviewOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
