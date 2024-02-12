import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QRCodeModule } from 'angularx-qrcode';
import { EmployeeProfilePageRoutingModule } from './employee-profile-routing.module';

import { EmployeeProfilePage } from './employee-profile.page';

@NgModule({
  imports: [
    QRCodeModule,  
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeProfilePageRoutingModule
  ],
  declarations: [EmployeeProfilePage]
})
export class EmployeeProfilePageModule {}
