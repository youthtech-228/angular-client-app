import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListValidationComponent } from './employee-list-validation.component';

describe('EmployeeListValidationComponent', () => {
  let component: EmployeeListValidationComponent;
  let fixture: ComponentFixture<EmployeeListValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
