import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/layouts/auth-layout/auth.service';
import {
  DropzoneComponent, DropzoneDirective,
  DropzoneConfigInterface
} from 'ngx-dropzone-wrapper';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { first } from 'rxjs/operators';
import * as XLSX from 'ts-xlsx';
import { FormService } from '../services/forms.service';
import { Customer } from './customer';
import Swal from "sweetalert2";
import { LazyLoadService } from 'ngx-owl-carousel-o/lib/services/lazyload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-agent',
  templateUrl: './account-agent.component.html',
  styleUrls: ['./account-agent.component.scss']
})
export class AccountAgentComponent implements OnInit {
  public type: string = 'component';
  arrayBuffer: any;
  public disabled: boolean = false;
  public files: NgxFileDropEntry[] = [];
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };


  filelist: any[];
  companies: any;
  selectedcompany: string = "Seleccione Empresa";
  datasource: any[]=[];

  customers: Customer[] = [];

  totalRecords: number=0;

  cols: any[];

  loading: boolean;
  listEmpresas: any;
  selectedBussines: any;
  id_empresa: any;
  dataperson: any;
  listPlanAgente: any;
  listPlanAgente2: any;
  datasource2: any;
  constructor(private authService: AuthService,
    private formService: FormService,
    private primengConfig: PrimeNGConfig,
    private router:Router,
  ) {

    this.selectedBussines='Seleccione la Empresa'
   }

  ngOnInit() {
    this.companies = this.authService.isCompany();
    this.companies = this.authService.isCompany();
    this.companies = JSON.parse(localStorage.getItem('company')).id_compania;
    this.dataperson = JSON.parse(localStorage.getItem('currentUserData')).detailUsers[0];
    console.log('esta es la compañia:::', this.companies)
    this.listarEmpresas(this.companies);
    this.getPlanbyAgent(this.companies,this.dataperson.id_agente);
  }

  getPlanbyAgent(id_compania,id_agente){
    this.formService.getPlanbyAgent(id_compania,id_agente).then(data => {
      console.log('Esta esel agenteeee plannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn   ', data)
      this.listPlanAgente=data.data;
      this.datasource = data.data;
    });      

  }
 
  listarEmpresas(id_compania) {
    this.formService.selectbusiness(id_compania)
      .pipe(first())
      .subscribe(
        data => {
          console.log('esta es la dataaaaaa:   ', data.data)
          this.listEmpresas = data.data;
        },
        error => {
          console.log(error);

          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: error,
            timer: 4000
            //footer: '<a href>Why do I have this issue?</a>'
          });
        });
  }
  evento(e){
    console.log('INGRESA AL EVENTO:    ',e)
    this.selectedBussines=e.nombre_comercial;
    this.id_empresa=e.id_empresa;
    

    
  }

  loadPlanAgente(event: LazyLoadEvent) {

    console.log('aquiiiiiiiiiiiiiiii lazyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',event)
    this.loading = true;

   
    setTimeout(() => {
      if (this.datasource) {
        console.log('esta es el datasourceeeee', this.datasource)
        this.listPlanAgente = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }


  loadPlanAgente2(event: LazyLoadEvent) {

    console.log('aquiiiiiiiiiiiiiiii lazyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',event)
    this.loading = true;

   
    setTimeout(() => {
      if (this.datasource2) {
        console.log('esta es el datasourceeeee', this.datasource2)
        this.listPlanAgente2 = this.datasource2.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
  
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          let fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
          fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            this.filelist = [];
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, { type: "binary" });
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
            var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
            this.filelist = arraylist;
            console.log('ESTE ES EL ARRAY ', JSON.stringify(this.filelist))

          }


          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }


  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';
  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = (this.config.maxFiles === 1) ? 100 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;
  }


  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }
  goDetail(data){
/*     console.log('este es el dato: ',customer)
    this.router.navigate(['/default/forms/account-detail/'+this.id_empresa+'/'+customer.id_cuenta+'/'+customer.id_persona]) */

    console.log('este es el dato: ',this.companies,this.dataperson.id_agente,data.id_planificacion)
    this.formService.getAccountListAgent(this.companies,this.dataperson.id_agente,data.id_planificacion).then(data => {
      console.log('LISTA DE CUENTAS DE LA PLA', data)
      this.listPlanAgente2=data.data;
      this.datasource2 = data.data;
    });  
    
  }
  goDetail2(customer){
         console.log('este es el dato: ',customer)
        this.router.navigate(['/default/forms/account-detail/'+customer.id_empresa+'/'+customer.id_cuenta+'/'+customer.id_persona+'/ADM']) 
    
  }
}
