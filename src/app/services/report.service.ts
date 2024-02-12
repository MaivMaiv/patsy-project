import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  currentMonth: string = '';
  constructor() { }

  initializeReports() {
    const prodReport = localStorage.getItem('espressoCounter');
    const salesReport = localStorage.getItem('allTimeCounter');
    const trendReport = localStorage.getItem('mon');
    const monthReport = localStorage.getItem('January');
    const bestReport = localStorage.getItem('BestSellers');
    if(prodReport !== null){
      console.log("Item exists: ", prodReport);
    } else {
      this.initializeProdReports();
    }
    if(salesReport !== null) {
      console.log("Item exists: ", salesReport);
    } else {
      this.initializeSaleReports();
    }
    if(trendReport !== null){
      console.log("Item exists: ", trendReport);
    } else {
      this.initializeTrendReports();
    }
    if(monthReport !== null){
      console.log("Item exists: ", monthReport);
    } else {
      this.initializeMonthlyReports();
    }
    if(bestReport !== null){
      console.log("Item exists: ", bestReport);
    } else {
      this.initializeBestReports();
    }
  }

  initializeProdReports() {
    localStorage.setItem('espressoCounter', JSON.stringify(0));
    localStorage.setItem('brewedCounter', JSON.stringify(0));
    localStorage.setItem('dineinCounter', JSON.stringify(0));
    localStorage.setItem('toastiesCounter', JSON.stringify(0));
    localStorage.setItem('mocktailsCounter', JSON.stringify(0));
    localStorage.setItem('noncoffeeCounter', JSON.stringify(0));
    localStorage.setItem('specialsCounter', JSON.stringify(0));
    sessionStorage.setItem('isRefreshed', 'true');
  }

  initializeSaleReports() {
    localStorage.setItem('allTimeCounter', JSON.stringify(0));
    localStorage.setItem('monthTimeCounter', JSON.stringify(0));
    localStorage.setItem('weekTimeCounter', JSON.stringify(0));
    localStorage.setItem('dayTimeCounter', JSON.stringify(0));
  }

  initializeTrendReports() {
    localStorage.setItem('mon', JSON.stringify(0));
    localStorage.setItem('tues', JSON.stringify(0));
    localStorage.setItem('wed', JSON.stringify(0));
    localStorage.setItem('thurs', JSON.stringify(0));
    localStorage.setItem('fri', JSON.stringify(0));
    localStorage.setItem('sat', JSON.stringify(0));
    localStorage.setItem('sun', JSON.stringify(0));
  }

  initializeMonthlyReports() {
    localStorage.setItem('January', JSON.stringify(0));
    localStorage.setItem('February', JSON.stringify(0));
    localStorage.setItem('March', JSON.stringify(0));
    localStorage.setItem('April', JSON.stringify(0));
    localStorage.setItem('May', JSON.stringify(0));
    localStorage.setItem('June', JSON.stringify(0));
    localStorage.setItem('July', JSON.stringify(0));
    localStorage.setItem('August', JSON.stringify(0));
    localStorage.setItem('September', JSON.stringify(0));
    localStorage.setItem('October', JSON.stringify(0));
    localStorage.setItem('November', JSON.stringify(0));
    localStorage.setItem('December', JSON.stringify(0));
  }

  initializeBestReports() {
    const emptyArrayOfProduct: any[][] = [];
    const emptyArrayOfProductToLocalStorage = JSON.stringify(emptyArrayOfProduct);
    localStorage.setItem('BestSellers', emptyArrayOfProductToLocalStorage);
  }

  createBestReport(product: any) {
    let retrievedArrayOfProducts: any[][] = [];
    const bestSellerList = localStorage.getItem('BestSellers');
    let newProduct: any[][] = [[product, 0]];
    if(bestSellerList) {
      retrievedArrayOfProducts = JSON.parse(bestSellerList);
      retrievedArrayOfProducts.push(...newProduct);
      localStorage.setItem('BestSellers', JSON.stringify(retrievedArrayOfProducts));
      console.log(localStorage.getItem('BestSellers'));
    } else {
      console.log("No Data Found!");
    }
  }

  checkBestReports(checkoutProduct: any, checkoutProductAmount: any) {
    let productOfArrays: any [][] = [];
    const bestSellerList = localStorage.getItem('BestSellers');
    if(bestSellerList){
      productOfArrays = JSON.parse(bestSellerList);
    }
    const productIndex = productOfArrays.findIndex(subArrayProduct => subArrayProduct.includes(checkoutProduct));
    if(productIndex !== -1) {
      let total = productOfArrays[productIndex][1] + checkoutProductAmount;
      console.log(total);
      productOfArrays[productIndex][1] = total;
    }
    localStorage.setItem('BestSellers', JSON.stringify(productOfArrays));
  }

  checkMonth() {
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();

    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    sessionStorage.setItem('Month', monthNames[monthIndex]);
    console.log(monthNames[monthIndex]);
    return monthNames[monthIndex];
  }

  checkMonthlyCounter() {
    const currentMonth = sessionStorage.getItem("Month");
    if(currentMonth == 'January'){
      const storedValue = localStorage.getItem('January');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('January', counterHolder?.toString());
      }
    }
    if(currentMonth == 'February'){
      const storedValue = localStorage.getItem('February');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('February', counterHolder?.toString());
      }
    }
    if(currentMonth == 'March'){
      const storedValue = localStorage.getItem('March');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('March', counterHolder?.toString());
      }
    }
    if(currentMonth == 'April'){
      const storedValue = localStorage.getItem('April');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('April', counterHolder?.toString());
      }
    }
    if(currentMonth == 'May'){
      const storedValue = localStorage.getItem('May');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('May', counterHolder?.toString());
      }
    }
    if(currentMonth == 'June'){
      const storedValue = localStorage.getItem('June');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('June', counterHolder?.toString());
      }
    }
    if(currentMonth == 'July'){
      const storedValue = localStorage.getItem('July');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('July', counterHolder?.toString());
      }
    }
    if(currentMonth == 'August'){
      const storedValue = localStorage.getItem('August');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('August', counterHolder?.toString());
      }
    }
    if(currentMonth == 'September'){
      const storedValue = localStorage.getItem('September');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('September', counterHolder?.toString());
      }
    }
    if(currentMonth == 'October'){
      const storedValue = localStorage.getItem('October');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('October', counterHolder?.toString());
      }
    }
    if(currentMonth == 'November'){
      const storedValue = localStorage.getItem('November');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('November', counterHolder?.toString());
      }
    }
    if(currentMonth == 'December'){
      const storedValue = localStorage.getItem('December');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('December', counterHolder?.toString());
      }
    }
  }

  checkProductTypeCounter(checkoutArray: any[]): void {
    for(let x = 0 ; x < checkoutArray.length ; x++){
      if(checkoutArray[x].cartType == 'expresso') {  
        const storedValue = localStorage.getItem('espressoCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('espressoCounter', counterHolder?.toString());
        }
      } else if(checkoutArray[x].cartType == 'brewed') {
        const storedValue = localStorage.getItem('brewedCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('brewedCounter', counterHolder?.toString());
        }
      } else if(checkoutArray[x].cartType == 'mocktails') {
        const storedValue = localStorage.getItem('mocktailsCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('mocktailsCounter', counterHolder?.toString());
        }
      } else if(checkoutArray[x].cartType == 'dine-In') {
        const storedValue = localStorage.getItem('dineinCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('dineinCounter', counterHolder?.toString());
        }
      } else if(checkoutArray[x].cartType == 'specials') {
        const storedValue = localStorage.getItem('specialsCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('specialsCounter', counterHolder?.toString());
        }
      } else if(checkoutArray[x].cartType == 'toasties') {
        const storedValue = localStorage.getItem('toastiesCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('toastiesCounter', counterHolder?.toString());
        }
      } else if(checkoutArray[x].cartType == 'non-Coffee') {
        const storedValue = localStorage.getItem('noncoffeeCounter');
        if(storedValue !== null){
          let counterHolder = parseInt(storedValue, 10);
          counterHolder = counterHolder + checkoutArray[x].cartNumber;
          localStorage.setItem('noncoffeeCounter', counterHolder?.toString());
        }
      }
    }
  }

  detectDayReport() {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    if (currentDay === 1) {
      console.log('Today is Monday.');
      const storedValue = localStorage.getItem('mon');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('mon', counterHolder?.toString());
      }
    } else if (currentDay === 2) {
      console.log('Today is Tuesday.');
      const storedValue = localStorage.getItem('tues');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('tues', counterHolder?.toString());
      }
    } else if (currentDay === 3) {
      console.log('Today is Wednesday.');
      const storedValue = localStorage.getItem('wed');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('wed', counterHolder?.toString());
      }
    } else if (currentDay === 4) {
      console.log('Today is Thursday.');
      const storedValue = localStorage.getItem('thurs');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('thurs', counterHolder?.toString());
      }
    } else if (currentDay === 5) {
      console.log('Today is Friday.');
      const storedValue = localStorage.getItem('fri');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('fri', counterHolder?.toString());
      }
    } else if (currentDay === 6) {
      console.log('Today is Saturday.');
      const storedValue = localStorage.getItem('sat');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('sat', counterHolder?.toString());
      }
    } else {
      console.log('Today is Sunday.');
      const storedValue = localStorage.getItem('sun');
      if(storedValue !== null){
        let counterHolder = parseInt(storedValue, 10);
        counterHolder = counterHolder + 1;
        localStorage.setItem('sun', counterHolder?.toString());
      }
    }
  }

  // checkBestSellerReport(checkoutArray: any[]): void {
  //   for(let x = 0 ; x < checkoutArray.length ; x++){
  //     let bestSellerLocalStorage = localStorage.getItem('BestSellers');
  //     if(bestSellerLocalStorage !== null){
  //       let bestSellerParsed: [string, number][] = JSON.parse(bestSellerLocalStorage || '[]');
  //       let bestSellerSelected = bestSellerParsed.find((item: [string, number]) => item[0] === checkoutArray[x].cartName );
  //       if (bestSellerSelected) {
  //         bestSellerSelected[1]++;
  //         console.log(`Updated item: ${bestSellerSelected}`);
  //         console.log(bestSellerLocalStorage);
  //       } else {
  //         console.log(`Item not found: ${bestSellerSelected}`);
  //       }
  //       localStorage.setItem('BestSellers', JSON.stringify(bestSellerParsed));
  //     }
  //   }
  // }

  refreshPage() {
    const status = sessionStorage.getItem('isRefreshed');
    if(status == 'false'){
      sessionStorage.setItem('isRefreshed', 'true');
      location.reload();
    } else {
      console.log('Page is already refreshed');
    }
  }
}
