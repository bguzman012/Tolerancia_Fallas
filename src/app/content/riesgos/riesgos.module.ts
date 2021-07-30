import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '@gaxon/modules';
import { RouterModule, Routes } from '@angular/router';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';


import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";


/**
 * 
 * Mat modules
 */
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from "@mat-datetimepicker/core";
import { MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
// import { FuseSharedModule } from 'src/@fuse/shared.module';
//mport { FuseConfirmDialogModule, FuseMaterialColorPickerModule } from 'src/@fuse/components';
//import { BoardResolve, ScrumboardService } from 'src/app/main/apps/scrumboard/scrumboard.service';
//import { ScrumboardComponent } from 'src/app/main/apps/scrumboard/scrumboard.component';
//import { ScrumboardBoardComponent } from 'src/app/main/apps/scrumboard/board/board.component';

/**
 * 
import { ScrumboardBoardListComponent } from 'src/app/main/apps/scrumboard/board/list/list.component';
import { ScrumboardBoardCardComponent } from 'src/app/main/apps/scrumboard/board/list/card/card.component';
import { ScrumboardBoardEditListNameComponent } from 'src/app/main/apps/scrumboard/board/list/edit-list-name/edit-list-name.component';
import { ScrumboardBoardAddCardComponent } from 'src/app/main/apps/scrumboard/board/list/add-card/add-card.component';
import { ScrumboardBoardAddListComponent } from 'src/app/main/apps/scrumboard/board/add-list/add-list.component';
import { ScrumboardCardDialogComponent } from 'src/app/main/apps/scrumboard/board/dialogs/card/card.component';
import { ScrumboardLabelSelectorComponent } from 'src/app/main/apps/scrumboard/board/dialogs/card/label-selector/label-selector.component';
import { ScrumboardEditBoardNameComponent } from 'src/app/main/apps/scrumboard/board/edit-board-name/edit-board-name.component';
import { ScrumboardBoardSettingsSidenavComponent } from 'src/app/main/apps/scrumboard/board/sidenavs/settings/settings.component';
import { ScrumboardBoardColorSelectorComponent } from 'src/app/main/apps/scrumboard/board/sidenavs/settings/board-color-selector/board-color-selector.component';
import { AddRisksComponent } from './Risks/add-risks/add-risks.component';
import { AnaRisksComponent } from './Risks/ana-risks/ana-risks.component';
import { TraRisksComponent } from './Risks/tra-risks/tra-risks.component';
import { ListRiskIngComponent } from './Risks/list-risk-ing/listRiskIng.component';
import { SegRisksComponent } from './Risks/seg-risks/seg-risks.component';
 
 */
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { RiskService } from '../riesgos/services-riesgos/risk.service';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
//import { EditRiskComponent } from './Risks/edit-risk/edit-risk.component';
//import { ListRiskAnaComponent } from './Risks/list-risk-ana/listRiskAna.component';
//import { ListRiskTraComponent } from './Risks/list-risk-tra/listRiskTra.component';
import { MatPaginatorModule } from '@angular/material/paginator';
//import { DiaRisksComponent } from './Risks/dia-risk/dia-risks.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
//import { ComRisksComponent } from './Risks/com-risk/com-risks.component';

/**
 * 
import { AddComplaintComponent } from './Complaints/add-complaint/add-complaint.component';
import { AddresponsableComponent } from './Complaints/add-responsable/add-responsable.component';
import { ListcomplaintsComponent } from './Complaints/List-Complains/listcomplaints.component';
import { Listcomplaints2Component } from './Complaints/List-Complains-2/listcomplaints2.component';
import { AnaComplainComponent } from './Complaints/Acciones/ana-complain.component';
import { CommonModule, DatePipe } from '@angular/common';
 
import { Listcomplaints3Component } from './Complaints/List-Complains-3/listcomplaints3.component';
import { EditComplainComponent } from './Complaints/Edit-Acciones/edit-complain.component';
import { Listcomplaints4Component } from './Complaints/List-Complains-4/listcomplaints4.component';
import { AprComplaintComponent } from './Complaints/apr-complaint/apr-complaint.component';
 
import { DiaComplainComponent } from './Complaints/dia-complain/dia-complain.component';
 
import { Listcomplaints5Component } from './Complaints/List-Complains-5/listcomplaints5.component';
 
 */
import { MatExpansionModule } from '@angular/material/expansion';
import { QryRiskListComponent } from './qry-risk-list/qry-risk-list.component';

//import { ReporteComponent } from './Risks/reportes/reporte.component';
import { MatBadgeModule } from '@angular/material/badge';
//import { CreateActivityComponent } from './databalance/create-activity/create-activity.component';
//import { DataBalanceService } from './databalance/Services/dataBalance.service';


//import { CurrencyMaskModule } from "ng2-currency-mask";
//import { ListActivityPenComponent } from './databalance/list-activity-pen/list-activity-pen.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NgApexchartsModule } from 'ng-apexcharts';
//import { FillActComponent } from './databalance/fill-act/fill-act.component';
import { ChartsModule } from 'ng2-charts';
//import { MaterialFileUploadComponent } from './databalance/material-file-upload/material-file-upload.component';
//import { DiaAnaComponent } from './Risks/dia-ana/dia-ana.component';

/**
import { ListDeterminaCausasComponent } from './databalance/list-determina-causas/list-determina-causas.component';
import { AprActComponent } from './databalance/apr-act/apr-act.component';
import { ListPorAprobar } from './databalance/list-por-aprobar/list-por-aprobar.component';
import { ListActivityComponent } from './databalance/list-activity/list-activity.component';
import { AddCausasComponent } from './databalance/causas/add-causas.component';
import { ListAprCausasComponent } from './databalance/list-apr-causas/list-apr-causas.component';
import { DiaAprCausasComponent } from './databalance/dia-apr-causas/dia-apr-causas.component';
import { ListAprobadasCaComponent } from './databalance/list-aprobadas-ca/list-aprobadas-ca.component';
import { TablesComponent } from './databalance/tables/tables.component';
 
import { DiaAprReqComponent } from './databalance/dia-apr-req/dia-apr-req.component';
import { ListAceptadasReqComponent } from './databalance/list-aceptadas-req/list-aceptadas-req.component';
import { DiaAprRepAceComponent } from './databalance/dia-apr-rep-ace/dia-apr-rep-ace.component';
import { DiaAgrEntComponent } from './databalance/dia-agr-ent/dia-agr-ent.component';
import { ListAprReqEarComponent } from './databalance/list-apr-req-ear/list-apr-req-ear.component';
import { DiaAprReqEarComponent } from './databalance/dia-apr-req-ear/dia-apr-req-ear.component';
import { DiaAprRecReqComponent } from './databalance/dia-apr-rec-req/dia-apr-rec-req.component';
import { EditproductoComponent } from './Risks/editproducto/editproducto.component';
import { QueryActComponent } from './databalance/query-act/query-act.component';
import { RptConMenComponent } from './databalance/rpt-con-men/rpt-con-men.component';
import { ReportesDbComponent } from './databalance/reportes-db/reportes-db.component';
import { RptPorActComponent } from './databalance/rpt-por-act/rpt-por-act.component';
import { RptDePreComponent } from './databalance/rpt-de-pre/rpt-de-pre.component';
import { CfgCierreMesComponent } from './databalance/cfg-cierre-mes/cfg-cierre-mes.component';
import { QryRiskListComponent } from './Risks/qry-risk-list/qry-risk-list.component';
import { ChargeDocComponent } from './Risks/chargedoc/chargedoc.component';
import { DiaRisks2Component } from './Risks/dia-risk 2/dia-risks2.component';
import { CreateRequestComponent } from './Request/create-request/create-request.component';
import { ListDetCauAccComponent } from './Request/list-det-cau-acc/list-det-cau-acc.component';
import { AddCauAccReqComponent } from './Request/add-cau-acc-req/add-cau-acc-req.component';
import { ListAprCyaReqComponent } from './Request/list-apr-cya-req/list-apr-cya-req.component';
import { DiaAprCyaReqComponent } from './Request/dia-apr-cya-req/dia-apr-cya-req.component';
import { ListDetRioReqComponent } from './Request/list-det-rio-req/list-det-rio-req.component';
import { EditRequestComponent } from './Request/edit-request/edit-request.component';
import { ListAprCluReqComponent } from './Request/list-apr-clu-req/list-apr-clu-req.component';
import { ListRepCluReqComponent } from './Request/list-rep-clu-req/list-rep-clu-req.component';
import { DiaAprCluReqComponent } from './Request/dia-apr-clu-req/dia-apr-clu-req.component';
import { AddAccReqComponent } from './Request/add-acc-req/add-acc-req.component';
import { GraphicsComponent } from './databalance/graphics/graphics.component';
import { GraphicsdetailmesComponent } from './databalance/graphicsdetailmes/graphicsdetailmes.component';
import { RptCauAccComponent } from './databalance/rpt-cau-acc/rpt-cau-acc.component';
import { RptCumProComponent } from './databalance/rpt-cum-pro/rpt-cum-pro.component';
 */
import { TabMenuModule } from 'primeng/tabmenu';
/** 
//CONTRATOS
import { ListContractsComponent } from './Juridico/Contracts/list-contracts/list-contracts.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import {TooltipModule} from 'primeng/tooltip';
import {PanelModule} from 'primeng/panel';
import {FileUploadModule} from 'primeng/fileupload';
import {CalendarModule} from 'primeng/calendar';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {DividerModule} from 'primeng/divider';
import { GlpiService } from './databalance/Services/glpi.service';
import { GlpiReporteComponentComponent } from './glpi/glpi-reporte-component/glpi-reporte-component.component';
import { RptCauAccReqComponent } from './databalance/rpt-cau-acc-req/rpt-cau-acc-req.component';
import {GraphicsContractsComponent} from './Juridico/Contracts/graphics/graphics.component';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import {BlockUIModule} from 'primeng/blockui';
import { ListFiniquitosComponent } from './Juridico/Finiquito/list-finiquitos/list-finiquitos.component';
import { ListAdendumsComponent } from './Juridico/Adendums/list-adendums/list-adendums.component';
import { ListConveniosComponent } from './Juridico/Convenios/list-convenios/list-convenios.component';
import { CreateDocComponent } from './GestionDocumental/front/create-doc/create-doc.component';
import { SearchDocComponent } from './GestionDocumental/front/search-doc/search-doc.component';
 
import {TieredMenuModule} from 'primeng/tieredmenu';
import {PanelMenuModule} from 'primeng/panelmenu';

import { SettingsComponent } from './GestionDocumental/front/settings/settings.component';
import { SettingsModule } from './GestionDocumental/front/settings/settings.module';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {NgxCSVtoJSONModule} from 'ngx-csvto-json';
//SISTEMA DOCUMENTAL
import {ChipsModule} from 'primeng/chips';
import { ReportsReqComponent } from './Request/reports-req/reports-req.component';
import { BackrequestComponent } from './Request/backrequest/backrequest.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { InlineSVGModule } from 'ng-inline-svg';
import {BadgeModule} from 'primeng/badge';
*/


import { NgxFileDropModule } from 'ngx-file-drop';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AmChartsModule } from '@amcharts/amcharts3-angular';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { PickListModule } from 'primeng/picklist';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProcesoComponent } from './proceso/proceso.component';
import { ProcesoDialogComponent } from './proceso-dialog/proceso-dialog.component';
import { SubprocesoDialogComponent } from './subproceso-dialog/subproceso-dialog.component';
import { SubprocesoComponent } from './subproceso/subproceso.component';
import { RiesgosServices } from './services-riesgos/riesgos-services';
import { ImpactosServices } from './services-riesgos/riesgos-impactos-services'
import { ImpactoEconomicoComponent } from './impacto-economico/impacto-economico.component';
import { ImpactoEconomicoDialogComponent } from './impacto-economico-dialog/impacto-economico-dialog.component';
import { AnalisisImpactoComponent } from './analisis-impacto/analisis-impacto.component';
import { NewBoardComponent } from './new-board/new-board.component';
//import  { ProductsComponent } from './products/products.component';
//import { FactService } from './services/fact.service';
//import { ClientsComponent } from './clients/clients.component';
//import { ServicesUsers } from './services/service-usuarios.service';
//import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';
//import { FactService } from './services/fact.service';
//import { ProductmantainerComponent } from './productmantainer/productmantainer.component';
//import { PointsComponent } from './puntosEmision/points.component';
//import { PointsmantainerComponent } from './puntosEmisionMantainer/pointsmantainer.component';
//import { PointService } from './services/points.service';
//import { InvoiceComponent } from './invoice/invoice.component';
import { ListRiskTraComponent } from './list-risk-tra/listRiskTra.component';
import { TraRisksComponent } from './tra-risks/tra-risks.component';
import { ListRiskAnaComponent } from './list-risk-ana/listRiskAna.component';
import { DiaAnaComponent } from './dia-ana/dia-ana.component';
import { AnaRisksComponent } from './ana-risks/ana-risks.component';
import { DiaRisksComponent } from './dia-risk/dia-risks.component';
import { SegRisksComponent } from './seg-risks/seg-risks.component';
import { ComRisksComponent } from './com-risk/com-risks.component';
import { ReporteComponent } from './reportes/reporte.component';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'http://demo.g-axon.com/dropzone/upload.php',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
};

const routes: Routes = [


    {
        path: 'procesos',
        component: ProcesoComponent
    },
    {
        path: 'subprocesos',
        component: SubprocesoComponent
    },
    {
        path: 'impactos',
        component: ImpactoEconomicoComponent
    },
    {
        path: 'analisis-impacto',
        component: AnalisisImpactoComponent
    },
    {
        path: 'risk-add',
        component: NewBoardComponent
    },
    {
        path: 'list-tra',
        component: ListRiskTraComponent
    },
    {
        path: "tratamiento",
        component: TraRisksComponent
    },
    {
        path: 'list-ana',
        component: ListRiskAnaComponent
    },
    {
        path: "dialog-ana",
        component: DiaAnaComponent
    },
    {
        path: "ana-risk",
        component: AnaRisksComponent
    }, {
        path: "seguimiento",
        component: SegRisksComponent
    }
    ,
    {
        path: "com-risks",
        component: ComRisksComponent
    },
    {
        path: "dia-risks",
        component: DiaRisksComponent
    },
    {
        path: "tratamiento",
        component: TraRisksComponent
    }, 
    {
        path: 'search',
        component: QryRiskListComponent
    },
    {
        path: 'reportes-risks',
        component: ReporteComponent

    }
];

@NgModule({
    imports: [

        CommonModule,
        SharedModule,
        ChartsModule,
        MatButtonToggleModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatStepperModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        


        MatNativeDateModule, MatMomentDateModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatBadgeModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTooltipModule,
        MatSelectModule,
        MatRadioModule,
        MatTableModule,
        CurrencyMaskModule,
        MatTabsModule,
        ToastModule,
        TableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        TabMenuModule,
        AutoCompleteModule,
        DropzoneModule,
        UiSwitchModule,
        NgxFileDropModule,
        TableModule,
        CalendarModule,
        SliderModule,
        DialogModule,
        MultiSelectModule,
        ContextMenuModule,
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
        RiesgosServices,
        RiskService,
        ImpactosServices,
        //ServicesUsers,
        //FactService,
        //PointService,
        DatePipe,
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG
        }
    ],
    declarations: [
        ProcesoComponent,
        ProcesoDialogComponent,
        SubprocesoDialogComponent,
        SubprocesoComponent,
        ImpactoEconomicoComponent,
        ImpactoEconomicoDialogComponent,
        AnalisisImpactoComponent,
        ListRiskTraComponent,
        TraRisksComponent,
        ListRiskAnaComponent,
        DiaAnaComponent,
        AnaRisksComponent,
        ComRisksComponent,
        QryRiskListComponent,
        ReporteComponent,
        DiaRisksComponent,
        SegRisksComponent,
        NewBoardComponent]
})
export class RiesgosModule {
}
