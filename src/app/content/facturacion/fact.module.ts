import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {SharedModule} from '@gaxon/modules';
import {RouterModule, Routes} from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { NgxFileDropModule } from 'ngx-file-drop';
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
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import {PickListModule} from 'primeng/picklist';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
//import { FactService } from './services/fact.service';
import { ClientsComponent } from './clients/clients.component';
import { ServicesUsers } from './services/service-usuarios.service';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
import { FactService } from './services/fact.service';
import { ProductmantainerComponent } from './productmantainer/productmantainer.component';
import { PointsComponent } from './puntosEmision/points.component';
import { PointsmantainerComponent } from './puntosEmisionMantainer/pointsmantainer.component';
import { PointService } from './services/points.service';
import { InvoiceComponent } from './invoice/invoice.component';



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://demo.g-axon.com/dropzone/upload.php',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

const routes: Routes = [
  
  {
    path: 'clients',
    component: ClientsComponent
  },  
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'points-emition',
    component: PointsComponent
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
    ServicesUsers,
    FactService,
    PointService,
    DatePipe,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  declarations: [
    ClientsComponent,
    ProductsComponent,
    ClienteDialogComponent,
    ProductsComponent,
    ProductmantainerComponent,
    PointsComponent,
    PointsmantainerComponent,
    InvoiceComponent
    

  ]
})
export class FactModule {
}
