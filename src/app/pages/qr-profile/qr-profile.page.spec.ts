import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { QrProfilePage } from './qr-profile.page';
describe('QrProfilePage', () => {
  let component: QrProfilePage;
  let fixture: ComponentFixture<QrProfilePage>;
  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
