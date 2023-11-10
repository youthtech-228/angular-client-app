import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomProcessComponent } from './random-process.component';

describe('RandomProcessComponent', () => {
  let component: RandomProcessComponent;
  let fixture: ComponentFixture<RandomProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
