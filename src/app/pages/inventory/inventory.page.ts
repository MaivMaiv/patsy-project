import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonContent,
  IonModal,
  ModalController,
} from '@ionic/angular';
import { App } from '@capacitor/app';
import { ScreenOrientationService } from 'src/app/services/screen-orientation.service';
import { AddInventoryComponent } from 'src/app/components/add-inventory/add-inventory.component';
import { EditInventoryComponent } from 'src/app/components/edit-inventory/edit-inventory.component';
import { PatsyDataService } from 'src/app/services/patsy-data.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  products: any[] = [];
  editAction: boolean = false;
  isUploaded: boolean = false;
  isUpdated: boolean = false;
  isEmpty: boolean = false;
  currentIndex: any;
  imageToBeNotUpdated: any;
  imageToBeUpdated: any;
  public product: any = {
    productName: '',
    productCost: '',
    productType: '',
    productImage: [],
  };
  public productFromModal: any = {
    productName: '',
    productCost: '',
    productType: '',
    productImage: [],
  };
  @ViewChild('mainElement', { static: true }) mainElement!: IonContent;
  @ViewChild(IonModal)
  modal!: IonModal;
  name: string = '';
  isEditMode: boolean = false;
  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private router: Router,
    private screenOrientationService: ScreenOrientationService,
    private patsyData: PatsyDataService
  ) {}
  ngOnDestroy() {
    this.screenOrientationService.unlock();
  }
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
    const savedProducts = localStorage.getItem('SavedProducts');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
  }
  addButton() {
    this.products.push(this.product);
    this.product = {
      productName: '',
      productCost: '',
      productType: '',
      productImage: [],
    };
    const imageInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    if (imageInput) {
      imageInput.value = '';
    }
    localStorage.setItem('SavedProducts', JSON.stringify(this.products));
  }
  async deleteButton(index: any) {
    if (index !== -1) {
      this.products.splice(index, 1);
      localStorage.setItem(
        'SavedProducts',
        JSON.stringify(this.products)
      );
      this.backButton();
    }
  }
  clearButton() {
    this.product.productName = '';
    this.product.productCost = '';
    this.product.productType = '';
    this.product.productImage.length = 0;
    const imageInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    if (imageInput) {
      imageInput.value = '';
    }
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  editButton(index: number, image: any) {
    console.log(index);
    this.imageToBeNotUpdated = image;
    this.editAction = true;
    this.currentIndex = index;
  }
  updateButton(index: any, updatedProducts: any) {
    this.products[index] = updatedProducts;
    localStorage.setItem('SavedProducts', JSON.stringify(this.products));
  }
  backButton() {
    this.editAction = false;
  }
  saveButton() {
      this.isUpdated = false;
      this.products[this.currentIndex].productImage = this.product.productImage;
      this.product = {
        productName: '',
        productCost: '',
        productType: '',
        productImage: [],
      };
      localStorage.setItem('SavedProducts', JSON.stringify(this.products));
      this.backButton();
  }
  menu() {
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

  async openAddProductModal() {
    const modal = await this.modalController.create({
      component: AddInventoryComponent,
      componentProps: {
        product: this.productFromModal,
      },
    
    });

    modal.onDidDismiss().then((data) => {
        this.productFromModal = data.data.modifiedProduct;
        this.products.push(this.productFromModal);
        localStorage.setItem('SavedProducts', JSON.stringify(this.products));
        this.products.length = 0;
        this.patsyData.refreshPage();
    });
    return await modal.present();
  }

  async openEditProductModal(index: any, products: any) {
    const modal = await this.modalController.create({
      component: EditInventoryComponent,
      componentProps: {
        productData: products,
        productIndex: index
      },
    
    });

    modal.onDidDismiss().then((data) => {
      console.log(data.data?.indexToBeDeleted);
      if(data.data?.indexToBeDeleted) {
        this.deleteButton(data.data?.indexToBeDeleted);
      } else if (data.data?.indexToBeUpdated) {
        console.log(data.data?.indexToBeUpdated);
        this.updateButton(index, data.data?.indexToBeUpdated);
      }
    });
    return await modal.present();
  }
}
