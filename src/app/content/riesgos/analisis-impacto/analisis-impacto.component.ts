import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SubprocesoDialogComponent } from "../subproceso-dialog/subproceso-dialog.component";
import { RiesgosServices } from "../services-riesgos/riesgos-services";
import { ImpactosServices } from '../services-riesgos/riesgos-impactos-services';
import Swal from "sweetalert2";
import { ImpactoEconomicoDialogComponent } from '../impacto-economico-dialog/impacto-economico-dialog.component';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';

import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { FindValueSubscriber } from "rxjs/internal/operators/find";

@Component({
  selector: 'app-analisis-impacto',
  templateUrl: './analisis-impacto.component.html',
  styleUrls: ['./analisis-impacto.component.scss']
})
export class AnalisisImpactoComponent implements OnInit {

  loading: boolean = false;
  lista: any[] = []
  lista_eco: any[] = []
  lista_ope: any[] = []
  lista_reputacional: any[] = []
  lista_legal: any[] = []
  lista_subproces: any[] = []
  selectedCountryAdvanced: any = [];
  filteredCountries: any[];
  filteredOperacional: any[];
  filteredLegal: any[];
  filteredReputacional: any[];
  size_subproces: any = 0
  model: any;
  closeResult: any = ''
  flag_inserted: boolean
  info_economica: any[] = []
  info_operacion: any[] = []
  info_legal: any[] = []
  info_reputacional: any[] = []
  impactos: any[] = []
  isEmpty: boolean = false

  proceso: any = []
  criticida: any[] = []
  inserted: boolean
  constructor(private riesgosServices: RiesgosServices, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDataList(null, null, null)

    this.getEconomico()
    this.getOperacional()
    this.getLegal()
    this.getReputacional()
    this.getInfoEco()
    this.getInfoLegal()
    this.getInfoOpe()
    this.getInfoReputacional()
    this.getPuntuacion()
    this.getCriticidad()


  }



  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  @ViewChild('instance2', { static: true }) instance2: NgbTypeahead;

  @ViewChild('instanc3', { static: true }) instance3: NgbTypeahead;

  @ViewChild('instance4', { static: true }) instance4: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.lista
        : this.lista.filter(v => v.nombre_proceso.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  getCriticidad() {
    this.riesgosServices.getCriticidad().then(data => {
      console.log('dataEconomico', data)
      this.criticida = data.data;

    });
  }

  searchById(val) {
    //this.initform()
    console.log('este es el valor que va a buscar::', val)

    //this.getInfoPerson(val);
  }
  resultFormatBandListValue(value: any) {
    return value.nombre_proceso;
  }
  /**
    * Initially binds the string value and then after selecting
    * an item by checking either for string or key/value object.
  */
  inputFormatBandListValue(value: any) {
    if (value.nombre_proceso)
      return value.nombre_proceso
    return value;
  }

  selectedItem(event) {
    
    this.proceso = event.item
    console.log(event.item, "Lanochee")
    console.log(this.model)
    this.riesgosServices.getSubprocesosById(event.item.id_proceso).then(data => {
      console.log('procesoos', data)
      this.lista_subproces = data.data;
      this.lista_subproces.forEach(element => {
        if (!element.economico.valoracion.trim() || !element.operacional.cuantificacion.trim()
          || !element.legal.cuantificacion.trim() || !element.reputacional.cuantificacion.trim()) {
          this.isEmpty = true
          return
        }
      });

      console.log(this.lista_subproces.length)
      this.size_subproces = this.lista_subproces.length
      this.flag_inserted = true

    });

  }

  generarReporte() {
    this.loading = true
    let max = 0
    let criticidad_max = ''
    this.lista_subproces.forEach(element => {
      if (max < element.resultado) {
        max = element.resultado;
        criticidad_max = element.valoracion_criticidad
      }
    });

    this.riesgosServices.generatereport(this.proceso.id_proceso, this.proceso.nombre_proceso, max, criticidad_max).then(data => {
      console.log('LISTA DE CUENTAS DE LA PLA', data)

      window.open(data.url, '_blank');
      this.loading = false
    });
    

  }

  getPuntuacion() {
    this.riesgosServices.getPuntuacion().then(data => {
      console.log('dataEconomico', data)
      this.impactos = data.data;

    });
  }
  getEconomico() {

    this.riesgosServices.getEconomico().then(data => {
      console.log('dataEconomico', data)
      this.lista_eco = data.data;

    });
  }

  getInfoEco() {

    this.riesgosServices.getInforEconomico().then(data => {
      console.log('dataEconomico', data)
      this.info_economica = data.data;

    });
  }

  getInfoOpe() {

    this.riesgosServices.getInforOperacional().then(data => {
      console.log('dataEconomico', data)
      this.info_operacion = data.data;

    });
  }

  getInfoLegal() {

    this.riesgosServices.getInforLegal().then(data => {
      console.log('dataEconomico', data)
      this.info_legal = data.data;

    });
  }

  getInfoReputacional() {

    this.riesgosServices.getInforReputacional().then(data => {
      this.info_reputacional = data.data;

    });
  }


  getOperacional() {

    this.riesgosServices.getOperacional().then(data => {
      console.log('dataaaaaaaaRiooos', data)
      this.lista_ope = data.data;

    });
  }
  getLegal() {

    this.riesgosServices.getLegal().then(data => {
      console.log('dataaaaaaaaRiooos', data)
      this.lista_legal = data.data;
    });
  }
  getReputacional() {

    this.riesgosServices.getReputacional().then(data => {
      console.log('dataaaaaaaaRiooos', data)
      this.lista_reputacional = data.data;

    });
  }
  filterCountry(event) {

    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.lista_eco.length; i++) {
      let country = this.lista_eco[i];

      if (country.valoracion.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }

    }
    this.filteredCountries = filtered;

  }

  filterOperacional(event) {

    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.lista_ope.length; i++) {
      let country = this.lista_ope[i];
      if (country.cuantificacion.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }

    }
    this.filteredOperacional = filtered;

  }

  openInfoEconomico() {
    console.log("AbriteOme")
  }
  saveImpacto() {

    let data = {
      "subprocesos": this.lista_subproces
    }
    console.log(data)
    this.inserted = true
    console.log("This is americaa")
    let bandera: boolean
    this.lista_subproces.forEach(element => {
      if (!element.economico.valoracion.trim() || !element.operacional.cuantificacion.trim()
        || !element.legal.cuantificacion.trim() || !element.reputacional.cuantificacion.trim()) {
        bandera = true
        return
      }
    });
    if (bandera) {
      this.isEmpty = true
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

    } else {
      this.loading = true
      this.isEmpty = false
      this.riesgosServices.saveAnalisis(data).subscribe(resp => {

        Swal.fire({
          title: 'OK',
          text: 'Proceso realizado con exito ',
          timer: 5000,
          timerProgressBar: true,


          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }

        })
        this.loading = false


      }, err => {

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
        this.loading = false

      });

    }

  }
  onChange(event) {
    console.log(this.lista_subproces, "Youuu brooo")
    console.log(event, "Albuquerke")
    console.log(this.impactos, "AlbuquerkeImps")

    for (let index = 0; index < this.lista_subproces.length; index++) {
      const element = this.lista_subproces[index];
      if (element.id_subproceso == event.id_subproceso) {
        console.log(element, "ennn")
        console.log(event, "ess")
        let promedio = (event.economico.peso * event.economico.id_valoracion) +
          (event.legal.peso * event.legal.id_valoracion) +
          (event.operacional.peso * event.operacional.id_valoracion) +
          (event.reputacional.peso * event.reputacional.id_valoracion)

        console.log(promedio, "Busco alguien")
        console.log(this.impactos)
        this.impactos.forEach(impacto => {

          if (impacto.maximo > promedio && promedio > impacto.minimo) {
            console.log(impacto, "Cossas pequenas", promedio)


            this.lista_subproces[index].resultado = promedio.toFixed(2);
            this.lista_subproces[index].calificacion = impacto.valoracion
            this.lista_subproces[index].id_puntuacion = impacto.id
            this.lista_subproces[index].color_calificacion = impacto.color
            return
          }
        });

        this.criticida.forEach(crit => {
          if (crit.maximo >= promedio && promedio > crit.minimo) {

            this.lista_subproces[index].valoracion_criticidad = crit.valoracion
            this.lista_subproces[index].color_criticidad = crit.color
            this.lista_subproces[index].id_criticidad = crit.id

          }
        })
        return

      }

    }
  }

  openDialog() {


  }


  filterLegal(event) {

    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.lista_legal.length; i++) {
      let country = this.lista_legal[i];
      if (country.cuantificacion.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }

    }
    this.filteredLegal = filtered;

  }


  filterReputacional(event) {

    let filtered: any[] = [];

    let bandera = false
    let query = event.query;
    for (let i = 0; i < this.lista_reputacional.length; i++) {
      let country = this.lista_reputacional[i];
      if (country.cuantificacion.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }

    }
    this.filteredReputacional = filtered;

  }



  getDataList(page, limit, search) {

    this.riesgosServices.getProcesos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.lista = data.data;

    });
  }

}
