import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RiskService } from '../services-riesgos/risk.service';
import { repeat } from 'lodash';
import Swal from "sweetalert2";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-ana-risks',
  templateUrl: './ana-risks.component.html',
  styleUrls: ['./ana-risks.component.scss']
})
export class AnaRisksComponent implements OnInit {
  displayedColumns: string[] = ['Descripcion', 'select'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  form: FormGroup;
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep4:FormGroup;
  isLinear = true;
  private _unsubscribeAll: Subject<any>;
  tiporiesgos: any[];
  partesint: any[];
  factores: any[];
  tiporiesgoop: any[];
  tiporiesgoopdet: any[];
  listaactividades: any[];
  datafromlocal: any;
  listaactividadesdet: any[];
  listacontrol:any=[];
  listadocumentos:any=[];
  listafrecuencia:any=[];
  listconfidencialidad:any[];  
  listintegridad:any[];
  listdisponibilidad:any[];
  listimpacto:any[];

  selected: string;
  selected2: string;
  selected3: string;
  selected4: string;
  selected5: string;
  selected6: string;
  selected7: string;
  selected8: string;
  selected9: string;
  selected10: string;
  selected11: string;
  selected12: string;
  selected13: string;
  selected14: string;
  selected15: string;
  selected16: string;
  selected17: string;
  selected18: string;
  selectedpro:string;
  selectedproceso2:string;
  selected19:string;






color1:string;
color2:string;
color3:string;
color4:string;
  muestratiporiesgo: boolean;
  muestratiporiesgodet: boolean;
  muestraact: boolean;
  muestraactdet: boolean;
  conf: any;
  valorconf: number;
  descconf: number;
  valorimpacto: number;
  valordisp: number;
  valorint: number;
  descimpacto: any;
  idimpacto: any;
  int: any;
  descint: any;
  disp: any;
  descdisp: any;
  esRSI: boolean;



  factorriesgo:any;
  parteinteresada:any;
  tipoderiesgo:any;
  detalleriesgooperativo:any;
  detalleriesgooperacional:any;
  actividades :any;
  detalleactividades:any;
  riesgocontrol: number;
  valtipocontrol:number;
  valtipodocumento:number;
  valtipofrecuencia:number;
  tipocontrol: any[];
  tipodocumentos: any;
  tipofrecuencia: any;
  listanexosprin: any;
  listanexosprindet: any;
  listactivo: any;

  anexos: any[];
  listriesgocontrol: any;
  listriesgoresidual: any;
  descriesgocontrol: any;
  idriesgocontrol: any;
  descriegores: any;
  idriesgores: any;
  riesgoresidual: number;
  estrategias: { id: number; nombre: string; }[];
  decisiones: any;
  muestravalores: boolean;
  eventoana: any;
  riesgoinherente: number;
  planaccion: number;
  esplan: boolean;
  estrategiaselec: { id: number; nombre: string; }[];
  decisionesselec: any;
  datosguardar: {};
  confselec: any[];
  integridadselec: any[];
  dispselect: any[];
  impactoselec: any[];
  listaline: any;
  detallelinea: any;
  perdida: any;
  riesgoresidualselect: any;
  lineaselec: any;
  lineadetselec: any;
  perdidaselect: any;
  muetsraline: boolean=false;
  activo: any ;
  listaactivos: any;
  
  panelOpenState = false;
  listproceso: any;
  agencia: boolean;
  mostrarproceso2: boolean;
  anexosdet: any;


  constructor(private _formBuilder: FormBuilder, public riskService: RiskService,public router:Router) { }

  ngOnInit(): void {
  this.muestravalores=false;
this.color1='white';
this.color2='white';
this.color3='white';
this.color4='white';

this.valorconf=0;
this.valorint=0;
this.valordisp=0;
this.valorimpacto=0;

this.riesgocontrol=0;
this.valtipocontrol=0;
this.valtipodocumento=0;
this.valtipofrecuencia=0;

this.factorriesgo =[{nombre:'' }];

this.parteinteresada =[{nombre:'' }];
this.tipoderiesgo =[{nombre:'' }];
//this.detalleriesgooperativo =[{nombre:'' }];

//this.detalleriesgooperacional =[{nombre:'' }];

//this.actividades =[{nombre:'' }];
//this.detalleactividades =[{nombre:'' }];

//this.anexos =[{descripcion:'' }];
this.impactoselec=[{id:0,nombre:'',val:0}]





/* parteinteresada:any;
tipoderiesgo:any;
detalleriesgooperativo:any;
detalleriesgooperacional:any;
actividades :any;
detalleactividades:any; */
    const data = localStorage.getItem('anarisk');
    this.datafromlocal = JSON.parse(data);

    this.fillfields();



    this.form = this._formBuilder.group({
      company: [
        {
          value: 'Google',
          disabled: true
        }, Validators.required
      ],
      descripcionr: ['', Validators.required],
      causa1: ['', Validators.required],
      causa2: [''],
      causa3: [''],
      consec1: [''],
      consec2: [''],
      consec3: [''],
      country: ['', Validators.required]
    });

    this.horizontalStepperStep1 = this._formBuilder.group({
      tipor: ['', Validators.required],
      interes: ['', Validators.required],
      proceso: ['', Validators.required],


    });

    this.horizontalStepperStep2 = this._formBuilder.group({
      tipori: ['', Validators.required],



    });

    this.horizontalStepperStep3 = this._formBuilder.group({
      control: ['', Validators.required],
      docu: ['', Validators.required],
      //consec3: ['', [Validators.required, Validators.maxLength(5)]]
      frec: ['', Validators.required],
      descontrol: ['', Validators.required],
      desdocument: ['', Validators.required],
      desfrecuencia: ['', Validators.required],
      perdida:['', Validators.required],
      valperdida:['', Validators.required],

/*       confidencialidad: ['', Validators.required],
      integridad: ['', Validators.required],
      disponibilidad: ['', Validators.required],
      impacto: ['', Validators.required], */



    });
    this.horizontalStepperStep4 = this._formBuilder.group({
      estrategias: ['', Validators.required],
      decisiones: ['', Validators.required],
      proceso: ['', Validators.required],
    });
    

  }


  fillfields() {
    this.getRiskProceso();
    const data=localStorage.getItem('anarisk')
    this.eventoana=JSON.parse(data);
    //console.log('dataaaaaaaaaaaaaaaaaaaa',this.eventoana)
    this.riskService.getParamAnalisis(this.eventoana.id_riesgo).subscribe(resp => {

      console.log(resp)
      this.factores = resp.detalleFactores;
      this.partesint = resp.detalleinteresada;
      this.tiporiesgos = resp.detalletiporiesgo;
      this.listacontrol=resp.detallecontrol;
      this.listadocumentos=resp.detalledocumento;
      this.listafrecuencia=resp.detallefrecuencia;
      this.listconfidencialidad=resp.detalleconfidencialidad
      this.listintegridad=resp.detalleintegridad 
      this.listdisponibilidad=resp.detalledisponibilidad
      this.listimpacto=resp.detalleimpactoanalisis;
      this.listanexosprin=resp.detalleanexoa;
      this.listaactivos=[{idactivo:'1',descripcion:'Hardware'},
      {idactivo:'2',descripcion:'Software'},
      {idactivo:'3',descripcion:'Datos'},
      {idactivo:'4',descripcion:'Documentos'},
      {idactivo:'5',descripcion:'Infraestructura tecnológica'},
      {idactivo:'6',descripcion:'Personas'},
      {idactivo:'7',descripcion:'Otros'}
    ]
      this.listriesgocontrol=resp.detalleriesgocontrol;
      this.listriesgoresidual=resp.detalleriesgores

      this.listaline=resp.detallelineaneg
      this.perdida=resp.detalleperdidaevn
      this.estrategias=[{id:1,nombre:'Asumir'},{id:2,nombre:'Compartir'},{id:3,nombre:'Mitigar/Transferir'}]
      this.decisiones=resp.detalledesimpl
      this.riesgoinherente=parseInt(resp.datos.riegoinherente)
      this.planaccion=parseInt(resp.datos.planaccion)
      //console.log('impactoooo:', ELEMENT_DATA);
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

      //console.log('Datos:', resp);

    }, err => {

      //console.log('error:   ' + err);

    })
  }


  getRiskProceso() {

    this.riskService.getRiskProceso().subscribe(resp => {
      console.log('respppppppp',resp)
      if (resp.responseCode == 'Ok') {
        this.listproceso = resp.jsonArray
        console.log('ESTA ES LA LISTA DE SERVICIOS', this.listproceso)
      } else {

      }
    }, err => {
      this.agencia = false;
      console.log('error:   ' + err);

    })
  }
  changeProceso(e){

    console.log('entra al cambio de proceso',e)
  }

  changeProceso2(e){
    console.log('entra al cambio de proceso 222222',e)

  }

  changefactor(e){
    //console.log('entra al cambio de factor', e.value)
    this.factorriesgo = this.factores.filter(t => t.idfactores==e.value);
    //console.log('El resultado es:::::', this.factorriesgo);


  }
  changeParteInteresada(e){
    //console.log('entra al cambio de parte interesada', e.value)
    this.parteinteresada = this.partesint.filter(t => t.idparteinteresada==e.value);
    //console.log('El resultado es:::::', this.parteinteresada);

  }
  changelinea(e){
    //console.log('entra al cambio de linea', e.value)
    this.lineaselec = this.listaline.filter(t => t.id==e.value);
    //console.log('El resultado es:::::', this.lineaselec);

 this.riskService.getDetalleLinea(e.value).subscribe(resp => {
     

      //console.log('Datos:', resp);
      
       
        this.detallelinea = resp.detallelineaneg;
      


    }, err => {

      //console.log('error:   ' + err);

    })
  }
  changelineadet(e){
    //console.log('entra al cambio de detalle de linea', e.value)
    this.lineadetselec = this.detallelinea.filter(t => t.id==e.value);
    //console.log('El resultado es:::::', this.lineadetselec);
  }

  changeperdida(e){
    //console.log('entra al cambio de perdia', e.value)
    this.perdidaselect = this.perdida.filter(t => t.id==e.value);
    //console.log('El resultado es:::::', this.perdidaselect);
  }
  


  changetipocontrol(e){
  
    //console.log('entra al cambio de parte interesada', e.value)
    this.tipocontrol = this.listacontrol.filter(t => t.idtipocontrol==e.value);
    //console.log('El resultado es:::::', this.tipocontrol)
  
     this.valtipocontrol=parseInt(this.tipocontrol[0].valor)
    this.riesgocontrol = this.valtipocontrol + this.valtipodocumento+this.valtipofrecuencia; 
    const result2 = this.listriesgocontrol.filter(t => parseInt(t.valormax) >= this.riesgocontrol && parseInt(t.valormin) <= this.riesgocontrol);
    this.descriesgocontrol=result2[0].nombre;
    this.idriesgocontrol=result2[0].id;

    //console.log('La suma es:::::', this.riesgocontrol)


    this.riesgoresidual = this.riesgoinherente-this.riesgocontrol;
    if(this.esRSI){
      this.riesgoresidual+=2
    }

    const result3 = this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);
    this.riesgoresidualselect=this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);
    this.descriegores=result3[0].nombre;
    this.idriesgores=result3[0].id;

  }
  changetipodocumento(e){
    //console.log('entra al cambio de parte interesada', e.value)
    this.tipodocumentos = this.listadocumentos.filter(t => t.iddocumentocontrol==e.value);
    //console.log('El resultado es:::::', this.tipodocumentos)
  
     this.valtipodocumento=parseInt(this.tipodocumentos[0].valor)
    this.riesgocontrol = this.valtipocontrol + this.valtipodocumento+this.valtipofrecuencia; 
    const result2 = this.listriesgocontrol.filter(t => parseInt(t.valormax) >= this.riesgocontrol && parseInt(t.valormin) <= this.riesgocontrol);
    this.descriesgocontrol=result2[0].nombre;
    this.idriesgocontrol=result2[0].id;
    this.riesgoresidual = this.riesgoinherente-this.riesgocontrol;
    if(this.esRSI){
      this.riesgoresidual+=2
    }
    const result3 = this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);
    this.riesgoresidualselect=this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);

    this.descriegores=result3[0].nombre;
    this.idriesgores=result3[0].id;

    //console.log('La suma es:::::', this.riesgocontrol)
  }
  changetipofrecuencia(e){
    //console.log('entra al cambio de parte interesada', e.value)
    this.tipofrecuencia = this.listafrecuencia.filter(t => t.idfrecuencia==e.value);
    //console.log('El resultado es:::::', this.listafrecuencia)
  
     this.valtipofrecuencia=parseInt(this.tipofrecuencia[0].valor)
    this.riesgocontrol = this.valtipocontrol + this.valtipodocumento+this.valtipofrecuencia; 
    //console.log('La suma es:::::', this.riesgocontrol)
    const result2 = this.listriesgocontrol.filter(t => parseInt(t.valormax) >= this.riesgocontrol && parseInt(t.valormin) <= this.riesgocontrol);
    this.descriesgocontrol=result2[0].nombre;
    this.idriesgocontrol=result2[0].id;


    this.riesgoresidual =this.riesgoinherente- this.riesgocontrol;
    if(this.esRSI){
      this.riesgoresidual+=2
    }
    const result3 = this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);
    this.riesgoresidualselect=this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);

    this.descriegores=result3[0].nombre;
    this.idriesgores=result3[0].id;
  }


  changetipoR(e) {
    this.muestraact = false;
    this.muestratiporiesgodet = false;
    this.muestratiporiesgo = false;
    this.horizontalStepperStep3.removeControl('confidencialidad');
    this.horizontalStepperStep3.removeControl('integridad');
    this.horizontalStepperStep3.removeControl('disponibilidad');
    this.horizontalStepperStep3.removeControl('impacto');

    this.horizontalStepperStep2.removeControl('tiporio');
    this.horizontalStepperStep2.removeControl('tiporiodet');
    this.horizontalStepperStep2.removeControl('listaact');
    this.muestraactdet = false;
    this.horizontalStepperStep2.removeControl('listaactdet');
    this.horizontalStepperStep2.removeControl('lineaneg');
    this.horizontalStepperStep2.removeControl('lineanegdet');
    //console.log('entra al cambio de tipor', e.value)
    this.tipoderiesgo = this.tiporiesgos.filter(t => t.idtiporiesgo==e.value);
    //console.log('El resultado es:::::', this.tipoderiesgo);

    this.riskService.getDataAnalisis(e.value).subscribe(resp => {
      //console.log('CANTIDADDDDD:', resp.detalletiporiesgo.length);

      //console.log('Datos:', resp);
      if (resp.detalletiporiesgo.length == 0) {
        this.muestratiporiesgo = false;
        this.selected4 = '';
        this.horizontalStepperStep2.removeControl('tiporio');
      } else {
        this.horizontalStepperStep2.addControl('tiporio', new FormControl('', Validators.required))
        this.muestratiporiesgo = true;
        this.tiporiesgoop = resp.detalletiporiesgo;
      }


    }, err => {

      //console.log('error:   ' + err);

    })

  }
  changetipoRO(e) {
    console.log("tipooooooooooooooooooo",e)
    this.horizontalStepperStep3.removeControl('confidencialidad');
    this.horizontalStepperStep3.removeControl('integridad');
    this.horizontalStepperStep3.removeControl('disponibilidad');
    this.horizontalStepperStep3.removeControl('impacto');
    this.horizontalStepperStep3.removeControl('anexos');
    this.horizontalStepperStep3.removeControl('anexosdet');
    this.horizontalStepperStep3.removeControl('activoinfor');


    this.horizontalStepperStep3.removeControl('vulnerabilidades');

    this.horizontalStepperStep3.removeControl('amenazas');
    this.horizontalStepperStep3.removeControl('activoesp');

    

    this.muestraact = false;
    this.esRSI=false;

    this.muestratiporiesgodet = false;
    this.horizontalStepperStep2.removeControl('tiporiodet');
    this.horizontalStepperStep2.removeControl('listaact');
    this.muestraactdet = false;
    this.horizontalStepperStep2.removeControl('listaactdet');
    this.horizontalStepperStep2.removeControl('lineaneg');
    this.horizontalStepperStep2.removeControl('lineanegdet');
    //console.log('entra al cambio de riesgo operativo', e.value)
    this.detalleriesgooperativo = this.tiporiesgoop.filter(t => t.idtiporiesgo==e.value);
    //console.log('El resultado es:::::', this.detalleriesgooperativo);
    this.riskService.getDataAnalisis(e.value).subscribe(resp => {
      //console.log('CANTIDADDDDD:', resp.detalletiporiesgo.length);
      if(e.value=='ROO'){
        this.muetsraline=true;
        this.horizontalStepperStep2.addControl('lineaneg', new FormControl('', Validators.required))
        this.horizontalStepperStep2.addControl('lineanegdet', new FormControl('', Validators.required))
      }else{
        this.muetsraline=false;
        this.horizontalStepperStep2.removeControl('lineaneg');
        this.horizontalStepperStep2.removeControl('lineanegdet');
      }
      if(e.value=='RSI'){
        this.horizontalStepperStep3.addControl('confidencialidad', new FormControl('', Validators.required))
        this.horizontalStepperStep3.addControl('integridad', new FormControl('', Validators.required))
        this.horizontalStepperStep3.addControl('disponibilidad', new FormControl('', Validators.required))
        this.horizontalStepperStep3.addControl('impacto', new FormControl(''))
        this.horizontalStepperStep3.addControl('anexos', new FormControl('', Validators.required))
        this.horizontalStepperStep3.addControl('anexosdet', new FormControl('', Validators.required))

        this.horizontalStepperStep3.addControl('activoinfor', new FormControl('', Validators.required))


        this.horizontalStepperStep3.addControl('vulnerabilidades', new FormControl('', Validators.required))

        this.horizontalStepperStep3.addControl('amenazas', new FormControl('', Validators.required))
        this.horizontalStepperStep3.addControl('activoesp', new FormControl('', Validators.required))



        this.esRSI=true;
        }
      //console.log('Datos:', resp);
      if (resp.detalletiporiesgo.length == 0) {
        this.muestratiporiesgodet = false;
        this.horizontalStepperStep2.removeControl('tiporiodet');
      } else {
        
        this.horizontalStepperStep2.addControl('tiporiodet', new FormControl('', Validators.required))
        this.muestratiporiesgodet = true;
        this.tiporiesgoopdet = resp.detalletiporiesgo;
      }


    }, err => {

      //console.log('error:   ' + err);

    })

  }
  changetipoROD(e) {
    this.muestraact = false;

    this.horizontalStepperStep2.removeControl('listaact');

    this.horizontalStepperStep2.removeControl('listaact');
    this.muestraactdet = false;
    this.horizontalStepperStep2.removeControl('listaactdet');
    //console.log('entra al cambio de maoooooooo', e.value)
    this.detalleriesgooperacional = this.tiporiesgoopdet.filter(t => t.idtiporiesgo==e.value);
    //console.log('El resultado es:::::', this.detalleriesgooperativo);
   
    this.riskService.getDataAnalisis(e.value).subscribe(resp => {
      //console.log('CANTIDADDDDD:', resp.detalletiporiesgo.length);

      //console.log('Datos:', resp);
      if (resp.detalletiporiesgo.length == 0) {
        this.muestraact = false;
        this.horizontalStepperStep2.removeControl('listaact');
      } else {
        this.horizontalStepperStep2.addControl('listaact', new FormControl('', Validators.required))
        this.muestraact = true;
        this.listaactividades = resp.detalletiporiesgo;
      }


    }, err => {

      //console.log('error:   ' + err);

    })

  }
  changeact(e) {


    this.muestraactdet = false;
    this.horizontalStepperStep2.removeControl('listaactdet');

    //console.log('entra al cambio de maoooooooo', e.value)
    this.actividades = this.listaactividades.filter(t => t.idtiporiesgo==e.value);
    //console.log('El resultado es:::::', this.actividades);
    this.riskService.getDataAnalisis(e.value).subscribe(resp => {
      //console.log('CANTIDADDDDD:', resp.detalletiporiesgo.length);

      //console.log('Datos:', resp);
      if (resp.detalletiporiesgo.length == 0) {
        this.muestraactdet = false;
        this.horizontalStepperStep2.removeControl('listaactdet');
      } else {
        this.horizontalStepperStep2.addControl('listaactdet', new FormControl('', Validators.required))
        this.muestraactdet = true;
        this.listaactividadesdet = resp.detalletiporiesgo;
      }


    }, err => {

      //console.log('error:   ' + err);

    })




  }

  changeactdet(e) {
    //console.log('entra al cambio de maoooooooo', e.value)
    this.detalleactividades = this.listaactividadesdet.filter(t => t.idtiporiesgo==e.value);
    //console.log('El resultado es:::::', this.detalleactividades);
  }


  changeanexos(e){
    //console.log('entra quuuuuu',e)
    this.anexos = this.listanexosprin.filter(t => t.idanexoa==e.value);
    //console.log('El resultado es:::::', this.anexos);


    this.riskService.getdetalleanexos(e.value).subscribe(resp => {
      console.log('dataaaaaaaaaa:', resp);
this.listanexosprindet=resp.jsonArray;
      console.log('Datos:', this.listanexosprindet);
     


    }, err => {

      //console.log('error:   ' + err);

    })

  }


  changeanexosdet(e){
    //console.log('entra quuuuuu',e)
    this.anexosdet = this.listanexosprindet.filter(t => t.id_anexoa_detalle==e.value);
    //console.log('El resultado es:::::', this.anexos);





    
  }
  
  
  changeactivo(e){
    console.log('entra cambio activo',e)
    this.activo = this.listaactivos.filter(t => t.idactivo==e.value);
    console.log('El resultado es:::::', this.activo); 

  }

  changeConfidencialidad(e){
    //console.log('ingresa aqui',e)
    
    const result = this.listconfidencialidad.filter(t => t.idconfidencialidad === e.value);
    this.confselec=this.listconfidencialidad.filter(t => t.idconfidencialidad === e.value);
    var data = result;
    this.color1 = data[0].color;
    this.conf=data[0].idconfidencialidad;
    this.valorconf = parseInt(data[0].valor);
    this.descconf=data[0].descripcion
    //console.log('numero1111', this.valorconf)
    this.valorimpacto = this.valorconf + this.valorint+this.valordisp;
    //console.log('resultaado', this.valorimpacto);

    const result2 = this.listimpacto.filter(t => parseInt(t.valormax) >= this.valorimpacto && parseInt(t.valormin) <= this.valorimpacto);
    this.impactoselec= this.listimpacto.filter(t => parseInt(t.valormax) >= this.valorimpacto && parseInt(t.valormin) <= this.valorimpacto);

    //console.log('EL RESULTADO ES::::::::::::::::::::',result2)
    this.color4 = result2[0].color;
    this.descimpacto=result2[0].descripcion;
    this.idimpacto=result2[0].idimpacto;
    //console.log('EL COMBO QUE ME DEVUELVE ES: ', result2);

  }
  changeIntegridad(e){
    //console.log('ingresa aqui',e)


    //console.log('aqui', e)
    const result = this.listintegridad.filter(t => t.idintegridad === e.value);
    this.integridadselec=this.listintegridad.filter(t => t.idintegridad === e.value);
    var data = result;
    this.color2 = data[0].color;
    this.int=data[0].idintegridad;
    this.valorint = parseInt(data[0].valor);
    this.descint=data[0].descripcion
    //console.log('numero1111', this.valorint)
    this.valorimpacto = this.valorconf + this.valorint+this.valordisp;
    //console.log('resultaado', this.valorimpacto);

    const result2 = this.listimpacto.filter(t => parseInt(t.valormax) >= this.valorimpacto && parseInt(t.valormin) <= this.valorimpacto);
    this.impactoselec= this.listimpacto.filter(t => parseInt(t.valormax) >= this.valorimpacto && parseInt(t.valormin) <= this.valorimpacto);

    //console.log('EL RESULTADO ES::::::::::::::::::::',result2)
    this.color4 = result2[0].color;
    this.descimpacto=result2[0].descripcion;
    this.idimpacto=result2[0].idimpacto;
    //console.log('EL COMBO QUE ME DEVUELVE ES: ', result2);

  }
  changeDisponibilidad(e){
    //console.log('ingresa aqui',e)


    //console.log('aqui', e)
    const result = this.listdisponibilidad.filter(t => t.iddisponibilidad === e.value);
    this.dispselect= this.listdisponibilidad.filter(t => t.iddisponibilidad === e.value);
    var data = result;
    this.color3 = data[0].color;
    this.disp=data[0].iddisponibilidad;
    this.valordisp = parseInt(data[0].valor);
    this.descdisp=data[0].descripcion
    //console.log('numero1111', this.valordisp)
    this.valorimpacto = this.valorconf + this.valorint+this.valordisp;
    //console.log('resultaado', this.valorimpacto);


    const result2 = this.listimpacto.filter(t => parseInt(t.valormax) >= this.valorimpacto && parseInt(t.valormin) <= this.valorimpacto);
    this.impactoselec= this.listimpacto.filter(t => parseInt(t.valormax) >= this.valorimpacto && parseInt(t.valormin) <= this.valorimpacto);

    //console.log('EL RESULTADO ES::::::::::::::::::::',result2)
    this.color4 = result2[0].color;
    this.descimpacto=result2[0].descripcion;
    this.idimpacto=result2[0].idimpacto;
    //console.log('EL COMBO QUE ME DEVUELVE ES: ', result2);

  }
  changeestrategias(e){

    //console.log('entra quuuuuu',e)
    this.estrategiaselec = this.estrategias.filter(t => t.id==e.value);
    if(this.estrategiaselec[0].id==2||this.estrategiaselec[0].id==3){
      this.mostrarproceso2=true;
    }else{
      this.mostrarproceso2=false;

    }
    //console.log('El resultado es:::::', this.estrategiaselec);
 }
 changedecisiones(e){
  //console.log('entra quuuuuu',e)
  this.decisionesselec = this.decisiones.filter(t => t.id==e.value);
  //console.log('El resultado es:::::', this.decisionesselec);
 }
  cargadatos() {

        if(this.riesgoresidual>this.planaccion){
this.esplan=true;
        }else{
          this.esplan=false;

        }
        if(this.riesgoresidual<0){
          //console.log('entra aqui')
          this.riesgoresidual=1;
        }
        const result3 = this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);
        if(result3[0]!=null){
        this.descriegores=result3[0].nombre;
        this.idriesgores=result3[0].id;
      }





  }


  calculavalores(){
    this.muestravalores=true;
    this.riesgoresidual =0;
    this.riesgocontrol =0;
    if(this.esRSI){
      
    }else{
      
    }
    this.riesgocontrol = this.riesgocontrol+this.valtipocontrol + this.valtipodocumento+this.valtipofrecuencia; 
    //console.log('La suma es:::::', this.riesgocontrol)
    const result2 = this.listriesgocontrol.filter(t => parseInt(t.valormax) >= this.riesgocontrol && parseInt(t.valormin) <= this.riesgocontrol);
    this.descriesgocontrol=result2[0].nombre;
    this.idriesgocontrol=result2[0].id;


    this.riesgoresidual = this.riesgoresidual+ this.riesgocontrol+3;

    const result3 = this.listriesgoresidual.filter(t => parseInt(t.valormax) >= this.riesgoresidual && parseInt(t.valormin) <= this.riesgoresidual);
    this.descriegores=result2[0].nombre;
    this.idriesgores=result2[0].id;
  }
  finishHorizontalStepper(): void {


    //console.log('maooooooooo',this.horizontalStepperStep4.get('decisiones').value)
    if(this.esplan){
    if(      this.horizontalStepperStep4.get('decisiones').value==null || this.horizontalStepperStep4.get('decisiones').value==''||this.horizontalStepperStep4.get('decisiones').value==undefined
    ){
      Swal.fire({
        title: 'Error',
        text: 'No ha ingresado el campo decisiones:   ' ,
        timer: 5000,
        timerProgressBar: true,
        position: 'bottom-end',
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
          var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
          zippi.play();
        }
      })
      return;
    }
  }

    this.datosguardar = {
      factor:this.factorriesgo, 
      parteintersada:this.parteinteresada,
      tiporiesgo:this.tipoderiesgo,
      listacontrol:this.tipocontrol,
      listadocumentos:this.tipodocumentos,
      listafrecuencia:this.tipofrecuencia,

      listconfidencialidad:this.confselec,
      listintegridad:this.integridadselec,
      listdisponibilidad: this.dispselect,
      estrategias:this.estrategiaselec,


      tiporiesgoop:this.detalleriesgooperativo,
      tiporiesgoopdet:this.detalleriesgooperacional,
      listaactividades:this.actividades,
      listaactividadesdet:this.detalleactividades,
      
      
      listanexos:this.anexos,
      listanexosdet:this.anexosdet,
      es_riesgo_sdi:this.datafromlocal.es_riesgo_sdi,
      activoinfor:this.activo==undefined?'':this.activo.idactivo,

      vulnerabilidades:this.horizontalStepperStep3.get('vulnerabilidades')==null?'':this.horizontalStepperStep3.get('vulnerabilidades').value,
      amenazas:this.horizontalStepperStep3.get('amenazas')==null?'':this.horizontalStepperStep3.get('amenazas').value,
      activoesp:this.horizontalStepperStep3.get('activoesp')==null?'':this.horizontalStepperStep3.get('activoesp').value,
      idimpacto:this.idimpacto==null?'':this.idimpacto,
      valimpacto:this.valorimpacto,
      descimpacto:this.descimpacto==null?'':this.descimpacto,
      
      decisiones:this.decisionesselec,
      idcabe:this.eventoana.id_riesgo,


      riesgoresidual:this.riesgoresidualselect,

      lineanegocio:this.lineaselec,
      detallelinea:this.lineadetselec,
      perdida:this.perdidaselect,
      valperdida:this.horizontalStepperStep3.get('valperdida').value==null?0:this.horizontalStepperStep3.get('valperdida').value,
      procesoprincipal:this.selectedpro,
      procesosecundario:this.selectedproceso2


     };

   
   //console.log('ESTE ES EL FINAL');
   

   console.log('FIN', this.datosguardar)
   console.log('MAOOOOOOO' + JSON.stringify(this.datosguardar))

    this.riskService.savepart2(this.datosguardar).subscribe(resp => {
      //console.log('respuesta')
      //console.log('RIESGOS',resp)
      if(resp.responseMessage=='Ok'){
        localStorage.removeItem('anarisk');
        Swal.fire({
          icon: 'success',
          title: 'BUEN TRABAJO',
          text: 'Se ha guardado el analisis con éxito',
          timer: 5000,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
   
        });
        /* this.router.navigate(['boards/']); */
        this.router.navigate(['/default/riesgos/list-ana']);

      }else{
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al almacenar el analisis:   ' ,
          timer: 5000,
          timerProgressBar: true,
          position: 'bottom-end',
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
      }

   }, err => {
     Swal.fire({
       title: 'Error',
       text: 'Ha ocurrido un error al almacenar:   ' + err,
       toast: true,
       position: 'bottom-end',
       showConfirmButton: false,
       timer: 5000,
       timerProgressBar: true,
       onOpen: (toast) => {
         toast.addEventListener('mouseenter', Swal.stopTimer)
         toast.addEventListener('mouseleave', Swal.resumeTimer)
         var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
         zippi.play();
       }
     })
     //console.log('error:   ' + err);

   }) 


 
  }



  

 

}

