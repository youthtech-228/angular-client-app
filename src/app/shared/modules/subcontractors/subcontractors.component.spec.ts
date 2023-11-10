import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontractorsComponent } from './subcontractors.component';

describe('SubcontractorsComponent', () => {
  let component: SubcontractorsComponent;
  let fixture: ComponentFixture<SubcontractorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontractorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcontractorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
