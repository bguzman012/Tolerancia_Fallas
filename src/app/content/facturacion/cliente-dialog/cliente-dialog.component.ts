import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { ServicesUsers } from '../services/service-usuarios.service';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit {
  @Input() dataModal;
  personForm: FormGroup;
  closeResult: string;
  tipos: any[] = []
  dataInicial: any;
  guardar: boolean
  id_tipo_documento: any;
  nombreTipo: any
  users: any[] = []
  validador: boolean = true;
  validador_correo: boolean = true;

  validador_telefono: boolean = true;
  loading: boolean
  disableSave: boolean;
  id_persona: any;
  editar: boolean

  constructor(public activeModal: NgbActiveModal, private userService: ServicesUsers) { }

  ngOnInit(): void {
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
    this.dataInicial = this.dataModal.data;
    this.listarTipos()
    this.initForm()
    this.chargeData()

  }
  chargeData() {

    if (this.dataInicial) {
      this.editar = true
      this.personForm.get('iNombre').setValue(this.dataInicial.nombre)
      this.personForm.get('iApellido').setValue(this.dataInicial.apellido)
      this.personForm.get('iCorreo').setValue(this.dataInicial.email)
      this.personForm.get('iTelefono').setValue(this.dataInicial.numero)
      this.personForm.get('iDocumento').setValue(this.dataInicial.identificacion)
      this.personForm.get('iDireccion').setValue(this.dataInicial.direccion)
      this.personForm.get('iTipoDocumento').setValue(this.dataInicial.nombre_identificacion)
      this.id_persona = this.dataInicial.id
      this.id_tipo_documento = this.dataInicial.id_tipo_identificacion
      this.nombreTipo = this.personForm.get('iTipoDocumento').value
      console.log(this.dataInicial)
    } else {
      this.editar = false
    }

  }
  close() {
    this.activeModal.dismiss();
  }
  initForm() {

    this.personForm = new FormGroup({
      iNombre: new FormControl(null, Validators.required),
      iApellido: new FormControl(null, Validators.required),
      iCorreo: new FormControl(null, Validators.required),
      iTelefono: new FormControl(null),
      iTipoDocumento: new FormControl(null, Validators.required),
      iDocumento: new FormControl(null, Validators.required),
      iDireccion: new FormControl(null)

    })


  }

  listarTipos() {
    this.userService.getIdentificacion().then(data => {
      this.tipos = data.identificacion;

    })
  }

  validarCorreo() {
    if (this.personForm.get('iCorreo').value) {

      let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      //Se muestra un texto a modo de ejemplo, luego va a ser un icono
      if (emailRegex.test(this.personForm.get('iCorreo').value)) {
        this.validador_correo = true
        console.log("Siiuuuu")
      } else {
        this.validador_correo = false
        console.log("Nooou")
      }
    }
  }

  validarNumeroTelefonico() {
    var valoresAceptados = /^[0-9]+$/;
    if (this.personForm.get('iTelefono').value) {
      if (valoresAceptados.test(this.personForm.get('iTelefono').value)) {
        this.validador_telefono = true
      } else {
        this.validador_telefono = false
      }
    } else {
      this.validador_telefono = true
    }
  }

  savePerson() {

    if (this.personForm.valid) {
      this.nombreTipo = this.personForm.get('iTipoDocumento').value
      this.validadorDeCedula()
      this.validarCorreo()
      this.validarNumeroTelefonico()
      if (this.validador && this.validador_correo && this.validador_telefono) {
        var dataguardar = {}
        if (this.dataInicial) {
          this.loading = true;
          dataguardar = {
            email: this.personForm.get('iCorreo').value,
            tipo_identificacion: this.id_tipo_documento,
            identificacion: this.personForm.get('iDocumento').value,
            nombre: this.personForm.get('iNombre').value,
            apellido: this.personForm.get('iApellido').value,
            numero: this.personForm.get('iTelefono').value,
            direccion: this.personForm.get('iDireccion').value,
            id_persona_direccion: this.dataInicial.id_persona_direccion,
            id_persona_direccion_email: this.dataInicial.id_persona_direccion_email,
            id_persona_telefono: this.dataInicial.id_persona_telefono,
            id_tipo_persona: this.dataInicial.id_tipo_persona,
            id: this.id_persona
          }
          console.log(dataguardar)
          this.userService.updatePersona(dataguardar).subscribe(resp => {

            this.loading = false;
            this.notificar('succes', 'Se ha actualizado el cliente correctamente', 'Ok')
            this.close();

          }, err => {
            this.notificar('warning', err, 'Ops');

            this.loading = false;


          });


        } else {
          this.loading = true;
          dataguardar = {
            email: this.personForm.get('iCorreo').value,
            tipo_identificacion: this.id_tipo_documento,
            identificacion: this.personForm.get('iDocumento').value,
            nombre: this.personForm.get('iNombre').value,
            apellido: this.personForm.get('iApellido').value,
            numero: this.personForm.get('iTelefono').value,
            direccion: this.personForm.get('iDireccion').value
          };
          this.userService.savePersona(dataguardar).subscribe(resp => {
            this.loading = false;
            Swal.fire({
              title: 'OK',
              text: 'El cliente ha sido ingresado correctamente  ',
              timer: 5000,
              timerProgressBar: true,


              onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
                zippi.play();
              }
            })
            this.close();
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
        }
      }


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
  notificar(icon, text, title) {
    Swal.fire({
      title: title,
      icon: icon,
      text: text,
      timer: 5000,
      timerProgressBar: true,


      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
        zippi.play();
      }
    })
  }

  eventotiAgente(item) {
    this.personForm.get('iTipoDocumento').setValue(item.nombre);
    this.nombreTipo = item.nombre
    this.id_tipo_documento = item.id;
  }

  validadorDeCedula() {

    let cedula
    this.validador = false
    cedula = this.personForm.value.iDocumento
    if (cedula.trim()) {
      if (this.nombreTipo == 'CEDULA') {

        let cedulaCorrecta = false;
        if (cedula.length == 10) {
          let tercerDigito = parseInt(cedula.substring(2, 3));
          if (tercerDigito < 6) {
            // El ultimo digito se lo considera dígito verificador
            let coefValCedula = [2, 1, 2, 1, 2, 1, 2, 1, 2];
            let verificador = parseInt(cedula.substring(9, 10));
            let suma: number = 0;
            let digito: number = 0;
            for (let i = 0; i < (cedula.length - 1); i++) {
              digito = parseInt(cedula.substring(i, i + 1)) * coefValCedula[i];
              suma += ((parseInt((digito % 10) + '') + (parseInt((digito / 10) + ''))));
              //      console.log(suma+" suma"+coefValCedula[i]); 
            }
            suma = Math.round(suma);
            //  console.log(verificador);
            //  console.log(suma);
            //  console.log(digito);
            if ((Math.round(suma % 10) == 0) && (Math.round(suma % 10) == verificador)) {
              cedulaCorrecta = true;
            } else if ((10 - (Math.round(suma % 10))) == verificador) {
              cedulaCorrecta = true;
            } else {
              cedulaCorrecta = false;
            }
          } else {
            cedulaCorrecta = false;
          }
        } else {
          cedulaCorrecta = false;
        }
        this.validador = cedulaCorrecta;
        return

      } else if (this.nombreTipo != 'PASAPORTE') {
        if (Number(cedula)) {
          this.validador = true
          return
        } else {
          this.validador = false
          return
        }
      }
    } else {
      this.validador = false
      return
    }

  }

}
