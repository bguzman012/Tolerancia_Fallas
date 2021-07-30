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
import { catchError, finalize } from 'rxjs/operators';
import { InvokeMethodExpr } from '@angular/compiler';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '@app/location.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-new-management',
  templateUrl: './new-management.component.html',
  styleUrls: ['./new-management.component.scss']
})
export class NewManagementComponent implements OnInit {
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
  currentDate: Date = new Date();


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
  observacionLlamada: string = '';
  llamada: boolean = false;
  dateFinal: string;
  tipogestion: any = '';
  tiposolucion: any = '';
  montosolucion: any;
  responde: any = '';
  mostrarFecha: boolean = false;
  mostrarValor: boolean = false;
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
  urlFiles: any = [];
  id_compania: any;
  listPorcentajes: any[] = ['0%', '0%']
  loading: boolean = false;
  emailCliente: any;
  listFormasPago: any = [];
  mostarFormaPago: boolean = false;
  selectedFormaPago: string;
  newf: string;
  latitude: any;
  longitude: any;
  html: SafeHtml;
  newf2: string;
  constructor(private datePipe: DatePipe,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private router: Router,
    public activeModal: NgbActiveModal,
    public locationService: LocationService,
    private sanitizer: DomSanitizer
  ) {


  }

  ngOnInit(): void {


    this.latitude = localStorage.getItem('lat');
    this.longitude = localStorage.getItem('lon');

    // let location = this.getLocation();
    this.loading = false;
    this.id_compania = JSON.parse(localStorage.getItem('company')).id_compania
    console.log('este es el id de la companiaaaa:', this.id_compania)
    this.initEmail();
    // Example starter JavaScript for disabling form submissions if there are invalid fields
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

    var date = new Date();
    this.dateFinal = this.datePipe.transform(date, "dd-MM-yyyy");
    this.initform();
    this.loadSelectsGestion();
  }
  getLocation() {
    //  this.locationService.handlePermission();
    /* this.locationService.getPosition().then(pos => {
     this.latitude = pos.lat;
     this.longitude = pos.lng;
   });  */
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
if(this.dataModal.cliente.dirCli!=undefined){
    this.emailCliente = this.dataModal.cliente.dirCli[2] != undefined ? this.dataModal.cliente.dirCli[2].calle_principal : this.dataModal.cliente.dirCli[2];
}
    console.log('EMAIL DEL CLIENTE', this.dataModal.cliente)
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
      this.listFormasPago = data.formapago;

    });
  }
  eventoSolucion(e) {
    this.mostrarFecha = false;
    this.mostrarValor = false;
    this.mostarFormaPago = false;
    console.log('INGRESA AL EVENTO solucion:    ', e)
    this.selectedSolucion = e.nombre;
    this.tiposolucion = e.id_tipo_solucion;
    this.gestionForm.removeControl('monto');
    this.gestionForm.removeControl('fechaCompromiso');
    this.gestionForm.get('iSolucion').setValue(e.nombre);
    this.gestionForm.removeControl('formaPago')
    this.gestionForm.removeControl('nro_recibo')
    switch (e.id_tipo_solucion) {

      case 'ADP':
        this.mostrarFecha = true;
        this.mostrarValor = true;
        this.gestionForm.addControl('monto', new FormControl(null, Validators.required))
        this.gestionForm.addControl('fechaCompromiso', new FormControl(null, Validators.required))
        break;
      case 'COB':
        this.gestionForm.addControl('formaPago', new FormControl(null, Validators.required))
        this.gestionForm.removeControl('fechaCompromiso');
        this.gestionForm.addControl('monto', new FormControl(null, Validators.required))
        this.gestionForm.addControl('nro_recibo', new FormControl(null, Validators.required))
        this.mostrarValor = true;
        this.mostarFormaPago = true;
        break;
      default:
        this.mostrarFecha = false;
        this.mostrarValor = false;
        this.mostarFormaPago = false;
        this.gestionForm.removeControl('monto');

        break;
    }
  }
  eventoFormaPago(e) {
    this.selectedFormaPago = e.nombre
    this.gestionForm.get('formaPago').setValue(e.nombre);
    this.id_forma_pago = e.id_forma_pago;


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
        const dirEmail = this.emailCliente
        const asuntoEmail = 'ADVERTENCIA'
        const messageEmail = 'Hola,\n' +
          'Este es un mensaje de prueba!\n'
        this.gestionForm.removeControl('observacion')

        this.gestionForm.addControl('subject', new FormControl(asuntoEmail, Validators.required))
        //this.gestionForm.addControl('message', new FormControl(messageEmail, Validators.required))
        this.gestionForm.addControl('email', new FormControl(dirEmail, Validators.required))
        this.gestionForm.addControl('fechaPago', new FormControl(dirEmail, Validators.required))

        this.gestionForm.addControl('montoPago', new FormControl(null, Validators.required))



        this.createComposeForm();


        this.esElectronica = true;
        break;

      case "ESC":
        this.mostarSolucion = true;
        this.gestionForm.addControl('iSolucion', new FormControl(null, Validators.required))
        break;

      default:
        this.mostarSolucion = true;
        break;
    }
  }

  async onSubmitForm() {







    if (this.gestionForm.valid) {


      this.loading = true;
      if (this.gestionForm.get('fechaCompromiso') != undefined) {
        var d = new Date(this.gestionForm.get('fechaCompromiso').value);

        if (d < this.currentDate) {
          Swal.fire({
            title: 'UPS!!!',
            text: 'La fecha no puede ser menor a la actual   ',
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
          this.loading = false;
          return;
        }

        var dt = d.getDate() + 1;
        var mn = d.getMonth();
        mn++;
        var yy = d.getFullYear();
        this.newf = dt + "/" + mn + "/" + yy

      }


      if (this.gestionForm.get('fechaPago') != undefined) {
        var d = new Date(this.gestionForm.get('fechaPago').value);

        if (d < this.currentDate) {
          Swal.fire({
            title: 'UPS!!!',
            text: 'La fecha no puede ser menor a la actual   ',
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
          this.loading = false;
          return;
        }

        var dt = d.getDate() + 1;
        var mn = d.getMonth();
        mn++;
        var yy = d.getFullYear();
        this.newf2 = dt + "/" + mn + "/" + yy

      }


      if (this.gestionForm.get('montoPago') != undefined &&this.gestionForm.get('montoPago').value==0 ) {
        Swal.fire({
          title: 'UPS!!!',
          text: 'El monto no puede ser cero   ',
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
        this.loading = false;
        return;
      }




      await this.saveImages().then(value => {
        console.log(`promise result: ${value}`);
        console.log('ESTE ES EL ARRAY DE IMAGENES ANTES DE GUARDARRRR', value)
        var dataguardar = { 
          id_empresa: this.id_empresa,
          id_cuenta: this.id_cuenta,
          id_persona: this.id_persona,
          id_tipo_gestion: this.tipogestion,
          id_tipo_solucion: this.tiposolucion,
          monto_solucion: this.gestionForm.get('monto') == undefined ? 0 : this.gestionForm.get('monto').value,
          fecha_compromiso: this.newf,
          observacion: this.gestionForm.get('observacion') == undefined ? '' : this.gestionForm.get('observacion').value,
          responde: this.responde,
          localizado: this.localizado,
          latitud: this.latitude,
          longuitud: this.longitude,
          id_forma_pago: this.id_forma_pago,
          detalle: this.urlFiles,
          dirEmail: this.gestionForm.get('email') == undefined ? '' : this.gestionForm.get('email').value,
          asuntoEmail: this.gestionForm.get('subject') == undefined ? '' : this.gestionForm.get('subject').value,
          messageEmail: '', /* this.gestionForm.get('message') == undefined ? '' : this.gestionForm.get('message').value, */
          id_compania: this.id_compania,
          nro_recibo: this.gestionForm.get('nro_recibo') == undefined ? '' : this.gestionForm.get('nro_recibo').value,
          beneficiario: this.dataModal.cliente.nombre + ' ' + this.dataModal.cliente.apellido,
          fecha_pago: this.newf2,
          monto:this.gestionForm.get('montoPago') == undefined ? 0 : this.gestionForm.get('montoPago').value,
        }


        console.log('esta es la data que se va a guardar&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', dataguardar);
        this.formService.saveGestion3(dataguardar).subscribe(resp => {
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
          this.disableSave = true;
          this.activeModal.close();
          console.log('GUARDOOOOOO');


        }, err => {
        });
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


    /* this.formService.saveGestion3(dataguardar).subscribe(resp => {
      console.log('GUARDOOOOOO')
    }, err => {
    }); */
  }






  async saveImages() {


    return new Promise(resolve => {
      var nfiles: number = this.files.length;
      var contador: number = 1;
      var indice: number = 0;
      console.log('este es el numero de files', nfiles);
      if (nfiles == 0) {
        resolve(true);
      }
      for (const droppedFile of this.files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {

            console.log(droppedFile.relativePath, file);
            this.filename = droppedFile.relativePath;
            this.pushFileToStorage(file, indice).then(
              arrayli => {
                console.log('ESTO ES LO QUE ME DEVUELVE', arrayli)

                console.log('dataaaaaaaa:   ', nfiles, contador)
                if (contador == nfiles) {
                  console.log('ya son iguales')
                  setTimeout(() => {
                    resolve(true);
                  }, 2000);


                } else {
                  contador++;
                }
              },
              error => {
                console.log(error);
              }
            );
            indice++;
          });
        } else {
          const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          console.log(droppedFile.relativePath, fileEntry);
        }


      }

    });





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



  pushFileToStorage(fileUpload: File, index) {

    console.log('EL INDEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', index)

    return new Promise(resolve => {
      const filePath = `${this.basePath}/${fileUpload.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload);

      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log('esta es la ruta del archivo', downloadURL)
            this.urlFiles.push({ path: downloadURL })
            console.log('esta es el arrayyyyyy', this.urlFiles)
          });
        })
      ).subscribe();
      console.log('este es el porcentaje:', uploadTask.percentageChanges())
      uploadTask.percentageChanges().subscribe(res => {
        console.log('este es el porcentaje maoooooooooooooooooooooooooooooooooooooooooooo:', res)
        this.listPorcentajes[index] = res + '%';
        if (res == 100) {
          resolve(this.urlFiles)
        }
      });

    })
  }


  closeModal(e){
    this.activeModal.dismiss()
      }

}


