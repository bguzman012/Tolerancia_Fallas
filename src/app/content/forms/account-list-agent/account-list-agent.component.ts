import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-account-list-agent',
  templateUrl: './account-list-agent.component.html',
  styleUrls: ['./account-list-agent.component.scss']
})
export class AccountListAgentComponent implements OnInit {
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
  filter = new FormControl('');
  page = 1;
  pageSize = 10;
  collectionSize = 1;
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
    console.log('esta es la compa??ia:::', this.companies)
    //this.listarEmpresas(this.companies);
    this.dataperson = JSON.parse(localStorage.getItem('currentUserData')).detailUsers[0];
    this.loadTable(this.dataperson.id_empresa);
    this.id_empresa=this.dataperson.id_empresa;
  }
  paginator(e){
    console.log('entra en el evento de paginator',e)
    this.loadpagination(this.id_empresa,e,this.pageSize,'')
  }
  loadTable(id_empresa){
    this.formService.loadAllAccounts(id_empresa,0,10,'').then(data => {
      console.log('ESTA ES LA DATAAAA', data.data)
      this.datasource = data.data;
      this.totalRecords = data.length;
      this.customers=data.data
      
      this.collectionSize=data.totalElements
      ;
      
    });

  }
  
  loadTable2(e)
  {
    console.log('este es el tama??o de l apaginaaaaaaaaaaaaaaaaaaaaaaa',e)
    this.formService.loadAllAccounts(this.id_empresa,0,this.pageSize,'').then(data => {
      console.log('ESTA ES LA DATAAAA', data)
      this.customers=data.data
      
      this.collectionSize=data.totalElements
     /*  this.primengConfig.ripple = true;
      console.log('esta es el datasourceeeee', this.datasource)
      this.customers = this.datasource
      this.loading = false; */
      ;
      
    });

  }

  loadpagination(a,b,c,d){
console.log('esta es la ddddddddddddddddddd',d)
    
    console.log('ESTA ES LA DATAAAA', a,b,c,d)

    this.formService.loadAllAccounts(a,b-1,c,d).then(data => {
      console.log('ESTA ES LA DATAAAA', data.data)
      
      this.customers=data.data
      this.collectionSize=data.totalElements
      ;
      
    });
  
  }

  loadsearch(e){
    console.log('ESTA ES LA DATAAAA', e)
    this.formService.loadAllAccounts(this.id_empresa,0,this.pageSize,e).then(data => {
      console.log('ESTA ES LA DATAAAA', data.data)
      
      this.customers=data.data
      this.collectionSize=data.totalElements
      //this.pageSize=this.customers.length
      ;
      
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
    this.loadTable(this.id_empresa);

    
  }

  loadCustomers(event: LazyLoadEvent) {

    console.log('aquiiiiiiiiiiiiiiii lazyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',event)
    this.loading = true;

   
    setTimeout(() => {
      if (this.datasource) {
        console.log('esta es el datasourceeeee', this.datasource)
        this.customers = this.datasource.slice(event.first, (event.first + event.rows));
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
  goDetail(customer){
    console.log('este es el dato: ',customer)
    this.router.navigate(['/default/forms/account-detail/'+this.id_empresa+'/'+customer.id_cuenta+'/'+customer.id_persona+'/COB'])
  }
}
