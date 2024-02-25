import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
@Component({
  selector: 'app-points-profile',
  templateUrl: './points-profile.page.html',
  styleUrls: ['./points-profile.page.scss'],
})
export class PointsProfilePage implements OnInit {
  patsyProfile = {
    id: '',
    name: '',
    bday: '',
    pref: '',
    points: 0
  };
  constructor(private route: ActivatedRoute, private router: Router, private alertController: AlertController, private toastController: ToastController, private patsyData: PatsyDataService) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const name = params['name'];
      const bday = params['bday'];
      const pref = params['pref'];
      const points = params['points']
      console.log('Received data:', id, name, bday, pref, points);
      this.patsyProfile.id = id;
      this.patsyProfile.name = name;
      this.patsyProfile.bday = bday;
      this.patsyProfile.pref = pref;
      this.patsyProfile.points = points
    });
  }
  back() {
    this.router.navigate(['home']);
  }

  done() {
    this.router.navigate(['points']);
  }

  calculatePoints(pointsToDeduct: any) {
    this.patsyProfile.points =  this.patsyProfile.points - pointsToDeduct;
    const profileString = JSON.stringify(this.patsyProfile);
    localStorage.removeItem(this.patsyProfile.id);
    localStorage.setItem(this.patsyProfile.id, profileString);
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
    const confirmation = await this.patsyData.confirmationAlertMessage('Are you sure you want to redeem ' + product + '?')
    if(confirmation) {
      this.calculatePoints(pointsToDeduct);
      this.rewardToast(product);
    }
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
