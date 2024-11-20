import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaristaReportPage } from './barista-report.page';

describe('BaristaReportPage', () => {
  let component: BaristaReportPage;
  let fixture: ComponentFixture<BaristaReportPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BaristaReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
