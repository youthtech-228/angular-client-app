import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyExtraFormComponent } from './company-extra-form.component';

describe('CompanyExtraFormComponent', () => {
  let component: CompanyExtraFormComponent;
  let fixture: ComponentFixture<CompanyExtraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyExtraFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyExtraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
