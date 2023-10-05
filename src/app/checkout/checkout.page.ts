import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutProducts: any[] = [];
  checkoutAmount: any = 0;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  menu(){
    this.router.navigate(['home']);
  }

  ionViewDidEnter() {
    this.initializeCheckout();
  }
  
  initializeCheckout() {
    const savedTotal = localStorage.getItem('checkoutTotal');
    if (savedTotal) {
      this.checkoutAmount = JSON.parse(savedTotal);
      console.log(this.checkoutAmount)
    }
    const savedProducts = localStorage.getItem('checkoutCart');
    if (savedProducts) {
      this.checkoutProducts = JSON.parse(savedProducts);
      console.log(this.checkoutProducts)
    }
  }

}
