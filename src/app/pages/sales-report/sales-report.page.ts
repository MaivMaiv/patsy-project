import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { count } from 'console';
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.page.html',
  styleUrls: ['./sales-report.page.scss'],
})
export class SalesReportPage implements OnInit {
  items: any[] = [];
  allRows: any[] = [];
  parsedSalesData: any;
  newItem: string = '';
  allTotalSales = 0;
  allTotalServes = 0;
  allTotalHours = 0;
  allColumns = [
    { prop: 'name' },
    { prop: 'orders' },
    { prop: 'transaction' },
    { prop: 'balance' },
    { prop: 'payment' },
    { prop: 'barista' },
    { prop: 'date' },
  ];
  orderedText = '';
  counter = 0;
  constructor(private router: Router) {}

  async ionViewDidEnter() {
  }

  ngOnInit() {
    this.getSalesData();
  }

  getSalesData() {
    const salesData = localStorage.getItem('salesRecord');
    if(salesData) {
      let sales = JSON.parse(salesData);
      console.log('Sales: ', sales);
      console.log(sales[0].customerNumber[0]);
      // for (let y = 0 ; y < sales.length ; y ++) {
      //   this.counter = this.counter + sales[y].customerNumber.length;
      // }
      for (let x = 0 ; x < sales.length ; x++) {
        for(let z = 0 ; z < sales[x].customerNumber.length ; z++) {
          this.orderedText = this.orderedText + sales[x].customerOrders[z] + ' = ' + sales[x].customerNumber[z] + ' ';
          console.log(this.orderedText);
        }
      
      let employeeBarista = {
        name: sales[x].customerName,
        orders: this.orderedText,
        type: sales[x].customerType,
        transaction: sales[x].customerTransaction,
        balance: sales[x].customerBalance,
        payment: sales[x].customerPayment,
        date: sales[x].customerDate
      }
      console.log(employeeBarista);
      this.allRows.push(employeeBarista);
      this.orderedText = '';
      }
    }

  }

  back() {
    this.router.navigate(['report']);
  }
}
