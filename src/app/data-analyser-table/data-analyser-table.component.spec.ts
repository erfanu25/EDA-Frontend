import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyserTableComponent } from './data-analyser-table.component';

describe('DataAnalyserTableComponent', () => {
  let component: DataAnalyserTableComponent;
  let fixture: ComponentFixture<DataAnalyserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalyserTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalyserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
