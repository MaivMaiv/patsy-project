import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ReportService } from 'src/app/services/report.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  profileId: any;
  patsyProfile = {
    profileID: '',
    profileName: '',
    profileBday: '',
    profilePref: '',
    profilePoints: 0
  };
  profileString: any;
  checkoutProducts: any[] = [];
  checkoutAmount: any = 0;
  memberHasBeenScanned: boolean = false;
  memberName = '';
  memberPoints = 0;
  memberPointsToBeAdded = 0;
  public checkoutDetails: any = {
    checkoutCustomer: '',
    customerType: '',
    transactionType: '',
    checkoutNumber: '',
    checkoutPaid: '',
  };
  constructor(private router: Router, private reportService: ReportService) {
  }
  ngOnInit() {
    this.reportService.checkMonth();
  }
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
      this.memberPointsToBeAdded = this.checkoutAmount * 0.05;
      console.log(this.checkoutAmount);
    }
    const savedProducts = localStorage.getItem('checkoutCart');
    if (savedProducts) {
      this.checkoutProducts = JSON.parse(savedProducts);
      console.log(this.checkoutProducts);

    }
  }
  placeOrder(checkoutAmount: any) {
    console.log("checkout",this.checkoutDetails);
    if(this.memberHasBeenScanned == true) {
      const profileString = JSON.stringify(this.patsyProfile);
      localStorage.removeItem(this.patsyProfile.profileID);
      localStorage.setItem(this.patsyProfile.profileID, profileString);
      // this.profileArray[0].points = this.memberPointsToBeAdded.toString();
      // localStorage.setItem(this.profileId, this.profileArray[0]);
    }
    sessionStorage.setItem('isRefreshed', 'false');
    for(let x = 0 ; x < this.checkoutProducts.length ; x++) {
      this.reportService.checkBestReports(this.checkoutProducts[x].cartName, this.checkoutProducts[x].cartNumber);
      console.log(this.checkoutProducts[x].cartNumber);
    }
    this.reportService.checkMonthlyCounter();
    // this.reportService.checkBestSellerReport(this.checkoutProducts);
    this.reportService.checkProductTypeCounter(this.checkoutProducts);  
    this.reportService.detectDayReport();
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
      this.profileId = result.hasContent;
      this.profileString = localStorage.getItem(result.content);
      if (this.profileString !== null) {
        let profileObject = JSON.parse(this.profileString);
         console.log(profileObject);
         this.patsyProfile.profileID = profileObject.profileID;
         this.patsyProfile.profileName = profileObject.profileName;
         this.patsyProfile.profilePoints = profileObject.profilePoints + this.memberPointsToBeAdded;
         this.patsyProfile.profileBday = profileObject.profileBday;
         this.patsyProfile.profilePref = profileObject.profilePref;
         this.memberName = this.patsyProfile.profileName;
         this.memberPoints = profileObject.profilePoints;
         this.memberHasBeenScanned = true;
         this.checkoutDetails.checkoutCustomer = this.memberName;
      } else {
        console.error('Profile data is null.');
      }
    }
  }
}
