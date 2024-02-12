import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReceiptPageRoutingModule } from './receipt-routing.module';
import { ReceiptPage } from './receipt.page';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReceiptPageRoutingModule],
  declarations: [ReceiptPage],
})
export class ReceiptPageModule {}
