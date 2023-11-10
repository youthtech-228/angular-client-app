import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAwarenessComponent } from './employee-awareness.component';

describe('EmployeeAwarenessComponent', () => {
  let component: EmployeeAwarenessComponent;
  let fixture: ComponentFixture<EmployeeAwarenessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAwarenessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAwarenessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
