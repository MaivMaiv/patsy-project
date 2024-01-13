import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Plugins } from '@capacitor/core';
import { ScreenOrientationService } from '../services/screen-orientation.service';
import { App } from '@capacitor/app';
import { AddMemberComponent } from '../components/add-member/add-member.component';
import { ModalController } from '@ionic/angular';
import { IdGeneratorService } from '../services/id-generator.service';
import { NgZone } from '@angular/core';
const { DatePicker } = Plugins;
@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  seconds: number = 0;
  constructor(
    private router: Router,
    private screenOrientationService: ScreenOrientationService,
    private modalController: ModalController,
    private idGenerator: IdGeneratorService
  ) {}
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
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
          id: profileObject.profileID,
          name: profileObject.profileName,
          bday: profileObject.profileBday,
          pref: profileObject.profilePref,
          points: profileObject.profilePoints
        };
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
    this.idGenerator.generateProfile(patsy_Profile);
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
  exit() {
    console.log('The app has exited.');
    App.exitApp();
  }
}
