import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesReportPageRoutingModule } from './sales-report-routing.module';

import { SalesReportPage } from './sales-report.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesReportPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [SalesReportPage]
})
export class SalesReportPageModule {}
