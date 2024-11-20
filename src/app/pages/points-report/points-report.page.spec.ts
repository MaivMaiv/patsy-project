import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PointsReportPage } from './points-report.page';

describe('PointsReportPage', () => {
  let component: PointsReportPage;
  let fixture: ComponentFixture<PointsReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PointsReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
