import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/forms.service';
import Swal from "sweetalert2";
import { Observable, Subscription } from 'rxjs';
import { GxHelper } from '@gaxon/helpers';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { catchError, finalize, first } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-detail-management',
  templateUrl: './detail-management.component.html',
  styleUrls: ['./detail-management.component.scss']
})
export class DetailManagementComponent implements OnInit {
  public type: string = 'component';
  arrayBuffer: any;
  selectedBussines: string;
  disableFile: boolean = true;

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



  composeMail: any;
  minimized = false;
  composeMailForm: FormGroup;
  onComposeMailClicked: Subscription;

  @Input() dataModal;
  gestionForm: FormGroup;
  selectedSolucion: string;
  selectedLocalizado: string;
  selectedTipoGestion: string;
  listSolucion: any;
  dateF: Date;
  listTipoGestion: any = [];
  listTipoDir: any = [];

  observacionLlamada: string = '';
  llamada: boolean = false;
  dateFinal: string;
  tipogestion: any = '';
  tiposolucion: any = '';
  montosolucion: any;
  responde: any = '';
  mostrarFecha: boolean = false;
  selectedResponde: string;
  id_empresa: any;
  id_cuenta: any;
  id_persona: any;
  esPrecencial: boolean = false;
  mostarSolucion: boolean = false;
  esElectronica: boolean;
  isOperatorEmpty: boolean;
  remainingText: number = 0;
  disableSave: boolean = false;
  localizado: any = '';
  nro_recibo: any = '';
  id_forma_pago: any = '';
  listaFotos: any = [];
  filename: string;
  percentage: number;
  urlFiles: any=[];
  id_compania: any;
  listPorcentajes:any[]=['0%','0%']
  loading:boolean=false;
  listafotos: any=[];
  emailCliente: any;
  mostrarfotos: boolean=false;
  mostrarmail: boolean=false;


  urlMapa: string = '';
  // google maps zoom level
  zoom: number = 15;

  // initial center position for the map
  lat: number = -2.8686147195603477;
  lng: number = -78.98254562397541;
  isNew: boolean = false;

  markers: Marker[] = [
    {
      lat: -2.8686147195603477,
      lng: -78.98254562397541,
      label: 'A',
      draggable: true
    },

  ];
  html: SafeHtml;

  constructor(private datePipe: DatePipe,
    private formService: FormService,

    private formBuilder: FormBuilder ,
    private sanitizer: DomSanitizer,
    public activeModal: NgbActiveModal
    ) {


  }
  template:any;
  ngOnInit(): void {
    this.template = ``;


    this.loading=false;
    this.id_compania=JSON.parse(localStorage.getItem('company')).id_compania
    
    console.log('LA INFO QUE VIENE EN EL  M,ODAAAAAAAALALLLLL',this.dataModal)
    this.emailCliente=this.dataModal.cliente.dirCli[2]!=undefined?this.dataModal.cliente.dirCli[2].calle_principal:this.dataModal.cliente.dirCli[2];
    this.lat= parseFloat(this.dataModal.data.latitud?this.dataModal.data.latitud:'0'),
        this.lng= parseFloat(this.dataModal.data.longuitud?this.dataModal.data.longuitud:'0'),
    this.markers = [
      {
        lat: this.dataModal.data.latitud?this.dataModal.data.latitud:'0',
        lng: this.dataModal.data.longuitud?this.dataModal.data.longuitud:'0',
        label: 'A',
        draggable: false
      },
  
    ];
    this.getDetail(this.dataModal.id_gestion,this.dataModal.id_empresa,this.dataModal.id_cuenta);
  


          }
  getDetail(id_gestion,id_empresa,id_cuenta){
    
    this.formService.getDetailManagement(id_gestion,id_empresa,id_cuenta).pipe(first())
    .subscribe(
        data => {
           console.log('esta es la dataaaaaa///////////////////////////////7///:   ',data)
           var dat=data;
           

           this.listafotos=data;
           if(this.listafotos.foto.email>0){
           this.template=this.listafotos.email[0].mensaje;
 }else{
  this.template=''
 }
           this.html = this.sanitizer.bypassSecurityTrustHtml(this.template);
           console.log('esta es la lista de fotooooooooooooooooooooooooooooooooooooooooooooos:::::::::::',this.listafotos.foto.length)
           if(this.listafotos.foto.length>0){
        this.mostrarfotos=true;
           }
           if(this.listafotos.email.length>0){
            this.mostrarmail=true;
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
  valueChange(value) {
    this.remainingText = 1000 - value;
  }

  initEmail() {
    this.composeMailForm = this.createComposeForm();


  }
  createComposeForm() {
    const subject = 'subject';
    const message = 'Hi Mate,\n' +
      'Sorry for the delay in response!\n' +
      'I’m afraid, I won’t be able to join you in the conference call. I have to take my\n' +
      'daughter for her game. I hope that is ok.\n' +
      '\n' +
      'Cheers!\n' +
      'Dom';

    const toUsers = new FormArray([]);

    toUsers.push(
      new FormGroup({
        name: new FormControl(null),
        email: new FormControl(null, Validators.required)
      })
    );

    return this.formBuilder.group({
      subject: new FormControl(subject, Validators.required),
      message: new FormControl(message, Validators.required),
      to: toUsers
    });
  }


  initform() {
    this.id_empresa = this.dataModal.id_empresa;
    this.id_cuenta = this.dataModal.id_cuenta;
    this.id_persona = this.dataModal.id_persona;
    this.gestionForm = new FormGroup({
      iTipoGestion: new FormControl(null, Validators.required)
    })
    this.gestionForm.addControl('observacion', new FormControl(null, Validators.required));

  }

  loadSelectsGestion() {
    this.formService.loadSelectsGestion().then(data => {
      console.log('select de las gestionesssssss', data)
      this.listTipoGestion = data.gestion
      this.listSolucion = data.solucion;

    });
  }
  eventoSolucion(e) {
    console.log('INGRESA AL EVENTO solucion:    ', e)
    this.selectedSolucion = e.nombre;
    this.tiposolucion = e.id_tipo_solucion;
    this.gestionForm.removeControl('monto');
    this.gestionForm.removeControl('fechaCompromiso');
    this.gestionForm.get('iSolucion').setValue(e.nombre);
    switch (e.id_tipo_solucion) {

      case 'ADP':
        this.mostrarFecha = true;
        this.gestionForm.addControl('monto', new FormControl(null, Validators.required))
        this.gestionForm.addControl('fechaCompromiso', new FormControl(null, Validators.required))
        break;

      default:
        this.mostrarFecha = false;
        this.gestionForm.removeControl('monto');

        break;
    }
  }
  eventoLlamada(e) {
    console.log('entra en el evento', e)
    this.responde = e;
    this.gestionForm.removeControl('iSolucion');

    if (e == '1') {
      this.selectedResponde = 'SI'
      this.gestionForm.get('iResponde').setValue('SI')
      this.gestionForm.addControl('iSolucion', new FormControl(null, Validators.required))

      this.mostarSolucion = true;
    } else {
      this.selectedResponde = 'NO'
      this.gestionForm.get('iResponde').setValue('NO')
      this.selectedSolucion = null;
      this.tiposolucion = '';
      this.mostarSolucion = false;

    }
  }
  eventoLocalizado(e) {
    console.log('entra en el evento localizado', e)
    this.localizado = e;


    this.gestionForm.removeControl('iSolucion');

    if (e == '1') {
      this.selectedLocalizado = 'SI';
      this.gestionForm.addControl('iSolucion', new FormControl(null, Validators.required))

      this.mostarSolucion = true;

    } else {
      this.selectedLocalizado = 'NO'

      this.selectedSolucion = null;
      this.tiposolucion = '';
      this.mostarSolucion = false;

    }
    this.gestionForm.get('iLocalizado').setValue(this.selectedLocalizado)
  }

  eventotipogestion(e) {
    this.esElectronica = false;

    this.mostarSolucion = false;
    this.selectedSolucion = null;
    this.tiposolucion = '';
    this.selectedTipoGestion = e.nombre;
    this.gestionForm.get('iTipoGestion').setValue(e.nombre);
    this.tipogestion = e.id_tipo_gestion;
    console.log('este es el evento de tipo de gestion', e)
    this.selectedResponde = null;
    this.selectedLocalizado = null;
    this.llamada = false;
    this.esPrecencial = false;
    this.esElectronica = false;

    this.gestionForm.addControl('observacion', new FormControl(null, Validators.required))
    this.gestionForm.get('observacion').setValue('')



    this.gestionForm.removeControl('iResponde')
    this.gestionForm.removeControl('iLocalizado')


    switch (e.id_tipo_gestion) {
      case 'TEL':
        this.gestionForm.addControl('iResponde', new FormControl(null, Validators.required))
        this.llamada = true;
        break;

      case 'PRE':
        this.gestionForm.addControl('iLocalizado', new FormControl(null, Validators.required))
        this.esPrecencial = true;
        break;
      case 'ELE':
        const dirEmail = 'maoteneg@gmail.com'
        const asuntoEmail = 'ADVERTENCIA'
        const messageEmail = 'Hola,\n' +
          'Este es un mensaje de prueba!\n'
        this.gestionForm.removeControl('observacion')

        this.gestionForm.addControl('subject', new FormControl(asuntoEmail, Validators.required))
        this.gestionForm.addControl('message', new FormControl(messageEmail, Validators.required))
        this.gestionForm.addControl('email', new FormControl(dirEmail, Validators.required))


        this.createComposeForm();


        this.esElectronica = true;
        break;

      default:
        this.mostarSolucion = true;
        break;
    }
  }

 
 






  /* CARGA DE ARCHIVOOOOOOOOOOOOOOOOOOOOOOOOOOOO */

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;

    console.log('este es el nombre del archivo::::::::::::::::', files)

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



  private basePath = '/uploads';


  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    console.log('ESTE ES EL EVEEEEEEEEEEEEEEENTO:::   ', $event)
    /*   this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      }); */
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  closeModal(e){
this.activeModal.dismiss()
  }
}


