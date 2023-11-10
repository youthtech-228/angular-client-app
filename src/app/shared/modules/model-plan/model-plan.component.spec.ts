import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPlanComponent } from './model-plan.component';

describe('ModelPlanComponent', () => {
  let component: ModelPlanComponent;
  let fixture: ComponentFixture<ModelPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
