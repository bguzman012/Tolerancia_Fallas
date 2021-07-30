import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth.component';
import { AuthGuard } from './auth.guard';
import { ChangePaComponent } from './changepassfirst/changepa.component';
import { SelCompanyComponent } from './companyselect/selcompany.component';
import { ForgotComponent } from './forgot/forgot.component';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'select',
        component: SelCompanyComponent,
        canActivate:[AuthGuard],
      }
      ,
      {
        path: 'change',
        component: ChangePaComponent,
        canActivate:[AuthGuard],
      }
      ,
      {
        path: 'forgot',
        component: ForgotComponent,
       
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
