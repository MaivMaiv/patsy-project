import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  initializeReports() {
    const prodReport = localStorage.getItem('espressoCounter');
    const salesReport = localStorage.getItem('allTimeCounter');
    const trendReport = localStorage.getItem('mon');
    if(prodReport !== null){
      console.log("Item exists: ", prodReport);
    } else {
      this.initializeProdReports();
    }
    if(salesReport !== null) {
      console.log("Item exists: ", prodReport);
    } else {
      this.initializeSaleReports();
    }
    if(trendReport !== null){
      console.log("Item exists: ", prodReport);
    } else {
      this.initializeTrendReports();
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

  detectIfDayEnded(checkoutAmount: any) {
    setInterval(() => {
      if (moment().isSameOrAfter(moment().endOf('day'))) {
        console.log('The day has ended.');
      localStorage.setItem('dayTimeCounter', JSON.stringify(0));
      }
    }, 1000);
      console.log('The day is still ongoing.');
      const dayTimeValue = localStorage.getItem('dayTimeCounter');
      if(dayTimeValue !== null){
        let counterHolder = parseInt(dayTimeValue, 10);
        counterHolder = counterHolder + checkoutAmount;
        localStorage.setItem('dayTimeCounter', counterHolder?.toString());
      }
  }

  detectIfWeekEnded(checkoutAmount: any) {
    setInterval(() => {
      if (moment().isSameOrAfter(moment().endOf('isoWeek'))) {
        console.log('The week has ended.');
        localStorage.setItem('weekTimeCounter', JSON.stringify(0));
      }
    }, 1000);
      console.log('The day is still ongoing.');
      const weekTimeValue = localStorage.getItem('weekTimeCounter');
      if(weekTimeValue !== null){
        let counterHolder = parseInt(weekTimeValue, 10);
        counterHolder = counterHolder + checkoutAmount;
        localStorage.setItem('weekTimeCounter', counterHolder?.toString());
      }
  }

  detectIfMonthEnded(checkoutAmount: any) {
    setInterval(() => {
      if (moment().isSameOrAfter(moment().endOf('month'))) {
        console.log('The month has ended.');
        localStorage.setItem('monthTimeCounter', JSON.stringify(0));
      }
    }, 1000);
      console.log('The month is still ongoing.');
      const monthTimeValue = localStorage.getItem('monthTimeCounter');
      if(monthTimeValue !== null){
        let counterHolder = parseInt(monthTimeValue, 10);
        counterHolder = counterHolder + checkoutAmount;
        localStorage.setItem('monthTimeCounter', counterHolder?.toString());
      }
  }

  detectIfAllTime(checkoutAmount: any) {
    const allTimeValue = localStorage.getItem('allTimeCounter');
    if(allTimeValue !== null){
      let counterHolder = parseInt(allTimeValue, 10);
      counterHolder = counterHolder + checkoutAmount;
      localStorage.setItem('allTimeCounter', counterHolder?.toString());
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

  checkBestSellerReport(checkoutArray: any[]): void {
    for(let x = 0 ; x < checkoutArray.length ; x++){
      let bestSellerLocalStorage = localStorage.getItem('BestSellers');
      if(bestSellerLocalStorage !== null){
        let bestSellerParsed: [string, number][] = JSON.parse(bestSellerLocalStorage || '[]');
        let bestSellerSelected = bestSellerParsed.find((item: [string, number]) => item[0] === checkoutArray[x].cartName );
        if (bestSellerSelected) {
          bestSellerSelected[1]++;
          console.log(`Updated item: ${bestSellerSelected}`);
          console.log(bestSellerLocalStorage);
        } else {
          console.log(`Item not found: ${bestSellerSelected}`);
        }
        localStorage.setItem('BestSellers', JSON.stringify(bestSellerParsed));
      }
    }
  }

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
