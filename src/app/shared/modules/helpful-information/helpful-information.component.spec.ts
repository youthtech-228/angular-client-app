import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpfulInformationComponent } from './helpful-information.component';

describe('HelpfulInformationComponent', () => {
  let component: HelpfulInformationComponent;
  let fixture: ComponentFixture<HelpfulInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpfulInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpfulInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
