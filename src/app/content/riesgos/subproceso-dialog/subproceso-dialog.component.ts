import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { RiesgosServices } from '../services-riesgos/riesgos-services';

@Component({
  selector: 'app-subproceso-dialog',
  templateUrl: './subproceso-dialog.component.html',
  styleUrls: ['./subproceso-dialog.component.scss']
})
export class SubprocesoDialogComponent implements OnInit {

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
  process_inserted: boolean = true
  filteredCountries: any[];
  disableSave: boolean;
  id_persona: any;
  procesos: any[] = []
  editar: boolean

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
    this.getData(null, null, null)

  }
  getData(page, limit, search) {

    this.riesgosServices.getProcesos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.procesos = data.data;

    });
  }

  getDataList(page, limit, search) {

    this.riesgosServices.getProcesos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.filteredCountries = data.data;

    });
  }
  chargeData() {

    if (this.dataInicial) {
      this.editar = true
      this.personForm.get('iNombre').setValue(this.dataInicial.nombre_subproceso)
      this.personForm.get('iDocumento').setValue(this.dataInicial.codigo_subproceso)
      let data = {
        id_proceso : this.dataInicial.id_proceso,
        nombre_proceso : this.dataInicial.nombre_proceso
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

  onChange(event){


    console.log(this.selectedCountryAdvanced.nombre_proceso, this.selectedCountryAdvanced.id_proceso)
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
    if(this.selectedCountryAdvanced.id_proceso != undefined){
      this.process_inserted = true
      console.log("Siuuuu")

    }else{
      this.process_inserted = false
      console.log("Nouuuu")
    }

    if (this.personForm.valid && this.process_inserted) {

      var dataguardar = {}
      if (this.dataInicial) {
        this.loading = true;
        dataguardar = {

          codigo_subproceso: this.personForm.get('iDocumento').value,
          nombre_subproceso: this.personForm.get('iNombre').value,
          id_subproceso: this.dataInicial.id_subproceso,
          id_proceso: this.selectedCountryAdvanced.id_proceso
         
         
        }
        console.log(dataguardar)
        this.riesgosServices.updateSubProceso(dataguardar).subscribe(resp => {

          this.loading = false;
          this.notificar('succes', 'Se ha actualizado el subproceso correctamente', 'Ok')
          this.close();

        }, err => {
          this.notificar('warning', err, 'Ops');

          this.loading = false;


        });


      } else {
        //insertar subprcesoo
        this.loading = true;
        dataguardar = {
          id_proceso: this.selectedCountryAdvanced.id_proceso,
          codigo_subproceso: this.personForm.get('iDocumento').value,
          nombre_subproceso: this.personForm.get('iNombre').value,
        };
        this.riesgosServices.saveSubProcesos(dataguardar).subscribe(resp => {
          this.loading = false;
          Swal.fire({
            title: 'OK',
            text: 'El subproceso ha sido ingresado correctamente  ',
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
