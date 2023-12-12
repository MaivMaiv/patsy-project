import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PointsProfilePage } from './points-profile.page';
describe('PointsProfilePage', () => {
  let component: PointsProfilePage;
  let fixture: ComponentFixture<PointsProfilePage>;
  beforeEach(async(() => {
    fixture = TestBed.createComponent(PointsProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
