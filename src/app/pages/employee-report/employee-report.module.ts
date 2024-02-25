import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeReportPageRoutingModule } from './employee-report-routing.module';

import { EmployeeReportPage } from './employee-report.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeReportPageRoutingModule,
    NgxDatatableModule,
   
  ],
  declarations: [EmployeeReportPage]
})
export class EmployeeReportPageModule {}
