import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTraningListComponent } from './supervisor-traning-list.component';

describe('SupervisorTraningListComponent', () => {
  let component: SupervisorTraningListComponent;
  let fixture: ComponentFixture<SupervisorTraningListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorTraningListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorTraningListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
