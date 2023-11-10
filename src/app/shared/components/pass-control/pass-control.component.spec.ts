import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassControlComponent } from './pass-control.component';

describe('PassControlComponent', () => {
  let component: PassControlComponent;
  let fixture: ComponentFixture<PassControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
