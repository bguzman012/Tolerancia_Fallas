import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgProgressModule} from 'ngx-progressbar';
import {SigninComponent} from './signin/signin.component';
import {AuthComponent} from './auth.component';
import {SharedModule} from '@gaxon/modules';
import {RouterModule} from '@angular/router';

import {PagesRoutingModule} from './pages-routing.module';
import {SignupComponent} from './signup/signup.component';
import {HeaderComponent} from './header/header.component';
import { SelCompanyComponent } from './companyselect/selcompany.component';
import { ChangePaComponent } from './changepassfirst/changepa.component';
import { FormService } from '@app/content/forms/services/forms.service';
import { ForgotComponent } from './forgot/forgot.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgProgressModule,
    RouterModule,
    PagesRoutingModule,
  ],
  declarations: [
    SigninComponent,
    AuthComponent,
    SignupComponent,
    HeaderComponent,
    SelCompanyComponent,
    ChangePaComponent,
    ForgotComponent
  ],
  providers:[FormService],
  exports: [
    AuthComponent
  ]
})
export class AuthModule {
}
