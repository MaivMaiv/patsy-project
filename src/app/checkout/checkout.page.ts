import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutProducts: any[] = [];
  checkoutAmount: any = 0;
  memberHasBeenScanned: boolean = false;
  public checkoutDetails: any = {
    checkoutCustomer: '',
    customerType: '',
    transactionType: '',
    checkoutNumber: '',
    checkoutPaid: ''
  };
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {}
  menu() {
    this.router.navigate(['home']);
  }
  ionViewDidEnter() {
    this.initializeCheckout();
  }
  initializeCheckout() {
    const savedTotal = localStorage.getItem('checkoutTotal');
    if (savedTotal) {
      this.checkoutAmount = JSON.parse(savedTotal);
      console.log(this.checkoutAmount);
    }
    const savedProducts = localStorage.getItem('checkoutCart');
    if (savedProducts) {
      this.checkoutProducts = JSON.parse(savedProducts);
      console.log(this.checkoutProducts);
    }
  }
  placeOrder() {
    console.log(this.checkoutDetails);
    localStorage.setItem(
      'checkoutDetails',
      JSON.stringify(this.checkoutDetails)
    );
    this.router.navigate(['receipt']);
  }
  async scanProfile() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      console.log(result.content);
      let profileString = localStorage.getItem(result.content);
      if (profileString !== null) {
        let profileObject = JSON.parse(profileString);
        let profileArray = [];
        profileArray.push(profileObject);
        const data = {
          id: profileArray[0].id,
          name: profileArray[0].name,
          bday: profileArray[0].bday,
          pref: profileArray[0].pref,
        };
        this.memberHasBeenScanned = true;
      } else {
        console.error('Profile data is null.');
      }
    }
  }
}
