import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.page.html',
  styleUrls: ['./employee-report.page.scss'],
})
export class EmployeeReportPage implements OnInit {
  rows = [
    { Barista: 'Austin', in: 'Male', out: 'Swimlane' },
    { Barista: 'Dany', in: 'Male', out: 'KFC' },
    { Barista: 'Molly', in: 'Female', out: 'Burger King' },
  ];

  columns = [
    { prop: 'Barista' },
    { name: 'in' },
    { name: 'out' }
  ];
  constructor() { }

  ngOnInit() {
  }

}
