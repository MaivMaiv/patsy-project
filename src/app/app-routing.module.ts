import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'inventory',
    loadChildren: () => import('./pages/inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'receipt',
    loadChildren: () => import('./pages/receipt/receipt.module').then( m => m.ReceiptPageModule)
  },
  {
    path: 'points',
    loadChildren: () => import('./pages/points/points.module').then( m => m.PointsPageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./pages/report/report.module').then( m => m.ReportPageModule)
  },
  {
    path: 'qr-profile',
    loadChildren: () => import('./pages/qr-profile/qr-profile.module').then( m => m.QrProfilePageModule)
  },
  {
    path: 'points-profile',
    loadChildren: () => import('./pages/points-profile/points-profile.module').then( m => m.PointsProfilePageModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/employee/employee.module').then( m => m.EmployeePageModule)
  },
  {
    path: 'employee-profile',
    loadChildren: () => import('./pages/employee-profile/employee-profile.module').then( m => m.EmployeeProfilePageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'employee-report',
    loadChildren: () => import('./pages/employee-report/employee-report.module').then( m => m.EmployeeReportPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
