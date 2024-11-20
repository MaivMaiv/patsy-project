import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatsyDataService } from 'src/app/services/patsy-data.service';

@Component({
  selector: 'app-barista-report',
  templateUrl: './barista-report.page.html',
  styleUrls: ['./barista-report.page.scss'],
})
export class BaristaReportPage implements OnInit {
  baristaRows: any[] = [];
  allRows: any[] = [];
  baristaName = '';
  baristaRecordList: any[] = [];
  allTotalSales = 0;
  allTotalServes = 0;
  allTotalHours = 0;
  allColumns = [
    { prop: 'day' },
    { prop: 'clockIn' },
    { prop: 'serves' },
    { prop: 'clockOut' },
    { prop: 'sales' },
  ];


  constructor(private route: ActivatedRoute, private patsyData: PatsyDataService, private router: Router) {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.baristaName = params['barista'];;
  });
  console.log(this.baristaName);
    const storedList = localStorage.getItem(this.baristaName);
    if(storedList) {
      this.baristaRecordList = JSON.parse(storedList);
      console.log(this.baristaRecordList);
      for(let y = 0 ; y < this.baristaRecordList.length ; y++) {
        let day = this.baristaRecordList[y].day;
        let clockIn = this.baristaRecordList[y].clockIn;
        let serves = this.baristaRecordList[y].serves;
        let clockOut = this.baristaRecordList[y].clockOut;
        let sales = '₱ ' + this.baristaRecordList[y].sales +'.00';
        this.convertEmployeeData(day, clockIn, serves, clockOut, sales)
      }
    }
    this.getAllTotalData();
    this.sortAllRowsByDay();
  }

  ngOnInit() {
  }

  sortAllRowsByDay() {
    this.allRows.sort((a: any, b: any) => {
      const dateA = new Date(a.day);
      const dateB = new Date(b.day);
      return dateB.getTime() - dateA.getTime();
    });
  }

  getAllTotalData() {
    for (let x = 0 ; x < this.allRows.length ; x++) {
      let charToRemove1 = '₱ ';
      let modifiedString = this.allRows[x].sales.replace(charToRemove1, "");
      this.allTotalSales = parseFloat(modifiedString) + this.allTotalSales;

      this.allTotalServes = this.allRows[x].serves + this.allTotalServes;

      const clockInTime = this.parseTime(this.allRows[x].clockIn);
      const clockOutTime = this.parseTime(this.allRows[x].clockOut);
      if (clockInTime !== null && clockOutTime !== null) {
        let timeDiffSeconds = clockOutTime - clockInTime;
        if (timeDiffSeconds < 0) {
          timeDiffSeconds += 24 * 3600;
        }
        const totalCount = timeDiffSeconds / 3600;
        this.allTotalHours += totalCount;
      } else {
        console.log("Invalid time format");
        this.patsyData.toastMessageError("Error: Invalid Time Format");
      }
    }
    this.allTotalHours = parseFloat(this.allTotalHours.toFixed(2));
  }

private parseTime(timeStr: string): number | null {
  const timeRegex = /(\d+):(\d+)\s+(AM|PM)/i;
  const match = timeStr.match(timeRegex);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toLowerCase();

    if (period === 'pm' && hours < 12) {
      hours += 12;
    } else if (period === 'am' && hours === 12) {
      hours = 0;
    }

    return hours * 3600 + minutes * 60;
  }
  return null;
}

  convertEmployeeData( day: any, cIn: any, served: any, cOut: any, sale: any) {
    console.log(sale)
    let employeeBarista = {
      day: day,
      clockIn: cIn,
      serves: served,
      clockOut: cOut,
      sales: sale
    }
    console.log(employeeBarista.sales);
    this.allRows.push(employeeBarista);
    console.log('BRows:', this.baristaRecordList);
    console.log('Rows:',this.allRows);
  }
  
  back() {
    this.router.navigate(['employee-report']);
  }
}
