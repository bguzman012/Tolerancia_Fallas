import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
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
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NewManagementComponent } from '../new-management/new-management.component';
import { DetailManagementComponent } from '../detailManagement/detail-management.component';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})

export class AccountDetailComponent implements OnInit {
 


  

  


  private searchElementRef:ElementRef;
  @ViewChild('search') set assetInput(elRef: ElementRef) {
      this.searchElementRef = elRef;
  }

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

  snippets: string = '';

  filelist: any[];
  companies: any;
  selectedcompany: string = "Seleccione Empresa";
  datasource: any[];
  option2: string = '1';
  option3: string = '1';
  listGarantes: any[]=[]
  customers: Customer[] = [];

  totalRecords: number;

  cols: any[];
  listOfContacts: any[]=[];
  loading: boolean;
  listEmpresas: any[]=[];
  selectedBussines: any;
  id_empresa: any;
  closeResult = '';
  telefono: string = '1234';
  urlMapa: string = '';
  zoom: number = 15;

  lat: number = -2.78;
  lng: number = -79.80;
  isNew: boolean = false;
  markers: Marker[] = [
    {
      lat: -2.8686147195603477,
      lng: -79.98254562397541,
      label: 'A',
      draggable: true
    }];
  id_cuenta: any;
  id_persona: any;
  dividendos: any;
  data_cliente: any = [];
  direcciones_cliente: any;
  datasource_dir_cli: any;
  datasource_tel_cli: any;
  telefonos_cliente: any;
  dataGeneral: any = { dataCliente: { garante: [{}, {}] } };
  datasource_gestiones: any;
  gestiones_cliente: any;


  datamodal: { id: string; };
  totalGestiones: any = 0;
  fuente: any;
  mostrargestion: boolean = true;
  direccionForm: FormGroup;
  direccionForm2: FormGroup;

  telefonoForm: FormGroup;
  refForm: FormGroup;

  listProvinias: any[] = [];
  listCantones: any[] = [];

  mostrarcanton: boolean = false;
  mostrarparroquia: boolean;
  id_provincia: any;
  id_canton: any;
  id_ciudad: any;
  listParroquias: any[]=[];
  listTipoDir: any[] = [];
  id_parroquia: any;
  latitude: any;
  longitude: any;
  id_tipo_direccion: any;
  disableSave: boolean;
  id_persona_direccion: any;
  datasource_history_dir: any;
  history_dir: any;
  totalRecords2: number;
  mostraremail: boolean;
  mostrargeneral: boolean;
  mostrartrabajo: boolean;
  datasource_ref_cli: any;
  referencias_cliente: any;
  totalRecordsref: any;
  id_persona_telefono: any;
  id_tipo_telefono: any;
  selectedCountryAdvanced: any = [];
  
  selectedCountryAdvanced2: any = [];
  
  selectedCountryAdvanced3: any = [];
  filteredCountries: any[];
  filteredCountries2: any[];
  
  filteredCountries3: any[];
  id_tipo_dir: any;
  listTipoTel: any;
  mostrarconyuge: any;
  address: string;

  
  private geoCoder;

 
  
  constructor(private authService: AuthService,
    private formService: FormService,
    private primengConfig: PrimeNGConfig,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {


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
    this.selectedBussines = 'Seleccione la Empresa';
    this.urlMapa = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31190.953715532487!2d-78.98254562397541!3d-2.8686147195603477!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd1718cc8c35dd%3A0x3e668f4abc89081a!2sRicaurte-Llacao!5e0!3m2!1ses!2sec!4v1623289905573!5m2!1ses!2sec';
  }


  

  ngOnInit() {





    /* ********************************************** */
    
   
     /* ******************************* */
    var option:number=0;
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
    this.markers = [
      {
        lat: -5.8686147195603477,
        lng: -79.98254562397541,
        label: 'A',
        draggable: true
      }];
    this.route.params.subscribe(params => {
      this.id_cuenta = params['id_cuenta'];
      this.id_persona = params['id_persona'];// desde el router mando como id empresa... eso deberia cambiar despues
      this.id_empresa = params['id_empresa'];
      this.fuente = params['fuente'];
    });



    console.log('+++++++++++++++++++++++++++++++++++++VIfuenteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeA', this.fuente);
    if (this.fuente == 'COB') {
      this.mostrargestion = false;
    }
    if (this.fuente == 'ADM') {
      this.mostrargestion = true;
    }
    if (this.id_cuenta == '0' && this.id_empresa == '0') {
      this.isNew = true;
      console.log('+++++++++++++++++++++++++++++++++++++VIENE DESDE EL MENU');
    } else {
      console.log('+++++++++++++++++++++++++++++++++++++VIENE DESDE LA LISTA', this.id_empresa);
      this.isNew = false;

      this.loadDetail(this.id_cuenta, this.id_persona);
      this.loadManagement(this.id_empresa, this.id_cuenta, this.id_persona)
    }
    this.listOfContacts = [{ title: 'Familia', nro_registros: '', observaciones: '' },
    { title: 'Garantes', nro_registros: '', observaciones: '' },
    { title: 'Referencias', nro_registros: '', observaciones: '' }]

    this.companies = this.authService.isCompany();
    this.companies = this.authService.isCompany();
    this.companies = JSON.parse(localStorage.getItem('company')).id_compania;
    console.log('esta es la compañia:::', this.companies)
    // this.listarEmpresas(this.companies);
    this.listarProv();
    this.initform();
    this.getTipoDir();
    this.getTipoTel();



  }

 
/* chargemap(){
  this.mapsAPILoader.load().then(() => {
    this.geoCoder = new google.maps.Geocoder;

    let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        //verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
  });
}
   */
  onChange(event) {
    console.log("Mago", this.selectedCountryAdvanced)
    this.id_provincia = this.selectedCountryAdvanced.id_provincia
    console.log(this.id_provincia, "Este es el idd")
    this.direccionForm.get('iProvincia').setValue(this.selectedCountryAdvanced.nombre);
    console.log('entra al evento de 33333333333333333333333333333333')
    this.listarCanton(this.id_provincia)

    console.log('entra al evento de 44444444444444444444444444444')
    this.direccionForm.addControl('iCanton', new FormControl(null, Validators.required))
    console.log('entra al evento de 55555555555555555555555555555')
    this.direccionForm.get('iCanton').setValue(null);
    console.log('entra al evento de 66666666666666666666666666666666')
    this.id_ciudad = null;
    this.mostrarcanton = true;
    this.mostrarparroquia = false;


  }
  onChange2(event){
    this.mostrarparroquia = true;
    console.log("Magi de oiz", this.selectedCountryAdvanced2)
    this.id_ciudad = this.selectedCountryAdvanced2.id_ciudad
    this.direccionForm.get('iCanton').setValue(this.selectedCountryAdvanced2.nombre);
    this.listarParroquia(this.id_provincia, this.id_ciudad)

    this.direccionForm.addControl('iParroquia', new FormControl(null, Validators.required))
    this.direccionForm.get('iParroquia').setValue(null);
    this.id_parroquia = null;

    
  }
  onChange3(event){
    this.id_parroquia = this.selectedCountryAdvanced3.id_parroquia;
    this.direccionForm.get('iParroquia').setValue(this.selectedCountryAdvanced3.nombre);
    
  }



  filterCountry(event) {
    let filtered: any[] = [];
    let opcion = {
      descripcion: "**Crear Ambito", id: 0,
    }
    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.listProvinias.length; i++) {
      let country = this.listProvinias[i];
      if (country.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }
    filtered.push(opcion)

    this.filteredCountries = filtered;
  }

  

  filterCountry2(event) {
    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.listCantones.length; i++) {
      let country = this.listCantones[i];
      if (country.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }

    this.filteredCountries2 = filtered;
  }
  filterCountry3(event) {
    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.listParroquias.length; i++) {
      let country = this.listParroquias[i];
      if (country.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }

    this.filteredCountries3 = filtered;
  }


  getTipoDir() {
    this.formService.getTipoDir(null, null, null, null).then(data => {
      console.log('sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', data)
      this.listTipoDir = data.address


    });
  }


  getTipoTel() {
    this.formService.getTipoTel(null, null, null, null).then(data => {
      console.log('sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', data)
      this.listTipoTel = data.phone


    });
  }
  listarProv() {
    this.formService.getProvincia('').then(data => {
      console.log('LISTA DE PROVINCIAS', data)
      this.listProvinias = data.province;
    });
  }
  listarCanton(id_provinicia) {
    this.formService.getCanton(id_provinicia).then(data => {
      console.log('LISTA DE cantonesssss', data)
      this.listCantones = data.city;
    });
  }
  listarParroquia(id_provinicia, id_ciudad) {
    this.formService.getParroquia(id_provinicia, id_ciudad).then(data => {
      console.log('LISTA DE parroquiassss', data)
      this.listParroquias = data.parish;
    });
  }
  initform() {


    this.direccionForm = new FormGroup({

    })

    this.telefonoForm = new FormGroup({

      tipoTel: new FormControl(null, Validators.required),

      numero: new FormControl(null, Validators.required)


    })


    this.refForm = new FormGroup({

      nombre: new FormControl(null, Validators.required),

      numero: new FormControl(null, Validators.required)


    })


  }

  eventoTipoTel(e) {

    this.id_tipo_telefono = e.id_tipo_telefono
    this.telefonoForm.get('tipoTel').setValue(e.nombre)

  }
  eventoTipoDir(e) {
    
    console.log('entra al evento de provinciasaaaaaaaaaaaaaa', e)
    this.id_tipo_direccion = e.id_tipo_direccion
    this.mostrartrabajo = false;
    this.mostraremail = false;
    this.mostrargeneral = false;
    this.direccionForm.get('tipoDir').setValue(e.nombre);


    if (this.id_tipo_direccion == 'EMAIL') {
      this.mostraremail = true;
      this.mostrargeneral = false;
      //this.direccionForm.removeControl('')
      this.direccionForm.removeControl('iProvincia');
      this.direccionForm.removeControl('callep');
      this.direccionForm.removeControl('callesec');
      this.direccionForm.removeControl('ncasa');
      this.direccionForm.removeControl('referencia');
      this.direccionForm.removeControl('iCanton');
      this.direccionForm.removeControl('iParroquia');



      this.direccionForm.addControl('mail', new FormControl(null, [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]))
    } else {
console.log('aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')



      this.direccionForm.removeControl('mail');
      this.direccionForm.addControl('iProvincia', new FormControl(null, Validators.required))
      this.direccionForm.addControl('iProvincia', new FormControl(null, Validators.required))
      this.direccionForm.addControl('callep', new FormControl(null, Validators.required))
      this.direccionForm.addControl('callesec', new FormControl(null, Validators.required))
      this.direccionForm.addControl('ncasa', new FormControl(null, Validators.required))
      this.direccionForm.addControl('referencia', new FormControl(null, Validators.required))
      this.mostrargeneral = true;
      this.mostrarcanton=false;
      this.mostrarparroquia=false;
      if (this.id_tipo_direccion == 'TRA') {
        this.mostrartrabajo = true;
        this.direccionForm.addControl('empresa', new FormControl(null, Validators.required))

      }
    }




  }

  eventoProvincia(e) {
    console.log('entra al evento de provinciasaaaaaaaaaaaaaa', e)

    this.id_provincia = e.id_provincia;
    console.log('entra al evento de 22222222222222222222222222')
    this.direccionForm.get('iProvincia').setValue(e.nombre);
    console.log('entra al evento de 33333333333333333333333333333333')
    this.listarCanton(this.id_provincia)
    console.log('entra al evento de 44444444444444444444444444444')
    this.direccionForm.addControl('iCanton', new FormControl(null, Validators.required))
    console.log('entra al evento de 55555555555555555555555555555')
    this.direccionForm.get('iCanton').setValue(null);
    console.log('entra al evento de 66666666666666666666666666666666')
    this.id_ciudad = null;
    this.mostrarcanton = true;
    this.mostrarparroquia = false;

  }

  eventoCanton(e) {
    this.mostrarparroquia = true;
    this.id_ciudad = e.id_ciudad;
    this.direccionForm.get('iCanton').setValue(e.nombre);
    this.listarParroquia(this.id_provincia, this.id_ciudad)

    this.direccionForm.addControl('iParroquia', new FormControl(null, Validators.required))
    this.direccionForm.get('iParroquia').setValue(null);
    this.id_parroquia = null;


  }


  eventoParroquia(e) {
    //this.mostrarparroquia = true;
    this.id_parroquia = e.id_parroquia;
    this.direccionForm.get('iParroquia').setValue(e.nombre);
    //this.listarParroquia(this.id_provincia,this.id_ciudad)

    //this.direccionForm.addControl('iParroquia', new FormControl(null, Validators.required))
  }

  open() {

    const modalRef = this.modalService.open(NewManagementComponent, { ariaLabelledBy: 'Ingreso de Gestión', size: 'xl' });
    modalRef.componentInstance.dataModal = { id_empresa: this.id_empresa, id_cuenta: this.id_cuenta, id_persona: this.id_persona, cliente: this.data_cliente };
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('se iceraaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.closeResult)
      this.loadManagement(this.id_empresa, this.id_cuenta, this.id_persona)
      this.loadGestionesBackUp();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log('se iceraaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2222222222222222', this.closeResult)
      this.loadManagement(this.id_empresa, this.id_cuenta, this.id_persona)
      this.loadGestionesBackUp();
    });


  }


  openDetail(gestion) {
    console.log('esta es la gestion que se va a abrir', gestion)
    const modalRef = this.modalService.open(DetailManagementComponent, { ariaLabelledBy: 'Ingreso de Gestión', size: 'xl' });
    modalRef.componentInstance.dataModal = { id_gestion: gestion.id_gestion, id_empresa: this.id_empresa, id_cuenta: this.id_cuenta, data: gestion, cliente: this.data_cliente };

  }

  abrirMapa(content, dir) {
    console.log('esta ses la dirrrrrrrrrrrrrrr', dir)
    this.latitude = parseFloat(dir.latitud);
    this.longitude = parseFloat(dir.longuitud);

    this.lat = this.latitude
    this.lng = this.longitude
    this.markers = [
      {
        lat: this.latitude,
        lng: this.longitude,
        label: 'A',
        draggable: true
      }];




    console.log('esta ses la dirrrrrrrasdasdasdasdasdasdasdasasdasrrrrrrrr', this.latitude)
    console.log('esta ses la dirrrrrrrasdasdasdasdasdasdasdasasdasrrrrrrrr', this.longitude)

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openmap(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.loadDireccionesbackup();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.loadDireccionesbackup();

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  loadManagement(id_empresa, id_cuenta, id_persona) {
    this.formService.loadManagement(id_empresa, id_cuenta, id_persona).then(data => {
      console.log('ESTA ES LA DATAAAA de las gestioneeeeeeeeeeeeees', data)
      this.datasource_gestiones = data.data
      this.totalGestiones = data.data.length;

    });
  }

  loadDetail(id_cuenta, id_empresa) {

    this.formService.loadDetail(id_cuenta, id_empresa).then(data => {
      console.log('ESTA ES LA DATAAAA', data)
      this.dataGeneral = data;
      this.datasource = data.data;
      this.data_cliente = data.dataCliente;
      this.mostrarconyuge=this.data_cliente.conyuge.length==0?false:true;

console.log('esta es la info del conyugeeeeeeeeeeeeeeeeeeee',this.data_cliente.conyuge.length,this.mostrarconyuge)

      this.datasource_dir_cli = data.dataCliente.dirCli
      this.direcciones_cliente = this.datasource_dir_cli
      this.datasource_tel_cli = data.dataCliente.dirTel
      this.telefonos_cliente = this.datasource_tel_cli;
      this.datasource_ref_cli = data.dataCliente.referencia;
      this.referencias_cliente = this.datasource_ref_cli;
      this.totalRecordsref = this.referencias_cliente.length

      console.log('ESTA ES LA CLIENBTEEEEEEEEEEEEEEEEEEEE', this.data_cliente)
      this.totalRecords = data.data.length;
      this.loading = true;
      this.primengConfig.ripple = true;
      console.log('esta es el datasourceeeee', this.datasource)
      this.dividendos = this.datasource.slice(0, 10);
      this.loading = false;

      var option=parseInt(localStorage.getItem('persona'));
      if(!option){
        option=1;
      }
       console.log('esta es la selecion de la personaaaaaaaaaaaaaaaaaaaaaaaaaaaa',option)
       this.seleccionaPerson(option)
       localStorage.removeItem('persona')

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
  evento(e) {
    console.log('INGRESA AL EVENTO:    ', e)
    this.selectedBussines = e.nombre_comercial;
    this.id_empresa = e.id_empresa;
    //this.loadTable(this.id_empresa);


  }



  loadGestiones(event: LazyLoadEvent) {
    console.log('aquiiiiiiiiiiiiiiii maooooooooooooooooooooooooooooo', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_gestiones) {
        console.log('esta es el datasourceeeee maoooooooooooooooooooooooooooooooooo', this.datasource_gestiones)
        this.gestiones_cliente = this.datasource_gestiones.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  loadGestionesBackUp() {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_gestiones) {
        console.log('esta es el datasourceeeee', this.datasource_gestiones)
        this.gestiones_cliente = this.datasource_gestiones.slice(0, 10);
        this.loading = false;
      }
    }, 1000);
  }
  loadDirecciones(event: LazyLoadEvent) {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_dir_cli) {
        console.log('esta es el datasourceeeee', this.datasource_dir_cli)
        this.direcciones_cliente = this.datasource_dir_cli.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  loadReferencias(event: LazyLoadEvent) {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_ref_cli) {
        console.log('esta es el datasourceeeee', this.datasource_ref_cli)
        this.referencias_cliente = this.datasource_ref_cli.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  loadDirecciones2(event: LazyLoadEvent) {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_history_dir) {
        console.log('esta es el datasourceeeee', this.datasource_history_dir)
        this.history_dir = this.datasource_history_dir.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
  loadDireccionesbackup() {
    console.log('aquiiiiiiiiiiiiiiii',)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_dir_cli) {
        console.log('esta es el datasourceeeee', this.datasource_dir_cli)
        this.direcciones_cliente = this.datasource_dir_cli.slice(0, 10);
        this.loading = false;
      }
    }, 1000);
  }

  loadTelefonos(event: LazyLoadEvent) {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_tel_cli) {
        console.log('esta es el datasourceeeee', this.datasource_tel_cli)
        this.telefonos_cliente = this.datasource_tel_cli.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }
  loadTelefonosbackup() {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource_tel_cli) {
        console.log('esta es el datasourceeeee', this.datasource_tel_cli)
        this.telefonos_cliente = this.datasource_tel_cli.slice(0, 10);
        this.loading = false;
      }
    }, 1000);
  }
  loadDividendos(event: LazyLoadEvent) {
    console.log('aquiiiiiiiiiiiiiiii', event)
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        console.log('esta es el datasourceeeee', this.datasource)
        this.dividendos = this.datasource.slice(event.first, (event.first + event.rows));
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

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event) {
 /*    console.log('ESTE ES EL EVEEEEEEEEEEEEEEENTO:::   ', $event)
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    }); */
  }

  markerDragEnd(m: Marker, e) {
    console.log('dragEnd maooooooo', e.coords);
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
  }

  seleccionaPerson(option) {
    console.log('La opcion es: ', option)
    localStorage.setItem('persona',option);
    switch (option) {
      case 1:
        this.data_cliente = this.dataGeneral.dataCliente;
        this.datasource_dir_cli = this.dataGeneral.dataCliente.dirCli
        this.datasource_tel_cli = this.dataGeneral.dataCliente.dirTel
        console.log('las direcciones son:', this.datasource_dir_cli)
        console.log('los telefonos son:', this.datasource_tel_cli)
        this.loadDireccionesbackup();
        this.loadTelefonosbackup();

        break;
      case 2:
        
        this.data_cliente = this.dataGeneral.dataCliente.conyuge[0];
        if(this.data_cliente){
        this.datasource_dir_cli = this.data_cliente.dirCon
        this.datasource_tel_cli = this.data_cliente.telCon
        console.log('las direcciones son:', this.datasource_dir_cli)
        console.log('los telefonos son:', this.datasource_tel_cli)
        this.loadDireccionesbackup();
        this.loadTelefonosbackup();
        }
        break;
      case 3:
        this.data_cliente = this.dataGeneral.dataCliente.garante[0];
        this.datasource_dir_cli = this.data_cliente.dirGar
        this.datasource_tel_cli = this.data_cliente.telGar
        console.log('las direcciones son:', this.datasource_dir_cli)
        console.log('los telefonos son:', this.datasource_tel_cli)
        this.loadDireccionesbackup();
        this.loadTelefonosbackup();
        break;
      case 4:
        this.data_cliente = this.dataGeneral.dataCliente.garante[1];
        this.datasource_dir_cli = this.data_cliente.dirGar
        this.datasource_tel_cli = this.data_cliente.telGar
        console.log('las direcciones son:', this.datasource_dir_cli)
        console.log('los telefonos son:', this.datasource_tel_cli)
        this.loadDireccionesbackup();
        this.loadTelefonosbackup();
        break;
      default:
        break;
    }
  }
  seleccionar(option) {
    console.log('La opcion es: ', option)
    switch (option) {
      case 1:
        this.telefono = '09604700557';
        this.lat = -5.8686147195603477;
        this.lng = -79.98254562397541;
        this.markers = [
          {
            lat: -5.8686147195603477,
            lng: -79.98254562397541,
            label: 'A',
            draggable: true
          }];
        break;
      case 2:
        this.telefono = '0979748972'
        this.lat = -2.8686147195603477;
        this.lng = -78.98254562397541;
        this.markers = [
          {
            lat: -2.8686147195603477,
            lng: -78.98254562397541,
            label: 'A',
            draggable: true
          }];
        break;
      case 3:
        this.telefono = '0979008808748972'
        break;

      default:
        break;
    }
  }
  return() {
    this.router.navigate(['/default/forms/account-list/' + this.id_empresa])
  }

  editartel(content, dir) {
    
    console.log('esta es la dirrrrrrrrrrr', dir)
    this.id_persona_telefono = dir.id_persona_telefono;
    this.id_tipo_telefono = dir.id_tipo_telefono
    this.telefonoForm.get('numero').setValue(dir.numero);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('se cieraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.closeResult)



    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  editar(content, dir) {
   
   
    this.mostrartrabajo = false;
    this.direccionForm.removeControl('empresa');


    if (dir.id_tipo_direccion == 'EMAIL') {
      this.mostraremail = true;
      this.mostrargeneral = false;
      //this.direccionForm.removeControl('')
      this.direccionForm.removeControl('iProvincia');
      this.direccionForm.removeControl('callep');
      this.direccionForm.removeControl('callesec');
      this.direccionForm.removeControl('ncasa');
      this.direccionForm.removeControl('referencia');
      this.direccionForm.removeControl('iCanton');
      this.direccionForm.removeControl('iParroquia');



      this.direccionForm.addControl('mail', new FormControl(null, [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]))
    } else {

      this.direccionForm.addControl('iProvincia', new FormControl(null, Validators.required))
      this.direccionForm.addControl('callep', new FormControl(null, Validators.required))
      this.direccionForm.addControl('callesec', new FormControl(null, Validators.required))
      this.direccionForm.addControl('ncasa', new FormControl(null, Validators.required))
      this.direccionForm.addControl('referencia', new FormControl(null, Validators.required))



      this.direccionForm.removeControl('mail');

      this.mostrargeneral = true;
      if (dir.id_tipo_direccion == 'TRA') {
        this.mostrartrabajo = true;
        this.direccionForm.addControl('empresa', new FormControl(null, Validators.required))

      }
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('se cieraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.closeResult)
      this.mostrargeneral = false;
     

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.mostrargeneral = false;
      this.mostrartrabajo = false;
      this.mostraremail = false;
     
    });
    console.log('esta es la direccion que se va a editar', dir)
    this.loadInfo(dir);
  }

  onSubmitForm2() {
    this.telefonoForm.get('tipoTel').setValue(this.id_tipo_telefono)
    if (this.telefonoForm.valid) {
      var dataguardar = {
        id_persona_telefono: this.id_persona_telefono,
        id_persona: this.data_cliente.id_persona,
        id_tipo_telefono: this.id_tipo_telefono,
        numero: this.telefonoForm.get('numero') == undefined ? '' : this.telefonoForm.get('numero').value,
      }

      this.formService.editTel(dataguardar).subscribe(resp => {
        this.modalService.dismissAll('OK')


        Swal.fire({
          title: 'OK',
          text: 'se ha editado correctamente el teléfono',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.ngOnInit();

      }, err => {
        this.disableSave = true;
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
        icon: 'warning',
        title: 'Oops...',
        text: 'Todos los campos son requeridos',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
    }
  }

  onSubmitForm() {
    console.log('entra en el submit form', this.data_cliente)
    if (this.direccionForm.valid) {


      var dataguardar = {
        id_tipo_direccion: this.id_tipo_direccion,
        id_persona: this.data_cliente.id_persona,
        id_pais: 'ECU',
        id_provincia: this.id_provincia,
        id_ciudad: this.id_ciudad,
        calle_principal: this.direccionForm.get('callep') == undefined ? '' : this.direccionForm.get('callep').value,
        calle_secundaria: this.direccionForm.get('callesec') == undefined ? '' : this.direccionForm.get('callesec').value,
        nro_casa: this.direccionForm.get('ncasa') == undefined ? '' : this.direccionForm.get('ncasa').value,
        referencia: this.direccionForm.get('referencia') == undefined ? '' : this.direccionForm.get('referencia').value,
        latitud: this.latitude,
        longuitud: this.longitude,
        empresa: '',
        id_parroquia: this.id_parroquia,
        id_persona_direccion: this.id_persona_direccion,
        email: this.direccionForm.get('mail') == undefined ? '' : this.direccionForm.get('mail').value



      }
      console.log('esta es la data que se va a guardaaaaaaaaar', dataguardar);
      this.formService.editDir(dataguardar).subscribe(resp => {
        this.modalService.dismissAll('OK')

        this.loading = false;
        this.disableSave = true;
        Swal.fire({
          title: 'Ok',
          text: 'Se ha editado la dirección correctamente ',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.ngOnInit();
      }, err => {
        this.disableSave = true;
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
        icon: 'warning',
        title: 'Oops...',
        text: 'Todos los campos son requeridos',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
    }
  }

  loadInfo(e) {
    var prov = { id_provincia: e.id_provincia, nombre: e.provincia }
    var ciudad = { id_ciudad: e.id_ciudad, nombre: e.ciudad }
    var parroquia = { id_parroquia: e.id_parroquia, nombre: e.parroquia }

    if (this.mostrargeneral) {
      this.eventoProvincia(prov);
      this.eventoCanton(ciudad);
      this.eventoParroquia(parroquia);
      this.direccionForm.get('callep').setValue(e.calle_principal);
      this.direccionForm.get('callesec').setValue(e.calle_secundaria);
      this.direccionForm.get('ncasa').setValue(e.nro_casa);
      this.direccionForm.get('referencia').setValue(e.referencia);
      this.latitude = e.latitud;
      this.longitude = e.longuitud;
      this.id_tipo_direccion = e.id_tipo_direccion,
        this.id_persona_direccion = e.id_persona_direccion
    } else {
      this.latitude = e.latitud;
      this.longitude = e.longuitud;
      this.id_tipo_direccion = e.id_tipo_direccion,
        this.id_persona_direccion = e.id_persona_direccion
      this.direccionForm.get('mail').setValue(e.email);
    }


    console.log('STA ES LA LATITUSDDDDDDDDDDDDDDDDDDDDD', e.latitud)
    console.log('STA ES LA LATITUSDDDDDDDDDDDDDDDDDDDDD', e.latitud)

    this.latitude = parseFloat(e.latitud);
    this.longitude = parseFloat(e.longuitud);
    this.lat = this.latitude
    this.lng = this.longitude
    this.markers = [
      {
        lat: this.latitude,
        lng: this.longitude,
        label: 'A',
        draggable: true
      }];

  }


  historial(content, b) {

    console.log('esta es la dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', b.id_tipo_direccion, this.data_cliente.id_persona, b.id_persona_direccion)
    console.log('esta es la dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.data_cliente.id_persona)

    console.log('esta es la dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', b.id_persona_direccion)

    this.formService.getHistoryDir(b.id_tipo_direccion, this.data_cliente.id_persona, b.id_persona_direccion).then(data => {
      console.log('LISTA DE historial', data)
      this.history_dir = data.historial;
      this.datasource_history_dir = this.history_dir;
      this.totalRecords2 = data.historial.length;
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  nuevaDir(content) {

    this.lat= parseFloat(localStorage.getItem('lat'));
    this.lng=parseFloat(localStorage.getItem('lon'));
    
    this.direccionForm.markAllAsTouched();
    this.direccionForm.removeControl('iProvincia');
    this.direccionForm.removeControl('callep');
    this.direccionForm.removeControl('callesec');
    this.direccionForm.removeControl('ncasa');
    this.direccionForm.removeControl('referencia');
    this.direccionForm.removeControl('iCanton');
    this.direccionForm.removeControl('iParroquia');
    this.id_provincia = null;
    this.id_ciudad = null;
    this.id_parroquia = null;
    this.direccionForm.addControl('tipoDir', new FormControl(null, Validators.required))

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('se cieraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.closeResult)
      this.mostrargeneral = false;
      this.mostrartrabajo = false;
      this.mostraremail = false;

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.mostrargeneral = false;
      this.mostrartrabajo = false;
      this.mostraremail = false;
    });

  }


  nuevoTel(content) {
    this.id_provincia = null;
    this.id_ciudad = null;
    this.id_parroquia = null;

    this.direccionForm.addControl('tipoDir', new FormControl(null, Validators.required))

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('se cieraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.closeResult)

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }



  nuevaRef(content) {
    this.id_provincia = null;
    this.id_ciudad = null;
    this.id_parroquia = null;


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log('se cieraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', this.closeResult)

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  saveRef() {

    if (this.refForm.valid) {
      var dataguardar = {
        id_persona: this.data_cliente.id_persona,
        nombre: this.refForm.get('nombre') == undefined ? '' : this.refForm.get('nombre').value,
        apellido: '',
        numero: this.refForm.get('numero') == undefined ? '' : this.refForm.get('numero').value,
      }

      this.formService.saveRef(dataguardar).subscribe(resp => {
        this.modalService.dismissAll('OK')


        Swal.fire({
          title: 'OK',
          text: 'Se ha creado correctamente la referencia',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.ngOnInit();

      }, err => {
        this.disableSave = true;
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
        icon: 'warning',
        title: 'Oops...',
        text: 'Todos los campos son requeridos',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
    }


  }

  saVeTel() {
  

    if (this.telefonoForm.valid) {
      var dataguardar = {
        id_persona_telefono: this.id_persona_telefono,
        id_persona: this.data_cliente.id_persona,
        id_tipo_telefono: this.id_tipo_telefono,
        numero: this.telefonoForm.get('numero') == undefined ? '' : this.telefonoForm.get('numero').value,
      }

      this.formService.saveTel(dataguardar).subscribe(resp => {
        this.modalService.dismissAll('OK')


        Swal.fire({
          title: 'OK',
          text: 'Se ha creado correctamente el teléfono',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.ngOnInit();

      }, err => {
        this.disableSave = true;
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
        icon: 'warning',
        title: 'Oops...',
        text: 'Todos los campos son requeridos',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
    }

  }
  SaveDir() {

    console.log('entra en el submit form', this.data_cliente)
    if (this.direccionForm.valid) {


      var dataguardar = {
        id_tipo_direccion: this.id_tipo_direccion,
        id_persona: this.data_cliente.id_persona,
        id_pais: 'ECU',
        id_provincia: this.id_provincia,
        id_ciudad: this.id_ciudad,
        calle_principal: this.direccionForm.get('callep') == undefined ? '' : this.direccionForm.get('callep').value,
        calle_secundaria: this.direccionForm.get('callesec') == undefined ? '' : this.direccionForm.get('callesec').value,
        nro_casa: this.direccionForm.get('ncasa') == undefined ? '' : this.direccionForm.get('ncasa').value,
        referencia: this.direccionForm.get('referencia') == undefined ? '' : this.direccionForm.get('referencia').value,
        latitud: this.latitude,
        longuitud: this.longitude,
        empresa: '',
        id_parroquia: this.id_parroquia,
        id_persona_direccion: this.id_persona_direccion,
        email: this.direccionForm.get('mail') == undefined ? '' : this.direccionForm.get('mail').value



      }
      console.log('esta es la data que se va a guardaaaaaaaaar', dataguardar);
      this.formService.saveDir(dataguardar).subscribe(resp => {
        this.modalService.dismissAll('OK')

        this.loading = false;
        this.disableSave = true;
        Swal.fire({
          title: 'Ok',
          text: 'Se ha creado la dirección correctamente ',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.ngOnInit();
      }, err => {
        this.disableSave = true;
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
        icon: 'warning',
        title: 'Oops...',
        text: 'Todos los campos son requeridos',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
    }
  }
}
