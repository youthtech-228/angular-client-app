import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnToDutyComponent } from './return-to-duty.component';

describe('ReturnToDutyComponent', () => {
  let component: ReturnToDutyComponent;
  let fixture: ComponentFixture<ReturnToDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnToDutyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnToDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
