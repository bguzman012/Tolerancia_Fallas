import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '@app/layouts/auth-layout/auth.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
  import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { first } from 'rxjs/operators';
  import * as XLSX from 'ts-xlsx';
import { FormService } from '../services/forms.service';
import Swal from "sweetalert2";
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'] 
})
export class FileUploadComponent implements OnInit {
  public type: string = 'component';
  arrayBuffer:any;
  selectedBussines:string;
  disableSave:boolean=true;
  disableFile:boolean=true;
  currentDate: Date ;
  currentDate0: Date = new Date();
  loadForm: FormGroup;

  public disabled: boolean = false;
  public files: NgxFileDropEntry[] = [];
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  @ViewChild(DropzoneComponent) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective) directiveRef?: DropzoneDirective;
  filelist: any[];
  companies: any;
  selectedcompany:string="Seleccione Empresa"
  listEmpresas: any;
  totalRecords: any;
  primengConfig: any;
  id_empresa: any;
  nregistros: number;
  filename: string;
  loading:boolean=false;
  newf: string;
  constructor(private authService:AuthService,private formService:FormService) { 
    this.selectedBussines='Seleccione una empresa';
  }

  ngOnInit() {
    (function () {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }

            form.classList.add('was-validated')
          }, false)
        })
    })()
    this.currentDate=new Date(this.currentDate0.getDate()-15)
    this.loading=false;
    this.companies=this.authService.isCompany();
     this.companies=JSON.parse(localStorage.getItem('company')).id_compania;
    console.log('esta es la compañia:::',this.companies)
    this.listarEmpresas(this.companies);
    this.loadForm = new FormGroup({
      fechaCorte: new FormControl(null, Validators.required)
    })
  }
listarEmpresas(id_compania){
  this.formService.selectbusiness(id_compania)
            .pipe(first())
            .subscribe(
                data => {
                   console.log('esta es la dataaaaaa:   ',data.data)
                   this.listEmpresas=data.data;
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
    this.disableFile=false;
  
    
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    console.log('este es el nombre del archivo::::::::::::::::',files)
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
             this.filename=droppedFile.relativePath;
          let fileReader = new FileReader();    
          fileReader.readAsArrayBuffer(file);     
          fileReader.onload = (e) => {    
              this.arrayBuffer = fileReader.result;    
              var data = new Uint8Array(this.arrayBuffer);    
              var arr = new Array();    
              this.filelist = [];  
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
              var bstr = arr.join("");    
              var workbook = XLSX.read(bstr, {type:"binary"});    
              var first_sheet_name = workbook.SheetNames[0];    
              var worksheet = workbook.Sheets[first_sheet_name];    
              console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
                var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
                     this.filelist=arraylist;
                     this.disableSave=false;
                     this.nregistros=this.filelist.length;
                     console.log('ESTE ES EL ARRAY ',JSON.stringify(this.nregistros)) 

                     console.log('ESTE ES EL ARRAY ',JSON.stringify(this.filelist)) 

            
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

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
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

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  public onUploadSuccess(args: any): void {
    console.log('onUploadSuccess:', args);
  }


  save(){
    this.loading=true;
    console.log('entra en el save')

    if(this.loadForm.valid) {

    
        var data={
      id_empresa:this.id_empresa,
      id_compania:this.companies,
      nombre_archivo:this.filename,
      size:this.nregistros,
      data:this.filelist,
      fecha_corte:this.formatFecha(new Date(this.loadForm.get('fechaCorte').value))
    }

    console.log('estos son los datos a guardaaaaar::: ',data)
    this.formService.saveMasterFile(data).subscribe(resp => {
      this.notificar('Correcto','El archivo se ha subido correctamente');
      this.loading=false;
      this.disableFile=true;
      this.disableSave=true;

       },err =>{
        this.loading=false;
        this.notificar('Error','Hay un problema con el archivo '+err);

       });
      }else{
        this.notificar('Oops!','Verificar la fecha de corte')
        this.loading=false;
      }


  }

  notificar(title,message){
    Swal.fire({
      title: title,
      text: message ,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
        zippi.play();
      }
    });
     }
formatFecha(fecha){
  var d=fecha
  var dt = d.getDate() + 1;
  var mn = d.getMonth();
  mn++;
  var yy = d.getFullYear();
 return  this.newf = dt + "/" + mn + "/" + yy

}
 }
