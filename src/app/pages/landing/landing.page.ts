import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { DateService } from 'src/app/services/date.service';
import { PatsyDataService } from 'src/app/services/patsy-data.service';

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
  adminCredentials: any = {
    username: '',
    password: ''
  }
  constructor(private dateService: DateService, private patsyData: PatsyDataService, private router: Router) {

  }

  ionViewDidEnter() {
    if(localStorage.getItem('admin') == null) {
       this.adminCredentials = {
        username: 'patsyadmin',
        password: 'patsypassword'
      }
      localStorage.setItem('admin', JSON.stringify(this.adminCredentials))
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
    const timer = setTimeout(() => {
      this.onTimerEnd();
    }, durationInSeconds * 1000);
  }
  onTimerEnd() {
    console.log('Scan has stopped');
    BarcodeScanner.stopScan();
  }


  async clockIn() {
    console.log('Scan has begun');
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
        this.dateService.getCurrentDate().subscribe((data) => {
          const timeClocked = data;
          console.log(timeClocked);
        });
        this.patsyData.toastMessageSuccess('Welcome! Barista ' + this.employeeName, 2000);
        this.checkStatus();
        sessionStorage.setItem('sessionToken', 'barista');
        this.router.navigate(['home']);
      } else {
        console.error('Profile data is null.');
        this.patsyData.alertMessage('QR ERROR!', 'Profile data is null' ,'Employee profile does not exist.', 'OK');
      }
    }
  }

  login() {
    const adminCredentials = localStorage.getItem('admin');
    if(adminCredentials) {
      const parsedData = JSON.parse(adminCredentials);
      console.log(parsedData.username);
      if(parsedData.username == this.adminUser && parsedData.password == this.adminPass) {
        this.patsyData.toastMessageSuccess('WELCOME! ATE PATSY', 2000);
        sessionStorage.setItem('sessionToken', 'admin');
        this.router.navigate(['home']);
      } else {
        this.patsyData.toastMessageError('Username or Password is incorrect.');
      }
    }
  }

}
