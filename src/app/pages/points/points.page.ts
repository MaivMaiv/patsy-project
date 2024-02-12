import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Plugins } from '@capacitor/core';
import { App } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { NgZone } from '@angular/core';
import { ScreenOrientationService } from 'src/app/services/screen-orientation.service';
import { AddMemberComponent } from 'src/app/components/add-member/add-member.component';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { DateService } from 'src/app/services/date.service';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
const { DatePicker } = Plugins;
@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  userToken: any;
  seconds: number = 0;
  currentDate: any;
  constructor(
    private router: Router,
    private screenOrientationService: ScreenOrientationService,
    private modalController: ModalController,
    private idGenerator: IdGeneratorService,
    private dateService: DateService,
    private patsyData: PatsyDataService
  ) {}
  ngOnInit() {
    const sessionToken = sessionStorage.getItem('sessionToken');
    this.userToken = sessionToken;
    this.screenOrientationService.lockLandscape();
    this.dateService.getCurrentDate().subscribe((data) => {
      const dateObj = new Date(data.utc_datetime);
      this.currentDate = this.formatDate(dateObj);
      console.log(this.currentDate);
    });
  }
  formatDate(date: Date): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month}, ${day}`;
  }
  ngOnDestroy() {
    this.screenOrientationService.unlock();
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
  async scanProfile() {
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
        // let profileArray = [];
        // profileArray.push(profileObject);
        let data = {
          id: profileObject.id,
          name: profileObject.name,
          bday: profileObject.bday,
          pref: profileObject.pref,
          points: profileObject.points
        };
        console.log(profileObject.bday);
        let parts = profileObject.bday.split(', ');
        let bdayCleaned = parts.slice(0, 2).join(', ');
        console.log(bdayCleaned);
        if(this.currentDate == bdayCleaned) {
          this.patsyData.alertMessage('Happy Birthday!', data.name, 'You got a free ' + data.pref + '!', 'CLAIM IT!');
        }
        console.log('Data: ', profileObject);
        this.router.navigate(['/points-profile'], { queryParams: data });
      } else {
        console.error('Profile data is null.');
      }
    }
  }

  createProfile(id: any, name: any, fave: any, date: any) {
    id = this.idGenerator.generatePatsyID();
    const patsy_Profile = {
      patsyId: id,
      patsyName: name,
      patsyFavourite: fave,
      patsyBirthdate: date,
    };
    console.log('Patsy Account: ', patsy_Profile);
    this.idGenerator.generateLoyaltyProfile(patsy_Profile);
    let dataToSend = { key1: id, key2: name };
    this.router.navigate(['/qr-profile'], { queryParams: dataToSend });
  }

  async openAddMemberModal() {
    const modal = await this.modalController.create({
      component: AddMemberComponent
    });

    modal.onDidDismiss().then((data) => {
      if(sessionStorage.getItem('loyalty') == 'true') {
        this.createProfile(data.data?.id, data.data?.name, data.data?.fave, data.data?.date)
      }  else {
        console.log('Cancelled');
      }
    });
    return await modal.present();
  }

  back() {
    this.router.navigate(['home']);
  }

  inventory() {
    this.router.navigate(['inventory']);
  }
  home() {
    this.router.navigate(['home']);
  }
  points() {
    this.router.navigate(['points']);
  }
  report() {
    this.router.navigate(['report']);
  }
  employee() {
    this.router.navigate(['employee']);
  }
  async exit() {
    const confirmation = await this.patsyData.confirmationAlertMessage('Are you sure you want to exit?')
    if(confirmation) {
      this.router.navigate(['landing']);
      sessionStorage.removeItem('sessionToken');
    }
  }
}
