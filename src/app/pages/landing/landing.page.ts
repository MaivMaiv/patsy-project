import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { DateService } from 'src/app/services/date.service';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
import { ReportService } from 'src/app/services/report.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  loginType = 'admin';
  adminUser = '';
  adminPass = '';
  employeeName: string = '';
  status: boolean = false;
  isSuccessful: boolean = false;
  currentTime: string = '';
  currentDate: string = '';
  adminCredentials: any = {
    username: '',
    password: ''
  }
  timer: any;
  constructor(private dateService: DateService, private patsyData: PatsyDataService, private router: Router, private reportService: ReportService) {

  }

  ionViewDidEnter() {
    if(localStorage.getItem('admin') == null) {
       this.adminCredentials = {
        username: 'patsyadmin',
        password: 'patsypassword'
      }
      localStorage.setItem('admin', JSON.stringify(this.adminCredentials));
    }
  }

  ngOnInit() {
    this.checkStatus();
  }

  checkStatus() {
    const currentStatus = sessionStorage.getItem('Clock');
    if(currentStatus == 'In') {
      this.status = true
    } else {
      this.status = false
    }
  }

  startTimer(durationInSeconds: number) {
    console.log('Timer has begun');
     this.timer = setTimeout(() => {
      this.onTimerEnd();
    }, durationInSeconds * 1000);
  }
  onTimerEnd() {
    if(this.isSuccessful == false) {
      this.patsyData.alertMessage('Warning!', 'The Scanner has not detected a QR Code ID', 'Try to move the camera away from the QR Code Image', 'Got It');
    }
    BarcodeScanner.stopScan();
  }

  async clockIn() {
    this.patsyData.toastMessageSuccess('Scan your barista qr id', 2000);
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    this.startTimer(60);
    const result = await BarcodeScanner.startScan();
    console.log(result);
    if (result.hasContent) {
      console.log(result.content);
      let profileString = localStorage.getItem(result.content);
      console.log(profileString);
      if (profileString !== null) {
        let profileObject = JSON.parse(profileString);
        this.employeeName = profileObject.name;
        localStorage.setItem('CurrentBarista', this.employeeName);
        console.log('Data: ', profileObject);
        sessionStorage.setItem('Clock', 'In')
        this.clockInRecords(this.employeeName)
        this.patsyData.alertMessage('Welcome!','Barista ' + this.employeeName, 'Have a scrumptious day' , '~Splendid~');
        this.isSuccessful = true;
        this.checkStatus();
        sessionStorage.setItem('sessionToken', 'barista');
        this.router.navigate(['home']);
      } else {
        console.error('Profile data is null.');
        this.patsyData.alertMessage('QR ERROR!', 'Profile data is null' ,'Employee profile does not exist.', 'OK');
        clearInterval(this.timer);
      }
    }
  }

  clockInRecords(employee: any) {
    if(localStorage.getItem(employee) == null) {
      this.reportService.initializeEmployeeRecord(employee)
    }
    this.reportService.addEmployeeRecord(employee);
  }

  login() {
    const adminCredentials = localStorage.getItem('admin');
    if(adminCredentials) {
      const parsedData = JSON.parse(adminCredentials);
      console.log(parsedData.username);
      if(parsedData.username == this.adminUser && parsedData.password == this.adminPass) {
        this.patsyData.alertMessage('Welcome!','Ate Patsy! ', 'Have a scrumptious day' , '~Splendid~');
        sessionStorage.setItem('sessionToken', 'admin');
        this.router.navigate(['home']);
      } else {
        this.patsyData.toastMessageError('Username or Password is incorrect.');
      }
    }
  }
}
