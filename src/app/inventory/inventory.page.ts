import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonContent,
  IonModal,
  ModalController,
} from '@ionic/angular';
import { ScreenOrientationService } from '../services/screen-orientation.service';
import { App } from '@capacitor/app';
import { AddInventoryComponent } from '../components/add-inventory/add-inventory.component';
import { EditInventoryComponent } from '../components/edit-inventory/edit-inventory.component';
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
    private screenOrientationService: ScreenOrientationService
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
  // isButtonDisabled() {
  //   return (
  //     !this.product.productName ||
  //     !this.product.productCost ||
  //     !this.product.productType ||
  //     !this.product.productImage
  //   );
  // }
  // handleImageUpload(event: any) {
  //   this.isUploaded = true;
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       const dataUrl = reader.result as string;
  //       this.product.productImage.push(dataUrl);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  // handleImageUpdate(event: any) {
  //     this.isEmpty = false;
  //     this.product.productImage.length = 0;
  //     this.isUpdated = true;
  //     const file = event.target.files[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         const dataUrl = reader.result as string;
  //         this.imageToBeUpdated = dataUrl;
  //         this.product.productImage.push(this.imageToBeUpdated);
  //       };
  //       reader.readAsDataURL(file);
  //   }
  // }

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
