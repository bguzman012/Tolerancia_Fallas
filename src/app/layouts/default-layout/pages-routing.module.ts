import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormService } from '@app/content/forms/services/forms.service';
import {DefaultLayoutComponent} from './default-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@app/content/forms/forms.module').then(m => m.FormsModule),
      },
   
    
      {
        path: 'forms',
        loadChildren: () => import('@app/content/forms/forms.module').then(m => m.FormsModule),
      },

      {
        path: 'fact',
        loadChildren: () => import('@app/content/facturacion/fact.module').then(m => m.FactModule),
      },
      {
        path: 'riesgos',
        loadChildren: () => import('@app/content/riesgos/riesgos.module').then(m => m.RiesgosModule),
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
