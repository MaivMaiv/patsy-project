import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReportService } from '../services/report.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit  {
  allTimeAmount = 0;
  monthTimeAmount = 0;
  weekTimeAmount = 0;
  dayTimeAmount = 0;
  constructor(private router: Router, private reportService: ReportService) {}
  ngOnInit() {
    const allTime = localStorage.getItem('allTimeCounter');
    const monthTime = localStorage.getItem('monthTimeCounter');
    const weekTime = localStorage.getItem('weekTimeCounter');
    const dayTime = localStorage.getItem('dayTimeCounter');
    if(allTime !== null){
      let counterHolder = parseInt(allTime, 10);
      this.allTimeAmount = counterHolder;
    }
    if(monthTime !== null){
      let counterHolder = parseInt(monthTime, 10);
      this.monthTimeAmount = counterHolder;
    }
    if(weekTime !== null){
      let counterHolder = parseInt(weekTime, 10);
      this.weekTimeAmount = counterHolder;
    }
    if(dayTime !== null){
      let counterHolder = parseInt(dayTime, 10);
      this.dayTimeAmount = counterHolder;
    }
  }
  ionViewDidEnter() {
    this.reportService.refreshPage();
    const prod1 = localStorage.getItem('brewedCounter');
    const prod2 = localStorage.getItem('espressoCounter');
    const prod3 = localStorage.getItem('dineinCounter');
    const prod4 = localStorage.getItem('noncoffeeCounter');
    const prod5 = localStorage.getItem('mocktailsCounter');
    const prod6 = localStorage.getItem('toastiesCounter');
    const prod7 = localStorage.getItem('specialsCounter');
    const day1 = localStorage.getItem('mon');
    const day2 = localStorage.getItem('tues');
    const day3 = localStorage.getItem('wed');
    const day4 = localStorage.getItem('thurs');
    const day5 = localStorage.getItem('fri');
    const day6 = localStorage.getItem('sat');
    const day7 = localStorage.getItem('sun');
    let sellerTypeReport = {
      prod1: prod1,
      prod2: prod2,
      prod3: prod3,
      prod4: prod4,
      prod5: prod5,
      prod6: prod6,
      prod7: prod7,
    }
    let dayTrendReport = {
      day1: day1,
      day2: day2,
      day3: day3,
      day4: day4,
      day5: day5,
      day6: day6,
      day7: day7
    }
    this.createChart(sellerTypeReport, dayTrendReport);
  }
  createChart(sellerTypeReport: any, dayTrendReport: any) {
    const ctx1 = document.getElementById('customerChart') as HTMLCanvasElement;
    const customerChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday",],
        datasets: [
          {
            label: "Orders",
            backgroundColor: ["#F94144", "#F3722C","#F8961E","#F9C74F","#90BE6D", "#43AA8B", "#577590"],
            data: [dayTrendReport.day1,dayTrendReport.day2,dayTrendReport.day3,dayTrendReport.day4,dayTrendReport.day5,dayTrendReport.day6,dayTrendReport.day7]
          }
        ] 
      }
  });
  const ctx2 = document.getElementById('typeChart') as HTMLCanvasElement;
  const productChart = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ["Brewed", "Espresso", "Dine-In", "Non-Coffee", "Mocktails", "Toasties", "Specials"],
      datasets: [
        {
          label: "Orders",
          backgroundColor: ["#F94144", "#F3722C","#F8961E","#F9C74F","#90BE6D", "#43AA8B", "#577590"],
          data: [sellerTypeReport.prod1,sellerTypeReport.prod2,sellerTypeReport.prod3,sellerTypeReport.prod4,sellerTypeReport.prod5,sellerTypeReport.prod6,sellerTypeReport.prod7]
        }
      ] 
    },
    options: {
      indexAxis: 'y',
    }
});
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
  exit() {
    console.log('The app has exited.');
    App.exitApp();
  }
}
