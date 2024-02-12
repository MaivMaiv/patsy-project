import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeReportPage } from './employee-report.page';

describe('EmployeeReportPage', () => {
  let component: EmployeeReportPage;
  let fixture: ComponentFixture<EmployeeReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmployeeReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
