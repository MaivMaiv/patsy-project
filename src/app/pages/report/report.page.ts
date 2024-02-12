import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ModalController } from '@ionic/angular';
import { ReportBestComponent } from 'src/app/components/report-best/report-best.component';
import { ReportTrendsComponent } from 'src/app/components/report-trends/report-trends.component';
import { ReportVisitsComponent } from 'src/app/components/report-visits/report-visits.component';
import { ReportService } from 'src/app/services/report.service';
import { PatsyDataService } from 'src/app/services/patsy-data.service';

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
  sellerReport = {};
  dayReport =  {};
  monthReport = {};
  constructor(private router: Router, private reportService: ReportService, private modalController: ModalController, private patsyData: PatsyDataService) {}
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
    const month1 = localStorage.getItem('January');
    const month2 = localStorage.getItem('February');
    const month3 = localStorage.getItem('March');
    const month4 = localStorage.getItem('April');
    const month5 = localStorage.getItem('May');
    const month6 = localStorage.getItem('June');
    const month7 = localStorage.getItem('July');
    const month8 = localStorage.getItem('August');
    const month9 = localStorage.getItem('September');
    const month10 = localStorage.getItem('October');
    const month11 = localStorage.getItem('November');
    const month12 = localStorage.getItem('December');
    this.sellerReport = {
      prod1: prod1,
      prod2: prod2,
      prod3: prod3,
      prod4: prod4,
      prod5: prod5,
      prod6: prod6,
      prod7: prod7,
    }
    this.dayReport = {
      day1: day1,
      day2: day2,
      day3: day3,
      day4: day4,
      day5: day5,
      day6: day6,
      day7: day7
    }
    this.monthReport = {
      month1: month1,
      month2: month2,
      month3: month3,
      month4: month4,
      month5: month5,
      month6: month6,
      month7: month7,
      month8: month8,
      month9: month9,
      month10: month10,
      month11: month11,
      month12: month12,
    }
  }

  async reportTrends() {
    const modal = await this.modalController.create({
      component: ReportTrendsComponent,
      componentProps: {
        reportTrendSeller: this.sellerReport,
      },
    });
    return await modal.present();
  }

  async reportVisits() {
    const modal = await this.modalController.create({
      component: ReportVisitsComponent,
      componentProps: {
        dayTrendReport: this.sellerReport, 
        monthTrendReport: this.monthReport
      },
    });
    return await modal.present();
  }

  async reportBest() {
    const modal = await this.modalController.create({
      component: ReportBestComponent,
      componentProps: {
        reportTrendSeller: this.sellerReport,
      },
    });
    return await modal.present();
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
  employee() {
    this.router.navigate(['employee']);
  }
  async exit() {
    const confirmation = await this.patsyData.confirmationAlertMessage('Are you sure you want to exit?')
    if(confirmation) {
      this.router.navigate(['landing']);
      sessionStorage.removeItem('sessionToken');
    }
  }
}
