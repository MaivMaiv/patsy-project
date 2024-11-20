import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BaristaReportPageRoutingModule } from './barista-report-routing.module';

import { BaristaReportPage } from './barista-report.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BaristaReportPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [BaristaReportPage]
})
export class BaristaReportPageModule {}
