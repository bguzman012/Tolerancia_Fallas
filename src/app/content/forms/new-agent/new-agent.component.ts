import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/forms.service';
import Swal from "sweetalert2";
import { Observable, Subscription } from 'rxjs';
import { GxHelper } from '@gaxon/helpers';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize, first } from 'rxjs/operators';
import { InvokeMethodExpr } from '@angular/compiler';


@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html',
  styleUrls: ['./new-agent.component.scss']
})
export class NewAgentComponent implements OnInit {

  loading: boolean = false;
  id_compania: any;
  dateFinal: string;
  agentForm: FormGroup;
  dataPerson: any = {};
  listTipoAgente: any[] = [];

  zones_preload: any[] = []
  listEmpresas: any[] = [];
  listCalificacion: any[] = [];
  listGestion: any[] = [];
  listZonas: any[] = [];
  selectedZonas: any[] = [];
  is_all_cartera: boolean
  list2TipoAgente: any[] = [];
  selectedObj: any = {};
  companies: any = []
  map: any = [];
  id_tipo_agente: any;
  id_tipo_gestion: any;
  mostrarTipoAgente: boolean = false;
  mostarTipoAgente: boolean = true;

  editar: boolean
  id_empresa: any;
  id_calificacion: any;
  disableSave: boolean;
  habilitar_empresa: string = '0';
  habilitar_zona: string = '0';
  habilitar_calificacion: string = '0';
  habilitar_monto: string = '0';
  habilitar_gestion_type: string = "0";

  constructor(private datePipe: DatePipe,
    private formService: FormService,

  ) {


  }

  ngOnInit(): void {
    this.dataPerson = {};
    this.disableSave = true;
    this.selectedObj.id = '';
    this.map = [];

    this.loading = false;
    this.id_compania = JSON.parse(localStorage.getItem('company')).id_compania;
    this.listarEmpresas(this.id_compania);
    (function () {
      'use strict'
      var forms = document.querySelectorAll('.needs-validation')
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
    var date = new Date();
    this.dateFinal = this.datePipe.transform(date, "dd-MM-yyyy");
    this.initform();
    this.getAgentType();
    this.getZones();
    this.getGestionType();

  }

  searchById(val) {
    this.initform()
    console.log('este es el valor que va a buscar::', val)

    this.getInfoPerson(val);
  }







  initform() {

    this.agentForm = new FormGroup({
      iTipoAgente: new FormControl(null, Validators.required),
      iEmpresa: new FormControl(null, Validators.required),
      iCalificacion: new FormControl(null, null),
      iMontomin: new FormControl(null),
      iMontomax: new FormControl(null),
      iGestionType: new FormControl(null)


    })

  }

  getInfoPerson(id) {
    this.formService.getInfoPerson(id).then(data => {

      console.log('Esta es la data de las personas:   ', data)
      this.dataPerson = {}
      if (data.status == 'OK') {
        this.dataPerson = data.data[0];

        if (this.dataPerson.agent.length == 1) {
          this.editar = true

          this.loadAgentData()

        }else{
          this.editar = false
        }

      } else {
        this.dataPerson = {};
        Swal.fire({
          title: 'UPS!!!',
          text: 'No se ha encontrado información de este usuario  ',
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

    });
  }

  loadAgentData() {
    console.log("Entroo", this.dataPerson.agent)
    this.agentForm.get('iMontomax').setValue(this.dataPerson.agent[0].monto_max);
    this.agentForm.get('iMontomin').setValue(this.dataPerson.agent[0].monto_min);
    this.agentForm.get('iGestionType').setValue(this.dataPerson.agent[0].id_gestion);
    this.agentForm.get('iCalificacion').setValue(this.dataPerson.agent[0].id_calificacion);
    console.log(this.dataPerson.agent[0].zone)

    this.zones_preload = this.dataPerson.agent[0].zone

    let zonas: any[] = []
    let zonas_inhabilitada: any[] = []

    this.listZonas.forEach(element => {
      let bandera: boolean
      for (let index = 0; index < this.zones_preload.length; index++) {
        const zona_default = this.zones_preload[index];
        
        if (element.id_zona == zona_default.id_zone) {
          
          console.log("La zona ", zona_default.id_zona, "deber ser setteada")
          let zona: any = []
          zona = {
            "id_zona": element.id_zona,
            "nombre": element.nombre,
            "checked": 1
          }
          bandera = true
          zonas.push(zona)
          return
        
        }
       
      }
      

      
    });
    console.log(zonas, "Estas zonas tiene este man")

  }


  getAgentType() {
    this.formService.getAgentType('').then(data => {
      console.log('Esta es la data de los tipos de agente:   ', data)
      this.listTipoAgente = data.gestion;
      this.listCalificacion = data.solucion;
    });

  }

  getGestionType() {
    this.formService.getGestionType().then(data => {
      console.log('Esta es la data de los tipos de agente:   ', data)
      this.listGestion = data.gestion;
    });

  }



  getZones() {
    this.formService.getZones('').then(data => {
      console.log('Esta es la data de los tipos de zonasssssssssssssssssssssss:   ', data)
      this.listZonas = data.data;
    });

  }

  eventotiAgente(val) {

    this.agentForm.get('iTipoAgente').setValue(val.nombre);
    this.id_tipo_agente = val.id_tipo_agente;
    console.log('entra al evento de tipo agente', this.id_tipo_agente);

  }
  eventoEmpresa(val) {

    this.agentForm.get('iEmpresa').setValue(val.nombre_comercial);
    this.id_empresa = val.id_empresa;
    console.log('entra al evento de tipoempe', this.id_empresa);
    this.habilitar_empresa = '1';

  }

  eventoCalificacion(val) {

    this.agentForm.get('iCalificacion').setValue(val.nombre);
    this.id_calificacion = val.id_calificacion;
    console.log('entra al evento de tipoempe', this.id_calificacion);
    this.habilitar_calificacion = '1';

  }

  eventoGestion(val) {
    this.agentForm.get('iGestionType').setValue(val.id_tipo_gestion);
    this.id_tipo_gestion = val.id_tipo_gestion;
    this.habilitar_gestion_type = '1';
    console.log(val)
  }
  listarEmpresas(id_compania) {
    this.formService.selectbusiness(id_compania)
      .pipe(first())
      .subscribe(
        data => {
          console.log('esta es la dataaaaaa empresaaas :   ', data.data)
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


  selectZona(event, item) {
    console.log('entra al evento check::', item, event.target.checked)

    if (event.target.checked) {
      this.selectedZonas.push({ id_zona: item.id_zona })

    } else {



      this.selectedZonas.forEach((item1, index1) => {
        if (item.id_zona === item1.id_zona) {
          this.selectedZonas.splice(index1, 1);
        }
      });
      console.log('voy a quitar del arrary')
    }
    console.log('este es el array finallllllll:::::::::::', this.selectedZonas)

  }
  onMoveToTarget(event: any) {
    console.log('ingresaaaa al aeventooooooooo', event, event.items);


    if (this.map[this.selectedObj.id] == undefined) {
      console.log('Ingresa en este paso    11111')
      this.map[this.selectedObj.id] = [];
    }

    if (!this.map[this.selectedObj.id].find(o => (o.id === event[0].id) && (o.name === event[0].name))) {
      console.log('Ingresa en este paso    22222')
      //console.log("PUSH");
      this.map[this.selectedObj.id].push(event[0]);

    } else {
      //console.log("NO PUSH");
      console.log('Ingresa en este paso    33333')
      this.list2TipoAgente = Array.from(new Set(this.map[this.selectedObj.id]));
    }


  }
  onChange(event) {
    console.log(event)
    this.is_all_cartera = event

  }
  saveAgent() {
    if (this.selectedZonas.length > 0) {
      this.habilitar_zona = '1';
    }
    var dataguardar = {
      id_persona: this.dataPerson.id_persona,
      id_tipo_agente: this.id_tipo_agente,
      id_empresa: this.id_empresa,
      habilitar_empresa: this.habilitar_empresa,
      habilitar_zona: this.habilitar_zona,
      id_calificacion: this.id_calificacion,
      id_gestion: this.id_tipo_gestion,
      habilitar_gestion: this.habilitar_gestion_type,
      habilitar_calificacion: this.habilitar_calificacion,
      monto_min: this.agentForm.get('iMontomin').value,
      monto_max: this.agentForm.get('iMontomax').value,
      habilitar_monto: this.habilitar_monto,
      detalle: this.selectedZonas

    };

    if (this.agentForm.valid) {

      this.loading = true;


      this.formService.saveAgent(dataguardar).subscribe(resp => {
        this.loading = false;
        Swal.fire({
          title: 'OK',
          text: 'La gestión ha sido ingresada correctamente  ',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.disableSave = false;
        console.log('GUARDOOOOOO');


      }, err => {
        this.disableSave = false;
        this.loading = false;
        Swal.fire({
          title: 'Ups!!',
          text: 'Ha Ocurrido un error  ' + err,
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })

      });


    } else {
      Swal.fire({
        title: 'UPS!!!',
        text: 'Por favor verifica los campos requeridos   ',
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
      console.log('Hay un error en los campos requeridos');
    }
  }
}
