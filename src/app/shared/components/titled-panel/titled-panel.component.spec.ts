import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitledPanelComponent } from './titled-panel.component';

describe('TitledPanelComponent', () => {
  let component: TitledPanelComponent;
  let fixture: ComponentFixture<TitledPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitledPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitledPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
