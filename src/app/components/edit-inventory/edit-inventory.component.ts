import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PatsyDataService } from 'src/app/services/patsy-data.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.scss'],
})
export class EditInventoryComponent  implements OnInit {
  isEmpty: boolean = false;
  isUpdated: boolean = false;
  isGonnaBeDeleted: boolean = false;
  imageToBeUpdated: any;
  @Input() product: any = {
    productName: '',
    productCost: '',
    productType: '',
    productImage: [],
  };

  @Input() productData: any;
  @Input() productIndex: any;
  constructor(private alertController: AlertController, private modalController: ModalController, private patsyData: PatsyDataService) { }

  ngOnInit() {
    console.log(this.product);  
  }

  handleImageUpdate(event: any) {
    this.isEmpty = false;
    this.productData.productImage.length = 0;
    this.isUpdated = true;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        this.imageToBeUpdated = dataUrl;
        this.productData.productImage = this.imageToBeUpdated;
      };
      reader.readAsDataURL(file);
  }
}

async deleteButton(product: any) {
  const alert = await this.alertController.create({
    header: 'Confirmation',
    message:
      'Are you sure you want to delete your product ' + this.productData.productName,
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.isGonnaBeDeleted = false;
        },
      },
      {
        text: 'Yes',
        handler: () => {
          this.isGonnaBeDeleted = true;
          this.edit();
        },
      },
    ],
  });
  await alert.present();
}

edit() {
  if(this.isGonnaBeDeleted) {
    this.modalController.dismiss({
      dismissed: true,
      action: this.isGonnaBeDeleted ,
      indexToBeDeleted: this.productIndex
    })
  } else {
    this.modalController.dismiss({
      dismissed: true,
      indexToBeUpdated: this.productData
    })
  }

}

cancel() {
  window.location.reload();
  this.modalController.dismiss({

  })
}
}
