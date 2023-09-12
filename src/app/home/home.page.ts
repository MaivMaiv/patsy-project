import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  products: any[] = [];
  cartCounter: any[] = [];
  totalAmount: number = 0;
  public product: any = {
    productName: "",
    productCost: "",
    productType: "",
    productCondition: ""
  }
  public patsyCart: any = {
    cartName: "",
    cartCost: ""
  }
  constructor(private router: Router) {}

  ionViewDidEnter() {
    this.initializeProducts();
    this.colorToken();
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
  
  addAmount(name: string, cost: string) {
    console.log(cost);
    this.patsyCart = {
      cartName: name,
      cartCost: cost
    };
    this.cartCounter.push(this.patsyCart);
    console.log(this.patsyCart);
    this.totalAmount += parseFloat(cost);
  }

  subAmount(name: string, cost: string) {
    console.log(cost);
    if(this.totalAmount > 0){
      this.totalAmount -= parseFloat(cost);
    }
    const indexToRemove = this.patsyCart.indexOf(name)
    if (indexToRemove !== -1) {
      this.patsyCart.splice(indexToRemove, 1);
    }
    console.log(this.patsyCart)
  }

  colorToken() {
    if(this.product.productType == "brewed"){
      this.product.productCondition = 1;
    } else if (this.product.productType == "espresso"){
      this.product.productCondition = 2;
    }
    else if (this.product.productType == "dine-In"){
      this.product.productCondition = 3;
    }
    else if (this.product.productType == "non-Coffee"){
      this.product.productCondition = 4;
    }
    else if (this.product.productType == "mocktails"){
      this.product.productCondition = 5;    
    }
    else if (this.product.productType == "toasties"){
      this.product.productCondition = 6;
    }
    else if (this.product.productType == "specials"){
      this.product.productCondition = 7;
    }
  }
}
