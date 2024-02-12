import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-report-visits',
  templateUrl: './report-visits.component.html',
  styleUrls: ['./report-visits.component.scss'],
})
export class ReportVisitsComponent  implements OnInit {
  @Input() dayTrendReport: any;
  @Input() monthTrendReport: any;
  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const dailyVisits = document.getElementById('dailyChart') as HTMLCanvasElement;
    const customer1Chart = new Chart(dailyVisits, {
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday",],
        datasets: [
          {
            label: "Orders",
            backgroundColor: ["#352A28"],
            data: [this.dayTrendReport.prod1,this.dayTrendReport.prod2,this.dayTrendReport.prod3,this.dayTrendReport.prod4,this.dayTrendReport.prod5,this.dayTrendReport.prod6,this.dayTrendReport.prod7,]
          }
        ] 
      }
  });
  const monthlyVisits = document.getElementById('weeklyChart') as HTMLCanvasElement;
  const customer2Chart = new Chart(monthlyVisits, {
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Visits",
          backgroundColor: ["#352A28"],
          data: [this.monthTrendReport.month1,this.monthTrendReport.month2,this.monthTrendReport.month3,this.monthTrendReport.month4,this.monthTrendReport.month5,this.monthTrendReport.month6,this.monthTrendReport.month7,this.monthTrendReport.month8,this.monthTrendReport.month9,this.monthTrendReport.month10,this.monthTrendReport.month11,this.monthTrendReport.month12]
        }
      ] 
    }
});
  }

  back() {
    console.log('Back');
  }

  print() {
    console.log('Print');
  }
}
