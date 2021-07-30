import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { RiesgosServices } from '../services-riesgos/riesgos-services';
import { ImpactosServices } from '../services-riesgos/riesgos-impactos-services';

@Component({
  selector: 'app-impacto-economico-dialog',
  templateUrl: './impacto-economico-dialog.component.html',
  styleUrls: ['./impacto-economico-dialog.component.scss']
})
export class ImpactoEconomicoDialogComponent implements OnInit {


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
  selectedValores: any = [];
  loading: boolean
  process_inserted: boolean = true
  valor_inserted: boolean = true
  filteredCountries: any[];
  filteredValores: any[];
  impactos: any[] = []
  disableSave: boolean;
  id_persona: any;
  procesos: any[] = []
  valores: any[] = []
  editar: boolean
  economico: boolean

  constructor(public activeModal: NgbActiveModal, private riesgosServices: RiesgosServices, private impactoService: ImpactosServices) { }

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
    this.getDataList(null, null, null)
    this.getDataValores(null, null, null)

  }
  getData(page, limit, search) {

    this.riesgosServices.getProcesos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.procesos = data.data;

    });
  }

  getDataList(page, limit, search) {

    this.impactoService.getImpactos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.impactos = data.data;

    });
  }
  getDataValores(page, limit, search) {

    this.impactoService.getValores(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaaValll ', data)
      this.valores = data.data;
      console.log(this.valores, "MachuuPichuu")
    });
  }
  chargeData() {

    if (this.dataInicial) {
      this.editar = true
      this.personForm.get('iNombre').setValue(this.dataInicial.descripcion)
      this.personForm.get('iCuantificacion').setValue(this.dataInicial.cuantificacion)
      this.personForm.get('iMontomin').setValue(this.dataInicial.minimo)
      this.personForm.get('iMontomax').setValue(this.dataInicial.maximo)
      let data_impacto = {
        id_impacto: this.dataInicial.id_impacto,
        nombre_impacto: this.dataInicial.nombre_impacto
      }
      let data_valor = {
        id_valoracion: this.dataInicial.id_valoracion,
        nombre_valoracion: this.dataInicial.nombre_valoracion
      }
      this.selectedCountryAdvanced = data_impacto
      this.selectedValores = data_valor
      if (this.selectedCountryAdvanced.id_impacto == 1) {
        this.economico = true

      } else {
        this.economico = false
      }
    } else {
      this.editar = false
    }

  }

  filterCountry(event) {
    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.impactos.length; i++) {
      let country = this.impactos[i];
      if (country.nombre_impacto.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }
    this.filteredCountries = filtered;
  }

  filterValores(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.valores.length; i++) {
      let country = this.valores[i];
      if (country.nombre_valoracion.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }

    }
    this.filteredValores = filtered;
  }
  onChange(event) {
    console.log("Cambiooo")
    if (this.selectedCountryAdvanced.id_impacto == 1) {
      this.economico = true

    } else {
      this.economico = false
    }
  }
  close() {
    this.activeModal.dismiss();
  }
  initForm() {

    this.personForm = new FormGroup({

      iNombre: new FormControl(null),
      iCuantificacion: new FormControl(null),
      iMontomin: new FormControl(null),
      iMontomax: new FormControl(null)

    })


  }

  saveProceso() {
    if (this.selectedCountryAdvanced.id_impacto != undefined) {
      this.process_inserted = true
    } else {
      this.process_inserted = false
    }
    if (this.selectedValores.id_valoracion != undefined) {
      this.valor_inserted = true
    } else {
      this.valor_inserted = false
    }
    if (this.personForm.valid && this.process_inserted && this.valor_inserted) {

      var dataguardar = {}
      if (this.dataInicial) {
        this.loading = true;
        dataguardar = {

          id_valoracion: this.selectedValores.id_valoracion,
          id_impacto: this.selectedCountryAdvanced.id_impacto,
          descripcion: this.personForm.get('iNombre').value,
          cuantificacion: this.personForm.get('iCuantificacion').value,
          minimo: this.personForm.get('iMontomin').value,
          maximo: this.personForm.get('iMontomax').value,
          id: this.dataInicial.id
        }
        console.log(dataguardar)
        this.impactoService.updateImpacto(dataguardar).subscribe(resp => {

          this.loading = false;
          this.notificar('succes', 'Se ha actualizado el impacto correctamente', 'Ok')
          this.close();

        }, err => {
          this.notificar('warning', err, 'Ops');

          this.loading = false;


        });


      } else {
        //insertar subprcesoo
        this.loading = true;
        dataguardar = {
          id_valoracion: this.selectedValores.id_valoracion,
          id_impacto: this.selectedCountryAdvanced.id_impacto,
          descripcion: this.personForm.get('iNombre').value,
          cuantificacion: this.personForm.get('iCuantificacion').value,
          minimo: this.personForm.get('iMontomin').value,
          maximo: this.personForm.get('iMontomax').value,
        };
        console.log(dataguardar, "Evaluna")
        this.impactoService.saveImpacto(dataguardar).subscribe(resp => {
          this.loading = false;
          Swal.fire({
            title: 'OK',
            text: 'El impacto ha sido ingresado correctamente  ',
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
