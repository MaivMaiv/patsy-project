import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonModal, MenuController, ModalController } from '@ionic/angular';
import { ScreenOrientationService } from '../services/screen-orientation.service';
import { ProductSettingsComponent } from '../components/product-settings/product-settings.component';
import { EditCartAmountComponent } from '../components/edit-cart-amount/edit-cart-amount.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  products: any[] = [];
  cartCounter: any[] = [];
  totalCounter: any[] = [];
  totalAmount: any = 0;
  filteredProducts: any[] = [];
  resetCounter = 'false';
  public product: any = {
    productName: '',
    productCost: '',
    productType: '',
    productCondition: ''
  };
  public patsyCart: any = {
    cartName: '',
    cartCost: '',
    cartImage: '',
    cartNumber: 0,
  };
  searchedProducts = this.product;
  isFiltered: string = 'false';
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private screenOrientationService: ScreenOrientationService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {}
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
  }
  ngOnDestroy() {
    this.screenOrientationService.unlock();
  }
  ionViewDidEnter() {
    this.route.queryParams.subscribe((params) => {
      this.resetCounter = params['key'];
      console.log('Counter: ', this.resetCounter);
    });
    if (this.resetCounter == 'true') {
      this.cartCounter.length = 0;
      this.totalAmount = 0;
      this.totalCounter.length = 0;
    }
    this.initializeProducts();
  }
  initializeProducts() {
    const savedProducts = localStorage.getItem('SavedProducts');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    }
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
  
  addProduct(name: string, cost: string, image: any, amount: any) {
    const cart = {
      cartName: name,
      cartCost: cost,
      cartImage: image,
      cartNumber: amount,
    };
    const index = this.cartCounter.findIndex((obj) => obj.cartName === name);
    console.log('index', index);
    if (index !== -1) {
      this.cartCounter[index].cartNumber++;
      console.log('LocalStorage:', this.cartCounter);
    } else {
      this.cartCounter.push(cart);
      console.log('LocalStorage:', this.cartCounter);
    }
    this.totalCalculator();

  }
  updateProduct(name: string, newValue: any) {
    const index = this.cartCounter.findIndex((obj) => obj.cartName === name);
    if (index !== -1) {
      this.cartCounter[index].cartNumber = newValue;
    } 
    this.totalCalculator();
  }

  deleteProduct(name: string) {
    const productToBeDeleted = name;
    const index = this.cartCounter.findIndex((obj) => obj.cartName === productToBeDeleted)
    if (index !== -1) {
      this.cartCounter.splice(index, 1);
    }
  }
  totalCalculator() {
    let total = 0;
    for (let x = 0; x < this.cartCounter.length; x++) {
      const value = this.cartCounter[x].cartCost * this.cartCounter[x].cartNumber;
      total = total + value;
    }
    console.log('Total Counter: ', total);
    this.totalAmount = total;
  }
  filterProducts(type: string) {
    if (type == 'all') {
      this.isFiltered = 'false';
    } else {
      this.isFiltered = 'true';
    }
    this.filteredProducts = this.products.filter(
      (product) => product.productType === type
    );
    console.log(this.filteredProducts);
  }
  checkout() {
    const jsonString = JSON.stringify(this.cartCounter);
    localStorage.setItem('checkoutCart', jsonString);
    console.log(jsonString);
    localStorage.setItem('checkoutTotal', this.totalAmount);
    this.router.navigate(['checkout']);
  }
  searchProduct(searchTerm: any) {
    this.isFiltered = 'tralse';
    if (searchTerm === '') {
      this.searchedProducts = this.products;
    } else if (/^[A-Z]$/.test(searchTerm)) {
      this.searchedProducts = this.products.filter(
        (product) => product.productName.charAt(0) === searchTerm
      );
    } else {
      this.searchedProducts = this.products.filter(
        (product) => product.productName === searchTerm
      );
    }
  }

  async openProductModal(name: string, image: any, cost: any) {
    const message = name;
    const modal = await this.modalController.create({
      component: ProductSettingsComponent,
      cssClass: 'product-options-modal',
      componentProps: {
        modalTitle: message,
      },
    });

    modal.onDidDismiss().then((data) => {
      // Handle data passed from the modal
      if (data && data.data) {
        const amount = data.data.amount;
        console.log(amount);
        this.addProduct(name, cost, image, amount);
      }
    });
    return await modal.present();
  }

  
  async editProductModal(name: any, number: any) {
    const modal = await this.modalController.create({
      component: EditCartAmountComponent,
      componentProps: {
        modalAmount: number
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const amount = data.data.amount;
        this.updateProduct(name, amount)
        console.log(amount);
      }
    });
    return await modal.present();
  }

}
