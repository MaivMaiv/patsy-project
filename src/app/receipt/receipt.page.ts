import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { DateService } from '../services/date.service';
import { ScreenOrientationService } from '../services/screen-orientation.service';
@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
  currentDate: string = '';
  checkoutAmount: any;
  checkoutProducts: any[] = [];
  receiptDetails: any = {};
  finalAmount: any;
  imgFileName: any;
  imgFilePath: any;
  checkoutDetails: any;
  constructor(
    private dateService: DateService,
    private router: Router,
    private screenOrientationService: ScreenOrientationService,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy() {
    this.screenOrientationService.unlock();
  }
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
    this.dateService.getCurrentDate().subscribe((data) => {
      const dateObj = new Date(data.utc_datetime);
      this.currentDate = dateObj.toISOString().split('T')[0];
    });
    const savedTotal = localStorage.getItem('checkoutTotal');
    if (savedTotal) {
      this.checkoutAmount = JSON.parse(savedTotal);
      console.log(this.checkoutAmount);
    }
    const savedProducts = localStorage.getItem('checkoutCart');
    if (savedProducts) {
      this.checkoutProducts = JSON.parse(savedProducts);
      console.log(this.checkoutProducts);
    }
    const savedDetails = localStorage.getItem('checkoutDetails');
    if (savedDetails) {
      this.receiptDetails = JSON.parse(savedDetails);
      console.log(this.checkoutProducts);
    }
    this.finalAmount = this.checkoutAmount;
  }
  captureCard() {
    const element = this.cardContent.nativeElement;
    html2canvas(element).then((canvas) => {
      const imageDataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.getElementById(
        'downloadLink'
      ) as HTMLAnchorElement;
      downloadLink.href = imageDataUrl;
      downloadLink.download = 'converted_image.png';
      downloadLink.click();
    });
  }
  reset() {
    localStorage.removeItem('checkoutTotal');
    localStorage.removeItem('checkoutCart');
    localStorage.removeItem('checkoutDetails');
    let resetCounter = { key: 'true' };
    this.router.navigate(['home'], { queryParams: resetCounter });
  }
}
