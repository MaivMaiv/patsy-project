// employee-report.page.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.page.html',
  styleUrls: ['./employee-report.page.scss'],
})
export class EmployeeReportPage implements OnInit {
  myData = [];
  baristaName = '';
  adminManifestList: any[] = [];
  columns = [
    { prop: 'day' },
    { prop: 'clockIn' },
    { prop: 'serves' },
    { prop: 'clockOut' },
    { prop: 'sales' },
  ];

  constructor() {
    const storedList = localStorage.getItem('MasterList');
    if(storedList) {
      const parsedList = JSON.parse(storedList);
      this.adminManifestList = parsedList;
    }
  }

  ngOnInit() {

  }

  handleChange(e: any) {
    this.baristaName = e.target.value;
    const storedData = localStorage.getItem(e.target.value);
    if(storedData) {
      const parsedData = JSON.parse(storedData);
      this.myData.length = 0;
      this.myData = parsedData.map((item: { sales: string; }) => {
        return {
          ...item,
          sales: '₱ ' + item.sales + '.00'
        };
      });
    }
  }
}
