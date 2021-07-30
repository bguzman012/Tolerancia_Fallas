import { Component, OnInit, PipeTransform, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportgestion',
  templateUrl: './reportgestion.component.html',
  styleUrls: ['./reportgestion.component.scss']
})
export class reportGestionComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize = 1;
  public type: string = 'component';
  gestionForm: FormGroup;
 

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

  option:any='EXCEL';
  filelist: any[];
  dateIC: Date;
  dateFC: Date;
  companies: any;
  selectedcompany: string = "Seleccione Empresa";
  datasource: any[] = [];

  customers: Customer[] = [];

  totalRecords: number = 0;

  cols: any[];
  filter = new FormControl('');

  loading: boolean;
  listEmpresas: any;
  selectedBussines: any;
  id_empresa: any = '';
  valuefliter: string;
  empresaselec: any;
  return: boolean;
  hastamin: Date;
  newf: string;
  newf2: string;
  currentDate: Date = new Date();
  constructor(private authService: AuthService,
    private formService: FormService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {

    this.selectedBussines = 'Seleccione la Empresa'
  }

  ngOnInit() {
    this.dateFC = new Date();
    this.dateIC = new Date();



    var dateFinal = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");

    var dateInicial = this.datePipe.transform(this.currentDate, "yyyy-MM-dd");

    this.gestionForm = new FormGroup({
      desde: new FormControl(dateInicial, Validators.required),
      hasta: new FormControl(dateFinal, Validators.compose([
        Validators.required,
        this.validafhasta({
          menor: true
        }),

      ]))
    })

    this.companies = JSON.parse(localStorage.getItem('company')).id_compania;


    console.log('esta es la compañia:::', this.companies)
    this.listarEmpresas(this.companies);


  }


  validafhasta(error: ValidationErrors): ValidatorFn {
    /*  return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
       
        return null;
      }
  
      var desde = new Date(this.gestionForm.get('desde').value);
      var hasta = new Date(this.gestionForm.get('hasta').value);
  
  
      if (desde<=hasta) {
        
        return null;
      }
  
  
  
      return error;
    };  */
    return null;
  }

  evento(e) {
    console.log('INGRESA AL EVENTO:    ', e)
    this.selectedBussines = e.nombre_comercial;
    this.id_empresa = e.id_empresa;


  }

  generar() {
    console.log('entra a gebrar el reporte')
    if (this.id_empresa && this.gestionForm.valid) {
      console.log('el formulario es valido')



      var di = new Date(this.gestionForm.get('desde').value);
      var df = new Date(this.gestionForm.get('hasta').value);


if(di>df){
  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: 'La fecha final no puede ser menor',
    timer: 4000
    //footer: '<a href>Why do I have this issue?</a>'
  });
return ;
}



      this.formService.generatereport(this.companies, this.id_empresa, this.gestionForm.get('desde').value, this.gestionForm.get('hasta').value,this.option).then(data => {
        console.log('LISTA DE CUENTAS DE LA PLA', data)

        window.open(data.url, '_blank');

      });



    } else {
      console.log('el formulario noooooooooooooooooooo es valido')
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Revisar todos los campos',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
  
    }
  }

  listarEmpresas(id_compania) {
    this.formService.selectbusiness(id_compania)
      .pipe(first())
      .subscribe(
        data => {
          console.log('esta es la dataaaaaa:   ', data.data)
          this.listEmpresas = data.data;
          if (this.return) {
            this.empresaselec = this.listEmpresas.filter(t => t.id_empresa == this.id_empresa);
            console.log('esta es la empresa selectttttttttttttttttttttttttttttttttttttttttttttttttttttttt', this.empresaselec)

          }
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




}
