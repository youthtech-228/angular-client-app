import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolTypesComponent } from './pool-types.component';

describe('PoolTypesComponent', () => {
  let component: PoolTypesComponent;
  let fixture: ComponentFixture<PoolTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
