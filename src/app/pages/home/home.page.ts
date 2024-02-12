import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { IonModal, MenuController, ModalController } from '@ionic/angular';
import { EditCartAmountComponent } from 'src/app/components/edit-cart-amount/edit-cart-amount.component';
import { ProductSettingsComponent } from 'src/app/components/product-settings/product-settings.component';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
import { ReportService } from 'src/app/services/report.service';
import { ScreenOrientationService } from 'src/app/services/screen-orientation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userToken: any;
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
    private screenOrientationService: ScreenOrientationService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private reportService: ReportService,
    private patsyData: PatsyDataService
  ) {}
  ngOnInit() {
    this.screenOrientationService.lockLandscape();
    const sessionToken = sessionStorage.getItem('sessionToken');
    this.userToken = sessionToken;
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
    this.reportService.initializeReports();
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
  
  addProduct(name: string, cost: string, image: any, amount: any, type: any) {
    const cart = {
      cartName: name,
      cartCost: cost,
      cartImage: image,
      cartNumber: amount,
      cartType: type
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

  async openProductModal(name: string, image: any, cost: any, type: any) {
    const message = name;
    const modal = await this.modalController.create({
      component: ProductSettingsComponent,
      cssClass: 'product-options-modal',
      componentProps: {
        modalTitle: message,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        const amount = data.data.amount;
        console.log(amount);
        this.addProduct(name, cost, image, amount, type);
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
