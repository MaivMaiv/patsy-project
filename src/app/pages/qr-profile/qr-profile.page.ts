import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { QrGeneratorService } from 'src/app/services/qr-generator.service';
import { ScreenOrientationService } from 'src/app/services/screen-orientation.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
@Component({
  selector: 'app-qr-profile',
  templateUrl: './qr-profile.page.html',
  styleUrls: ['./qr-profile.page.scss'],
})
export class QrProfilePage implements OnInit {
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
  memberName: string = '';
  memberID: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private screenOrientationService: ScreenOrientationService,
    private qrGeneratorService: QrGeneratorService,
    private patsyData: PatsyDataService
  ) {}
  ngOnDestroy() {
    this.screenOrientationService.unlock();
  }
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
    this.route.queryParams.subscribe((params) => {
      if (params && params['key2'] && params['key1']) {
        this.memberName = params['key2'];
        this.memberID = params['key1'];
        console.log(this.memberName);
      }
    });
  }
  async captureScreenshot() {
    const element = this.cardContent.nativeElement;
    html2canvas(element).then(async (canvas) => {
      await this.saveCanvasImage(canvas);
    });
  }

  async saveCanvasImage(canvas: any) {
    const dataUrl = canvas.toDataURL('image/png');
    const fileName = 'patsy-'+ this.memberName + '.png';
    const path = `${Directory.Documents}/${fileName}`;

    try {
      await Filesystem.writeFile({
        path,
        data: dataUrl,
        directory: Directory.Documents,
        recursive: true
      });
      this.patsyData.toastMessageSuccess('Image Saved Successfully! Check your gallery.', 1500);
      this.done();
    } catch (error) {
      this.patsyData.toastMessageError('ERROR!' + error);
    }
  }
  done() {
    this.router.navigate(['points']);
  }
}
