import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredPositionsTableComponent } from './covered-positions-table.component';

describe('CoveredPositionsTableComponent', () => {
  let component: CoveredPositionsTableComponent;
  let fixture: ComponentFixture<CoveredPositionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoveredPositionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoveredPositionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
