import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTrainingComponent } from './supervisor-training.component';

describe('SupervisorTrainingComponent', () => {
  let component: SupervisorTrainingComponent;
  let fixture: ComponentFixture<SupervisorTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
