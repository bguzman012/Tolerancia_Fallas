import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '@gaxon/modules';
import {RouterModule, Routes} from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import {BasicFormComponent} from './basic-form/basic-form.component';
import {AdvancedFormComponent} from './advanced-form/advanced-form.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AccountListComponent } from './account-list/account-list.component';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { FormService } from './services/forms.service';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { NewManagementComponent } from './new-management/new-management.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { DetailManagementComponent } from './detailManagement/detail-management.component';
import { NewAgentComponent } from './new-agent/new-agent.component';
import {PickListModule} from 'primeng/picklist';
import { GeneratePLaningComponent } from './generate-planing/generate-planing.component';
import { AccountAgentComponent } from './account-agent/account-agent.component';
import { AccountListAgentComponent } from './account-list-agent/account-list-agent.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { IpServiceService } from './services/ip-service.service';

import {  reportGestionComponent } from './reports/reportgestion.component';


import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { reportGestionGerComponent } from './reportsGer/reportgestionger.component';



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://demo.g-axon.com/dropzone/upload.php',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

const routes: Routes = [
  {
    path: 'basic-form',
    component: BasicFormComponent
  },
  {
    path: 'advanced-form',
    component: AdvancedFormComponent
  },
  {
    path: 'file-upload',
    component: FileUploadComponent
  },
  {
    path: 'account-list/:id_empresa',
    component: AccountListComponent
  }
  ,
  {
    path: 'account-detail/:id_empresa/:id_cuenta/:id_persona/:fuente',
    component: AccountDetailComponent
  }
  ,
  {
    path: 'new-agent',
    component: NewAgentComponent
  },
  {
    path: 'generate-planing',
    component: GeneratePLaningComponent
  }

  ,
  {
    path: 'account-agent',
    component: AccountAgentComponent
  }

  ,
  {
    path: 'acount-list-agent',
    component: AccountListAgentComponent
  }

  ,
  {
    path: 'home',
    component:   HomeComponent

  }

  ,
  {
    path: 'change-pass',
    component:   ChangePasswordComponent

  }
  ,
  {
    path: 'report-gestion',
    component:   reportGestionComponent

  }
  ,
  {
    path: 'report-gestionger',
    component:   reportGestionGerComponent

  }



  


  
  
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DropzoneModule,
    UiSwitchModule,
    NgxFileDropModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    AutoCompleteModule,
    InputTextModule,
    CurrencyMaskModule,
    //BrowserModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoRhzeZ8fUYQSf4CX0PBw-6Jdp4Q56vA0',
      libraries: ['places']
    }),
    AgmSnazzyInfoWindowModule,
    AmChartsModule,
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    PickListModule
  ],  
  providers: [
    FormService,
    DatePipe,
    IpServiceService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  declarations: [
    BasicFormComponent,
    AdvancedFormComponent,
    FileUploadComponent,
    AccountListComponent,
    AccountDetailComponent,
    NewManagementComponent,
    NewAgentComponent,
    DetailManagementComponent,
    GeneratePLaningComponent,
    AccountAgentComponent,
    AccountListAgentComponent,
    HomeComponent,
    ChangePasswordComponent,
    reportGestionComponent,
    reportGestionGerComponent
    





  ]
})
export class FormsModule {
}
