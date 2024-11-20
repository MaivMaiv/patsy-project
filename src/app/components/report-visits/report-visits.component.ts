import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Directory, Filesystem } from '@capacitor/filesystem';
import html2canvas from 'html2canvas';
import { App } from '@capacitor/app';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
@Component({
  selector: 'app-report-visits',
  templateUrl: './report-visits.component.html',
  styleUrls: ['./report-visits.component.scss'],
})
export class ReportVisitsComponent  implements OnInit {
  @Input() dayTrendReport: any;
  @Input() monthTrendReport: any;
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
  constructor(private modalController: ModalController, private patsyData: PatsyDataService, private idGeneratorService: IdGeneratorService) { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const dailyVisits = document.getElementById('dailyChart') as HTMLCanvasElement;
    const customer1Chart = new Chart(dailyVisits, {
      type: 'line',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday",],
        datasets: [
          {
            label: "Customers",
            backgroundColor: ["#ffffff"],
            borderColor:  ["#ffffff"],
            borderWidth: 5, 
            data: [this.dayTrendReport.prod1,this.dayTrendReport.prod2,this.dayTrendReport.prod3,this.dayTrendReport.prod4,this.dayTrendReport.prod5,this.dayTrendReport.prod6,this.dayTrendReport.prod7,]
          }
        ] 
      },
      options: {
        plugins: {
          legend: {
              labels: {
                  font: {
                      size: 25
                  },
                  color: '#ffffff'
              }
          }
      },
        scales: {
        y: {
            beginAtZero: true,
            grid: {
              color: '#FF733A'
            },
            ticks: {
              font: {
                size: 20,
              },               
              color: '#FF733A'
            }
        },
        x: {
          beginAtZero: true,
          grid: {
            color: '#FF733A'
          },
          ticks: {
            font: {
              size: 17,
            },               
            color: '#FF733A'
          }
        },
      },
    }
  });
    dailyVisits.style.backgroundColor = "#352A28";

  const monthlyVisits = document.getElementById('monthlyChart') as HTMLCanvasElement;
  const customer2Chart = new Chart(monthlyVisits, {
    type: 'line',
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "Visits",
          backgroundColor: ["#ffffff"],
          borderColor:  ["#ffffff"],
          borderWidth: 5, 
          data: [this.monthTrendReport.month1,this.monthTrendReport.month2,this.monthTrendReport.month3,this.monthTrendReport.month4,this.monthTrendReport.month5,this.monthTrendReport.month6,this.monthTrendReport.month7,this.monthTrendReport.month8,this.monthTrendReport.month9,this.monthTrendReport.month10,this.monthTrendReport.month11,this.monthTrendReport.month12]
        }
      ] 
    },
    options: {
      plugins: {
        legend: {
            labels: {
                font: {
                    size: 25
                },
                color: '#ffffff'
            }
        }
    },
      scales: {
      y: {
          beginAtZero: true,
          grid: {
            color: '#FF733A'
          },
          ticks: {
            font: {
              size: 20,
            },               
            color: '#FF733A'
          }
      },
      x: {
        beginAtZero: true,
        grid: {
          color: '#FF733A'
        },
        ticks: {
          font: {
            size: 17,
          },               
          color: '#FF733A'
        }
      },
    },
  }
});
  monthlyVisits.style.backgroundColor = "#352A28";
  }

  back() {
    this.modalController.dismiss({

    })
  }

  async print() {
    await this.captureScreenshot();
  }

  async saveCanvasImage(canvas: any) {
    const dataUrl = canvas.toDataURL('image/png');
    const report = this.idGeneratorService.generateReportID();
    const fileName = report + '.png';
    const path = `${Directory.Documents}/${fileName}`;

    try {
      await Filesystem.writeFile({
        path,
        data: dataUrl,
        directory: Directory.Documents,
        recursive: true
      });
      this.patsyData.toastMessageSuccess('Image Saved Successfully! Check your gallery.', 1500);
    } catch (error) {
      this.patsyData.toastMessageError('ERROR!' + error);
    }
  }
  async captureScreenshot() {
    const element = this.cardContent.nativeElement;
    html2canvas(element).then(async (canvas) => {
      await this.saveCanvasImage(canvas);
    });
  }
}
