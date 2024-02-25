import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { QrGeneratorService } from 'src/app/services/qr-generator.service';
import { ScreenOrientationService } from 'src/app/services/screen-orientation.service';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
  employee_ID: string = '';
  employee_Name: string = '';
  employee_Image: any;
  employeeMasterList : any[] = [];
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
      if (params && params['keyID'] && params['keyName'] && params['keyImg']) {
        this.employee_ID = params['keyID'];
        this.employee_Name = params['keyName'];
        this.employee_Image = params['keyImg'];
      }
    });
    this.initializeMasterList();
  }
  async captureScreenshot() {
    const element = this.cardContent.nativeElement;
    html2canvas(element).then(async (canvas) => {
      await this.saveCanvasImage(canvas);
    });
  }
  initializeMasterList() {
    const employeeData = localStorage.getItem('MasterList');
    console.log(employeeData);
    if (employeeData) {
      this.employeeMasterList = JSON.parse(employeeData);
      this.employeeMasterList.push(this.employee_Name);
      localStorage.setItem('MasterList', JSON.stringify(this.employeeMasterList));
    } else {
      this.employeeMasterList.push(this.employee_Name);
      localStorage.setItem('MasterList', JSON.stringify(this.employeeMasterList));
    }
  }
  async saveCanvasImage(canvas: any) {
    const dataUrl = canvas.toDataURL('image/png');
    const fileName = 'patsy-'+ this.employee_Name + '.png';
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
    sessionStorage.setItem('Clock', 'In');
    this.router.navigate(['employee']);
  }

}
