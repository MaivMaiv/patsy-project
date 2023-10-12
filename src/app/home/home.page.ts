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
  totalAmount: any = 0;
  filteredProducts: any[] = [];
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
  isFiltered: boolean = false;
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
    console.log("LocalStorage:",this.cartCounter);
    this.totalAmount += parseFloat(cost);
  }

  subAmount(name: string, cost: string) {
    console.log(cost);
    let itemRemoved = false;
    const criterion = {
      "cartName": name,
      "cartCost": cost
  };
    if(this.totalAmount > 0){
      this.cartCounter = this.cartCounter.filter(item => {
        if (!itemRemoved && item.cartName === criterion.cartName && item.cartCost === criterion.cartCost) {
          itemRemoved = true;
          this.totalAmount -= parseFloat(cost);
          return false;
        }
        return true;
      });
    }
    console.log(this.cartCounter)
}

  filterProducts(type: string) {
    if(type == 'all'){
      this.isFiltered = false
    } else {
      this.isFiltered = true;
    }
    this.filteredProducts = this.products.filter(product => product.productType === type);
    console.log(this.filteredProducts);
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

  checkout() {
    const jsonString = JSON.stringify(this.cartCounter);
    localStorage.setItem('checkoutCart', jsonString);
    console.log(jsonString);
    
    localStorage.setItem("checkoutTotal", this.totalAmount);
    this.router.navigate(["checkout"]);
  }
}
