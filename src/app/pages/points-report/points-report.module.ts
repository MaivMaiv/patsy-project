import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsReportPageRoutingModule } from './points-report-routing.module';

import { PointsReportPage } from './points-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsReportPageRoutingModule
  ],
  declarations: [PointsReportPage]
})
export class PointsReportPageModule {}
