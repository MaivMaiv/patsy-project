import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-report-trends',
  templateUrl: './report-trends.component.html',
  styleUrls: ['./report-trends.component.scss'],
})
export class ReportTrendsComponent  implements OnInit {
 @Input() reportTrendSeller: any;
  constructor() { }

  ngOnInit() {
    this.createChart();
    console.log(this.reportTrendSeller);
  }

  createChart() {
    const ctx2 = document.getElementById('typeChart') as HTMLCanvasElement;
    const productChart = new Chart(ctx2, {
      type: 'pie',
      data: {
        labels: ["Brewed", "Espresso", "Dine-In", "Non-Coffee", "Mocktails", "Toasties", "Specials"],
        datasets: [
          {
            label: "Orders",
            backgroundColor: ["#F94144", "#F3722C","#F8961E","#F9C74F","#90BE6D", "#43AA8B", "#577590"],
            data: [this.reportTrendSeller.prod1, this.reportTrendSeller.prod2, this.reportTrendSeller.prod3, this.reportTrendSeller.prod4, this.reportTrendSeller.prod5, this.reportTrendSeller.prod6, this.reportTrendSeller.prod7 ]
          }
        ] 
      },
      options: {
        indexAxis: 'y',
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
