import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingFormsComponent } from './testing-forms.component';

describe('TestingFormsComponent', () => {
  let component: TestingFormsComponent;
  let fixture: ComponentFixture<TestingFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
