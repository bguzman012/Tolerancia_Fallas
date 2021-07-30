import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuard } from './layouts/auth-layout/auth.guard';
//MAO EDITADO
const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/signin'
  },
  {
    path: '',
    loadChildren: () => import('./layouts/auth-layout/auth.module').then(m => m.AuthModule)
  },
  
  {
    path: 'default',
    loadChildren: () => import('./layouts/default-layout/default-layout.module').then(m => m.DefaultLayoutModule),
    canActivate: [AuthGuard]
  }/* ,
  {
    path: 'crm',
    loadChildren: () => import('./layouts/crm-layout/crm-layout.module').then(m => m.CrmLayoutModule)
  },
  {
    path: 'back-office',
    loadChildren: () => import('./layouts/back-office-layout/back-office-layout.module').then(m => m.BackOfficeLayoutModule)
  },
  {
    path: 'back-office-mini',
    loadChildren: () => import('./layouts/back-office-mini-layout/back-office-mini-layout.module').then(m => m.BackOfficeMiniLayoutModule)
  },
  {
    path: 'modern',
    loadChildren: () => import('./layouts/modern-layout/modern-layout.module').then(m => m.ModernLayoutModule)
  },
  {
    path: 'intranet',
    loadChildren: () => import('./layouts/intranet-layout/intranet-layout.module').then(m => m.IntranetLayoutModule)
  },
  {
    path: 'listing',
    loadChildren: () => import('./layouts/listing-layout/listing-layout.module').then(m => m.ListingLayoutModule)
  },
  {
    path: 'saas',
    loadChildren: () => import('./layouts/saas-layout/saas-layout.module').then(m => m.SaasLayoutModule)
  },
  {
    path: '**',
    redirectTo: '/default/main/dashboards/listing'
  } */
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
