import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceiptPage } from './receipt.page';
const routes: Routes = [
  {
    path: '',
    component: ReceiptPage,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptPageRoutingModule {}
