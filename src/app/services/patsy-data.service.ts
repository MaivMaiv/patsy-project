import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AnyMxRecord, resolve } from 'dns';
import { async } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatsyDataService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }

  refreshPage() {
    window.location.reload;
  }

  async alertMessage(header: any, subheader: any, message: any, button: any) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      message: message,
      buttons: [button],
      cssClass: 'alertMessage'
    });

    await alert.present();
  }

  async toastMessageSuccess(message: any, duration: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: 'success'
    });

    await toast.present();
  }

  async toastMessageError(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: 'danger'
    });

    await toast.present();
  }

  async confirmationAlertMessage(message: any): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: message,
        cssClass: 'css-class',
        buttons: [
          {
            text: 'No',
            cssClass: 'custom-alert-button no',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Yes',
            cssClass: 'custom-alert-button yes',
            handler: () => {
              resolve(true);
            },
          },
        ],
      });
  
      await alert.present();
    });
  }
  

  async exitSession() {
    this.alertMessage
  }
}
