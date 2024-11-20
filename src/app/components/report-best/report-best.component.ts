import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Chart from 'chart.js/auto';
import { Directory, Filesystem } from '@capacitor/filesystem';
import html2canvas from 'html2canvas';
import { PatsyDataService } from 'src/app/services/patsy-data.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-report-best',
  templateUrl: './report-best.component.html',
  styleUrls: ['./report-best.component.scss'],
})
export class ReportBestComponent implements OnInit {
  toBeSortBestSeller: any[][] = [];
  
  @ViewChild('cardContent', { read: ElementRef }) cardContent?: ElementRef;

  sortedBestSellerProduct: { [key: string]: string } = {
    prod1: '', prod2: '', prod3: '', prod4: '', prod5: '',
    prod6: '', prod7: '', prod8: '', prod9: '', prod10: ''
  };
  
  sortedBestSellerAmount: { [key: string]: number } = {
    num1: 0, num2: 0, num3: 0, num4: 0, num5: 0,
    num6: 0, num7: 0, num8: 0, num9: 0, num10: 0
  };
  

  @Input() reportTrendSeller: any;

  private productChart1?: Chart;
  private productChart2?: Chart;

  constructor(
    private modalController: ModalController,
    private patsyData: PatsyDataService,
    private idGeneratorService: IdGeneratorService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.sortBestSeller();
    this.createChart();
  }

  sortBestSeller() {
    try {
      const storedBestSeller = localStorage.getItem('BestSellers');
      if (storedBestSeller) {
        this.toBeSortBestSeller = JSON.parse(storedBestSeller);
        this.toBeSortBestSeller.sort((a, b) => b[1] - a[1]);

        // Assign values dynamically
        for (let i = 0; i < 10; i++) {
          this.sortedBestSellerProduct[`prod${i + 1}`] = this.toBeSortBestSeller[i]?.[0] || '';
          this.sortedBestSellerAmount[`num${i + 1}`] = this.toBeSortBestSeller[i]?.[1] || 0;
        }
      }
    } catch (error) {
      console.error('Failed to sort best sellers:', error);
    }
  }

  createChart() {
    const chartColors = {
      text: '#ffffff',
      grid: '#BEB7A4',
      background: '#000000',
    };

    const ctx2 = document.getElementById('typeChart1') as HTMLCanvasElement;
    const ctx1 = document.getElementById('typeChart2') as HTMLCanvasElement;

    // Destroy existing charts to prevent duplication
    this.productChart2?.destroy();
    this.productChart1?.destroy();

    // Chart 1
    this.productChart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: Object.values(this.sortedBestSellerProduct),
        datasets: [
          {
            label: 'Orders',
            backgroundColor: ['#ffffff'],
            data: Object.values(this.sortedBestSellerAmount),
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: { size: 25 },
              color: chartColors.text,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: chartColors.grid },
            ticks: { font: { size: 20 }, color: chartColors.grid },
          },
          x: {
            grid: { color: chartColors.grid },
            ticks: { font: { size: 17 }, color: chartColors.grid },
          },
        },
      },
    });

    ctx2.style.backgroundColor = chartColors.background;

    // Chart 2
    this.productChart1 = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Brewed', 'Espresso', 'Dine-In', 'Non-Coffee', 'Mocktails', 'Toasties', 'Specials'],
        datasets: [
          {
            label: 'Orders',
            backgroundColor: ['#ffffff'],
            data: [
              this.reportTrendSeller.prod1,
              this.reportTrendSeller.prod2,
              this.reportTrendSeller.prod3,
              this.reportTrendSeller.prod4,
              this.reportTrendSeller.prod5,
              this.reportTrendSeller.prod6,
              this.reportTrendSeller.prod7,
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              font: { size: 25 },
              color: chartColors.text,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: chartColors.grid },
            ticks: { font: { size: 20 }, color: chartColors.grid },
          },
          x: {
            grid: { color: chartColors.grid },
            ticks: { font: { size: 17 }, color: chartColors.grid },
          },
        },
      },
    });
  }

  async captureScreenshot() {
    if (this.cardContent) {
      const element = this.cardContent.nativeElement;
      html2canvas(element).then(async (canvas) => {
        await this.saveCanvasImage(canvas);
      });
    } else {
      console.error('Card content is not available');
    }
  }

  async saveCanvasImage(canvas: HTMLCanvasElement) {
    const dataUrl = canvas.toDataURL('image/png');
    const report = this.idGeneratorService.generateReportID();
    const fileName = `${report}.png`;

    try {
      await Filesystem.writeFile({
        path: `${Directory.Documents}/${fileName}`,
        data: dataUrl,
        directory: Directory.Documents,
        recursive: true,
      });
      this.patsyData.toastMessageSuccess('Image Saved Successfully! Check your gallery.', 1500);
    } catch (error) {
      this.patsyData.toastMessageError(`ERROR: ${error}`);
    }
  }

  back() {
    this.modalController.dismiss();
  }

  async print() {
    await this.captureScreenshot();
  }
}
