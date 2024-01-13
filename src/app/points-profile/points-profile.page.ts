import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-points-profile',
  templateUrl: './points-profile.page.html',
  styleUrls: ['./points-profile.page.scss'],
})
export class PointsProfilePage implements OnInit {
  patsyProfile = {
  profileID: '',
  profileName: '',
  profileBday: '',
  profilePref: '',
  profilePoints: 0,
  };
  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController, private toastController: ToastController) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const name = params['name'];
      const bday = params['bday'];
      const pref = params['pref'];
      const points = params['points']
      console.log('Received data:', id, name, bday, pref, points);
      this.patsyProfile.profileID = id;
      this.patsyProfile.profileName = name;
      this.patsyProfile.profileBday = bday;
      this.patsyProfile.profilePref = pref;
      this.patsyProfile.profilePoints = points
    });
  }
  back() {
    this.router.navigate(['home']);
  }

  done() {
    this.router.navigate(['points']);
  }

  calculatePoints(pointsToDeduct: any) {
    this.patsyProfile.profilePoints =  this.patsyProfile.profilePoints - pointsToDeduct;
    const profileString = JSON.stringify(this.patsyProfile);
    localStorage.removeItem(this.patsyProfile.profileID);
    localStorage.setItem(this.patsyProfile.profileID, profileString);
  }

  async rewardToast(redeemables: any) {
    const toast = await this.toastController.create({
      message: 'Congratulations! You got a free ' + redeemables + '!',
      duration: 1500,
      color: 'success',
      position: 'top',
      animated: true,
      translucent: true,

    });
    await toast.present();
  }

  async confirmation(pointsToDeduct: any, product: any) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to redeem ' + product + '?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          handler: () => {
            this.calculatePoints(pointsToDeduct);
            this.rewardToast(product);
          },
        },
      ],
    });

    await alert.present();
  }

  redeem1() {
    this.confirmation(10, 'tea');
  }

  redeem2() {
    this.confirmation(12, 'coffee');
  }
  
  redeem3() {
    this.confirmation(15, 'classic cheese');
  }

  redeem4() {
    this.confirmation(17, 'americano');
  }

  redeem5() {
    this.confirmation(20, 'cafe latte');
  }

  redeem6() {
    this.confirmation(22, 'blue hawaii');
  }

  redeem7() {
    this.confirmation(25, 'classic mocha');
  }

  redeem8() {
    this.confirmation(30, 'bag of coffee');
  }

  redeem9() {
    this.confirmation(100, 'kiss on the cheek');
  }

  redeem10() {
    this.confirmation(250, 'Patsy Reservation');
  }
}
