import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointsProfilePage } from './points-profile.page';
const routes: Routes = [
  {
    path: '',
    component: PointsProfilePage,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsProfilePageRoutingModule {}
