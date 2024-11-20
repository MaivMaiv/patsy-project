import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Directory, Filesystem } from '@capacitor/filesystem';
import html2canvas from 'html2canvas';
import { App } from '@capacitor/app';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
@Component({
  selector: 'app-report-best',
  templateUrl: './report-best.component.html',
  styleUrls: ['./report-best.component.scss'],
})
export class ReportBestComponent  implements OnInit {
  toBeSortBestSeller: any [][] = [];
  @ViewChild('cardContent', { read: ElementRef })
  cardContent!: ElementRef;
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
  @Input() reportTrendSeller: any;
  constructor(private modalController: ModalController, private patsyData: PatsyDataService, private idGeneratorService: IdGeneratorService) { }

  ionViewDidEnter() {
    this.sortBestSeller();
    this.createChart();
  }
  ngOnInit() {

  }

  createChart() {
    const ctx2 = document.getElementById('typeChart1') as HTMLCanvasElement;
    const productChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: [this.sortedBestSellerProduct.prod1, this.sortedBestSellerProduct.prod2, this.sortedBestSellerProduct.prod3, this.sortedBestSellerProduct.prod4, this.sortedBestSellerProduct.prod5, this.sortedBestSellerProduct.prod6, this.sortedBestSellerProduct.prod7, this.sortedBestSellerProduct.prod8, this.sortedBestSellerProduct.prod9, this.sortedBestSellerProduct.prod10],
        datasets: [
          {
            label: "Orders",
            backgroundColor: ["#ffffff"],
            data: [this.sortedBestSellerAmount.num1, this.sortedBestSellerAmount.num2, this.sortedBestSellerAmount.num3, this.sortedBestSellerAmount.num4, this.sortedBestSellerAmount.num5, this.sortedBestSellerAmount.num6, this.sortedBestSellerAmount.num7, this.sortedBestSellerAmount.num8, this.sortedBestSellerAmount.num9, this.sortedBestSellerAmount.num10],
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
  ctx2.style.backgroundColor = "#352A28";
  const ctx1 = document.getElementById('typeChart2') as HTMLCanvasElement;
  const productChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ["Brewed", "Espresso", "Dine-In", "Non-Coffee", "Mocktails", "Toasties", "Specials"],
      datasets: [
        {
          label: "Orders",
          backgroundColor: ["#ffffff"],
          data: [this.reportTrendSeller.prod1, this.reportTrendSeller.prod2, this.reportTrendSeller.prod3, this.reportTrendSeller.prod4, this.reportTrendSeller.prod5, this.reportTrendSeller.prod6, this.reportTrendSeller.prod7 ]
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
