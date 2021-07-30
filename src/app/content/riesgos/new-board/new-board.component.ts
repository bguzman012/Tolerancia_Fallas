import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RiskService } from '../services-riesgos/risk.service'
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss']
})
export class NewBoardComponent implements OnInit {
  form: FormGroup;
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep4: FormGroup;
  horizontalStepperStep5: FormGroup;
  isLinear = true;
  listprob: any[];
  listImpacto: any[];
  listriesgoin: any[];
  listcausas: any[];
  listconsec: any[];
  datosguardar: any;
  selected3: string;
  selected4: string;
  selected5: string;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  descripcion: string;

  cau1: string;
  cau2: string;
  cau3: string;
  con1: string;
  con2: string;
  con3: string;
  prob: string;
  imp: string;
  rie: string;
  loading: boolean = false;

  private _unsubscribeAll: Subject<any>;
  minimocampos: number;
  maximocampos: number;
  currentfields: number;
  currentfieldscon: number;
  esriesgo = [
    { val: 0, des: 'Si' },
    { val: 1, des: 'No' },
  ];

  seguridadinfo = [
    { val: 1, des: 'Si' },
    { val: 0, des: 'No' },
  ];

  esriesgosel: string;
  valorprob: number;
  valorimp: number;
  valorriesgo: number;
  descprob: any;
  descrie: any;
  descimpacto: any;
  valries: number; I
  muestraob: boolean;
  selecradio: number = 0;
  guarda: boolean;
  es_riesgo_sdi: any;

  constructor(private _formBuilder: FormBuilder, public riskService: RiskService, public router: Router) { }
  fields = [{ id: 'causa1', label: '', value: '' }, { id: 'causa2', label: '', value: '' }, { id: 'causa3', label: '', value: '' }];
  fieldscon = [{ id: 'consec1', label: '', value: '' }, { id: 'consec2', label: '', value: '' }, { id: 'consec3', label: '', value: '' }];
  formdynamico = new FormGroup({});
  ngOnInit(): void {
    this.muestraob = false;
    this.valorimp = 0;
    this.valorprob = 0;
    this.esriesgosel = '';
    this.minimocampos = 3;
    this.currentfields = 3;
    this.currentfieldscon = 3;
    this.maximocampos = 6;
    this.color1 = 'white';
    this.fillselects();
    this.valries = 0;
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
      probabilidad: ['', Validators.required],
      impacto: ['', Validators.required],

      riesgoin: ['', Validators.required],

    });

    this.horizontalStepperStep1 = this._formBuilder.group({
      descripcionr: ['', Validators.required],

    });
    this.horizontalStepperStep2 = this._formBuilder.group({});
    this.fields.forEach(x => {
      this.horizontalStepperStep2.addControl(x.id, new FormControl(x.value, Validators.required))
    })
    this.horizontalStepperStep3 = this._formBuilder.group({});
    this.fieldscon.forEach(x => {
      this.horizontalStepperStep3.addControl(x.id, new FormControl(x.value, Validators.required))
    })

    this.horizontalStepperStep4 = this._formBuilder.group({
      probabilidad: ['', Validators.required],
      impacto: ['', Validators.required],

      riesgoin: [''],

    });

    this.horizontalStepperStep5 = this._formBuilder.group({
      fieldesriesgo: ['', Validators.required],
      observaciones: ['', Validators.required],


    });


  }
  finishHorizontalStepper(): void {
    this.guarda = true;
    //console.log('RIEGOOOOoooooooooooooooooooooooooooooooOOOO',this.esriesgosel)
    if (this.selecradio == 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Al parecer no has seleccionado si hay alguna oportunidad de mejora',
        timer: 4000
        //footer: '<a href>Why do I have this issue?</a>'
      });
      this.guarda = false;
    } else {
      this.guarda = true;
    }
    if (this.muestraob) {

      if (this.horizontalStepperStep5.get('observaciones').value == '' || this.horizontalStepperStep5.get('observaciones').value == null) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Al parecer no has ingresado una observación',
          timer: 4000
          //footer: '<a href>Why do I have this issue?</a>'
        });
        this.guarda = false;
      } else {
        this.guarda = true;
      }


    }

    //console.log('GUARDAAAAAAAAAAAAAAAAAAA',this.guarda)
    if (this.guarda) {
      this.loading = true


      var data = JSON.parse(localStorage.getItem('currentUserData'));

      var user = data.detailUsers[0].username

      this.datosguardar = {
        evento: this.descripcion,
        idpro: this.prob, idimp: this.selected5,
        idrie: this.rie,
        valpro: this.valorprob,
        valimp: this.valorimp,
        valrie: this.valorriesgo,
        despro: this.descprob,
        desimp: this.descimpacto,
        desrie: this.descrie,
        causas: this.listcausas,
        consec: this.listconsec,
        observaciones: this.horizontalStepperStep5.get('observaciones').value,
        esriesgo: this.esriesgosel, user: user,
        es_riesgo_sdi: this.es_riesgo_sdi
      };

      //console.log('ESTE ES EL FINAL');
      //console.log(this.esriesgosel)
      //console.log(this.horizontalStepperStep5.get('observaciones').value);
      //console.log(this.horizontalStepperStep5.get('fieldesriesgo').value);

      //console.log('FIN', this.datosguardar)
      //console.log('MAOOOOOOO' + JSON.stringify(this.datosguardar))


      this.riskService.savepart1(this.datosguardar).subscribe(resp => {
        Swal.fire({
          icon: 'success',
          title: 'BUEN TRABAJO',
          text: 'Riesgo cargado con éxito',
          timer: 4000,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }

          //footer: '<a href>Why do I have this issue?</a>'
        });
        this.loading = false
        /* this.router.navigate(['boards/']); */
        this.router.navigate(['default/riesgos/list-ana']);
      }, err => {
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al almacenar:   ' + err,
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.loading = false
        //console.log('error:   ' + err);

      })

    }
  }
  radioChange(e) {
    this.selecradio = 1;
    //console.log('ESTE ES EL cheeckkk');
    this.esriesgosel = e.value;
    if (this.esriesgosel == '1') {
      this.muestraob = false;

    } else {
      this.muestraob = true;
    }
    //console.log(this.esriesgosel)
  }



  radioChange2(e) {
    this.selecradio = 1;
    //console.log('ESTE ES EL cheeckkk');
    this.es_riesgo_sdi = e.value;

    console.log(this.es_riesgo_sdi)
  }


  fillselects() {


    this.riskService.getInfoSelec().subscribe(resp => {
      //console.log('Datos:', resp.ventas_mensuales);
      this.listprob = resp.detalleProbabilidad;
      this.listImpacto = resp.detalleImpacto
      this.listriesgoin = resp.detalleRieagoInherente

      //console.log('prob:', this.listprob);
      //console.log('impacto:', this.listImpacto);
      //console.log('riesgo:', this.listriesgoin);


    }, err => {

      //console.log('error:   ' + err);

    })
  }

  changeProb(e) {
    //console.log('aqui', e)
    const result = this.listprob.filter(t => t.idprobabilidad === e.value);
    var data = result;
    this.color1 = data[0].color;
    this.prob = data[0].idprobabilidad;
    this.valorprob = data[0].valor;
    this.descprob = data[0].descripcion
    //console.log('numero1111', this.valorprob)
    this.valorriesgo = this.valorprob * this.valorimp;
    //console.log('resultaado', this.valorriesgo);

    const result2 = this.listriesgoin.filter(t => parseInt(t.valormax) >= this.valorriesgo && parseInt(t.valormin) <= this.valorriesgo);
    this.selected5 = result2[0].idriesgoinherente;
    this.color3 = result2[0].color;
    this.descrie = result2[0].descripcion;
    this.rie = result2[0].idriesgoinherente;
    //console.log('EL COMBO QUE ME DEVUELVE ES: ', result2);

  }
  changeImpacto(e) {

    const result = this.listImpacto.filter(t => t.idimpacto === e.value);
    this.color2 = result[0].color;
    this.valorimp = result[0].valor;
    this.imp = result[0].idimpacto;
    this.descimpacto = result[0].descripcion;
    this.valorriesgo = this.valorprob * this.valorimp;

    const result2 = this.listriesgoin.filter(t => parseInt(t.valormax) >= this.valorriesgo && parseInt(t.valormin) <= this.valorriesgo);
    this.selected5 = result2[0].idriesgoinherente;
    this.color3 = result2[0].color;
    this.descrie = result2[0].descripcion;
    this.rie = result2[0].idriesgoinherente;

    //console.log('EL COMBO QUE ME DEVUELVE ES: ', result2);
  }
  changeRiesgo(e) {
    //console.log('aqui', e)
    const result = this.listriesgoin.filter(t => t.idriesgoinherente === e.value);
    this.color3 = result[0].color;

    //console.log('resultaado', result)

  }

  cargadatos() {
    //console.log('INGRESA A CARGAR DATOS')
    this.descripcion = this.horizontalStepperStep1.get('descripcionr').value;
    /*  this.prob=this.horizontalStepperStep4.get('probabilidad').value;
     this.imp=this.horizontalStepperStep4.get('impacto').value;
     this.rie=this.horizontalStepperStep4.get('riesgoin').value; */
    this.listcausas = [];
    this.listconsec = [];
    this.fields.forEach(x => {
      //console.log(this.horizontalStepperStep2.get(x.id).value)
      this.listcausas.push(this.horizontalStepperStep2.get(x.id).value)

    })
    this.fieldscon.forEach(x => {
      //console.log(this.horizontalStepperStep3.get(x.id).value)
      this.listconsec.push(this.horizontalStepperStep3.get(x.id).value)
    })

  }
  agregacampo(step) {
    if (step == 2) {
      this.currentfields += 1;
      //console.log('entra en agregar campo', this.horizontalStepperStep2)
      this.fields.push({ id: 'causa' + this.currentfields, label: 'causanueva', value: '' });
      this.horizontalStepperStep2.addControl('causa' + this.currentfields, new FormControl('', Validators.required))
    }
    if (step == 3) {
      this.currentfieldscon += 1;
      //console.log('entra en agregar campo', this.horizontalStepperStep3)
      this.fieldscon.push({ id: 'consec' + this.currentfieldscon, label: 'consecnueva', value: '' });
      this.horizontalStepperStep3.addControl('consec' + this.currentfieldscon, new FormControl('', Validators.required))
    }



  }

  deletecausa(step) {
    //console.log('maoooooo'+this.currentfields)
    if (this.currentfields > 1) {
      if (step == 2) {



        //console.log('ingresa a eliminar', 'causa' + this.currentfields)
        this.fields.splice(this.currentfields - 1);

        this.horizontalStepperStep2.removeControl('causa' + this.currentfields)
        this.currentfields -= 1;
      }
    }
    if (this.currentfieldscon > 1) {
      if (step == 3) {
        //console.log('ingresa a eliminar', 'consec' + this.currentfieldscon)
        this.fieldscon.splice(this.currentfieldscon - 1);

        this.horizontalStepperStep3.removeControl('consec' + this.currentfieldscon)
        this.currentfieldscon -= 1;
      }

    }
  }
}
