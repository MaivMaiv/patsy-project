import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { ScreenOrientationService } from '../services/screen-orientation.service';
@Component({
  selector: 'app-qr-profile',
  templateUrl: './qr-profile.page.html',
  styleUrls: ['./qr-profile.page.scss'],
})
export class QrProfilePage implements OnInit {
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
  yourData: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private screenOrientationService: ScreenOrientationService
  ) {}
  ngOnDestroy() {
    this.screenOrientationService.unlock();
  }
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
    this.route.queryParams.subscribe((params) => {
      if (params && params['key']) {
        this.yourData = params['key'];
        console.log(this.yourData);
      }
    });
  }
  captureCard() {
    const element = this.cardContent.nativeElement;
    html2canvas(element).then((canvas) => {
      const imageDataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.getElementById(
        'downloadLink'
      ) as HTMLAnchorElement;
      downloadLink.href = imageDataUrl;
      downloadLink.download = 'Receipt-.png';
      downloadLink.click();
    });
  }
  done() {
    this.router.navigate(['points']);
  }
}
