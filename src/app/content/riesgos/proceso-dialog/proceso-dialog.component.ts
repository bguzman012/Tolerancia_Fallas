import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { RiesgosServices } from '../services-riesgos/riesgos-services';

@Component({
  selector: 'app-proceso-dialog',
  templateUrl: './proceso-dialog.component.html',
  styleUrls: ['./proceso-dialog.component.scss']
})
export class ProcesoDialogComponent implements OnInit {

  @Input() dataModal;
  personForm: FormGroup;
  closeResult: string;
  tipos: any[] = []
  dataInicial: any;
  guardar: boolean
  id_tipo_documento: any;
  nombreTipo: any
  users: any[] = []
  selectedCountryAdvanced: any = [];
  loading: boolean
  disableSave: boolean;
  id_persona: any;
  editar: boolean
  filteredCountries: any[];
  process_inserted: boolean = true

  constructor(public activeModal: NgbActiveModal, private riesgosServices: RiesgosServices) { }

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
    this.initForm()
    this.chargeData()

  }
  chargeData() {

    if (this.dataInicial) {
      this.editar = true
      this.personForm.get('iNombre').setValue(this.dataInicial.nombre_proceso)
      this.personForm.get('iDocumento').setValue(this.dataInicial.codigo_proceso)
      let data = {
        id_departamento : this.dataInicial.id_departamento,
        nombre_departamento : this.dataInicial.nombre_departamento
      }

      this.selectedCountryAdvanced = data
     // this.id_persona = this.dataInicial.id
      
    } else {
      this.editar = false
    }

  }
  filterCountry(event){
  
    let query = event.query;
    console.log(query.length)
    this.getDataList(null, 10, query)

  }

  getDataList(page, limit, search) {

    this.riesgosServices.getDepartamentos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.filteredCountries = data.data;

    });
  }

  close() {
    this.activeModal.dismiss();
  }
  initForm() {

    this.personForm = new FormGroup({
      iDocumento: new FormControl(null, Validators.required),
      iNombre: new FormControl(null, Validators.required),

    })


  }

  saveProceso() {
    if(this.selectedCountryAdvanced.id_departamento != undefined){
      this.process_inserted = true
    }else{
      this.process_inserted = false
    }

    if (this.personForm.valid && this.process_inserted) {

      var dataguardar = {}
      if (this.dataInicial) {
        this.loading = true;
        dataguardar = {

          codigo_proceso: this.personForm.get('iDocumento').value,
          nombre_proceso: this.personForm.get('iNombre').value,
          id_proceso: this.dataInicial.id_proceso,
          id_departamento: this.selectedCountryAdvanced.id_departamento
          //id_persona_direccion: this.dataInicial.id_persona_direccion,
         
        }
        console.log(dataguardar)
        this.riesgosServices.updateProceso(dataguardar).subscribe(resp => {

          this.loading = false;
          this.notificar('succes', 'Se ha actualizado el proceso correctamente', 'Ok')
          this.close();

        }, err => {
          this.notificar('warning', err, 'Ops');

          this.loading = false;


        });


      } else {
        this.loading = true;
        dataguardar = {

          codigo_proceso: this.personForm.get('iDocumento').value,
          nombre_proceso: this.personForm.get('iNombre').value,
          id_departamento: this.selectedCountryAdvanced.id_departamento
        };
        this.riesgosServices.saveProcesos(dataguardar).subscribe(resp => {
          this.loading = false;
          Swal.fire({
            title: 'OK',
            text: 'El proceso ha sido ingresado correctamente  ',
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


    else {
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


}
