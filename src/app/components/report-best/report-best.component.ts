import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-report-best',
  templateUrl: './report-best.component.html',
  styleUrls: ['./report-best.component.scss'],
})
export class ReportBestComponent  implements OnInit {
  toBeSortBestSeller: any [][] = [];
  sortedBestSellerProduct: { prod1: string, prod2: string, prod3: string, prod4: string, prod5: string, prod6: string, prod7: string, prod8: string, prod9: string, prod10: string} = {
    prod1: '',
    prod2: '',
    prod3: '',
    prod4: '',
    prod5: '',
    prod6: '',
    prod7: '',
    prod8: '',
    prod9: '',
    prod10: ''
  }
  sortedBestSellerAmount: { num1: number, num2: number, num3: number, num4: number, num5: number, num6: number, num7: number, num8: number, num9: number, num10: number} = {
    num1: 0,
    num2: 0,
    num3: 0,
    num4: 0,
    num5: 0,
    num6: 0,
    num7: 0,
    num8: 0,
    num9: 0,
    num10: 0
  }
  constructor() { }

  ionViewDidEnter() {
    this.sortBestSeller();
  }
  ngOnInit() {
  }

  sortBestSeller(){
    const storedBestSeller = localStorage.getItem('BestSellers');
    console.log(storedBestSeller);
    if (storedBestSeller) {
      this.toBeSortBestSeller = JSON.parse(storedBestSeller);
      console.log(this.toBeSortBestSeller);
      this.toBeSortBestSeller.sort((a, b) => b[1] - a[1]);
      console.log(this.toBeSortBestSeller);
    }
    this.sortedBestSellerProduct.prod1 = this.toBeSortBestSeller[0][0];
    this.sortedBestSellerAmount.num1 = this.toBeSortBestSeller[0][1];
    this.sortedBestSellerProduct.prod2 = this.toBeSortBestSeller[1][0];
    this.sortedBestSellerAmount.num2 = this.toBeSortBestSeller[1][1];
    this.sortedBestSellerProduct.prod3 = this.toBeSortBestSeller[2][0];
    this.sortedBestSellerAmount.num3 = this.toBeSortBestSeller[2][1];
    this.sortedBestSellerProduct.prod4 = this.toBeSortBestSeller[3][0];
    this.sortedBestSellerAmount.num4 = this.toBeSortBestSeller[3][1];
    this.sortedBestSellerProduct.prod5 = this.toBeSortBestSeller[4][0];
    this.sortedBestSellerAmount.num5 = this.toBeSortBestSeller[4][1];
    this.sortedBestSellerProduct.prod6 = this.toBeSortBestSeller[5][0];
    this.sortedBestSellerAmount.num6 = this.toBeSortBestSeller[5][1];
    this.sortedBestSellerProduct.prod7 = this.toBeSortBestSeller[6][0];
    this.sortedBestSellerAmount.num7 = this.toBeSortBestSeller[6][1];
    this.sortedBestSellerProduct.prod8 = this.toBeSortBestSeller[7][0];
    this.sortedBestSellerAmount.num8 = this.toBeSortBestSeller[7][1];
    this.sortedBestSellerProduct.prod9 = this.toBeSortBestSeller[8][0];
    this.sortedBestSellerAmount.num9 = this.toBeSortBestSeller[8][1];
    this.sortedBestSellerProduct.prod10 = this.toBeSortBestSeller[9][0];
    this.sortedBestSellerAmount.num10 = this.toBeSortBestSeller[9][1];
  }

  back() {
    console.log('Back');
  }

  print() {
    console.log('Print');
  }
}
