import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { RiskService } from '../services-riesgos/risk.service';
import { repeat } from 'lodash';
import Swal from "sweetalert2";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-dia-risks',
  templateUrl: './dia-risks.component.html',
  styleUrls: ['./dia-risks.component.scss']
})
export class DiaRisksComponent implements OnInit {
  displayedColumns: string[] = ['Descripcion', 'select'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  form: FormGroup;
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep4: FormGroup;
  isLinear = true;
  private _unsubscribeAll: Subject<any>;
  tiporiesgos: any[];
  partesint: any[];
  factores: any[];
  tiporiesgoop: any[];
  tiporiesgoopdet: any[];
  listaactividades: any[];
  datafromlocal: any;


  imgList: any = [];
  img1: any;
  fileToUpload: File = null;
  uploading: boolean;
  nombreimg: any;
  id_culminar: string;
  atiempo: any = null;
  constructor(private _formBuilder: FormBuilder, public riskService: RiskService, public router: Router,
    public dialogRef: MatDialogRef<DiaRisksComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    console.log(this.data);
    const data1 = localStorage.getItem('id_culminar');
    this.id_culminar = data1;
    this.horizontalStepperStep1 = this._formBuilder.group({
      mao: ['', Validators.required],
      atiempo: ['', Validators.required],
    });



  }

  descargarImg1() {
    window.open(this.data.url, '_blank');
  }

  clickInputFile() {
    let input = document.getElementById("imageQuest");
    input.click();
  }
  renderImage(e) {
    //console.log('entra aqui', 0)
    let reader = new FileReader();
    this.imgList[0] = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    this.fileToUpload = this.imgList[0];
    //this.nombreimg=this.fileToUpload[0].name;
    //this.fileToUpload
    console.log(this.fileToUpload);
    this.pushimagen(this.imgList[0], 0);
    this.img1 = this.imgList[0].name;
    setTimeout(() => {
      let img = <HTMLDivElement>document.querySelector(".img-default");
      img.style.backgroundImage = `url(${reader.result})`
    }, 300);




  }

  pushimagen(data, index = 0) {
    this.uploading = true;

    const promise = new Promise((resolve, reject) => {
      try {
        this.riskService.postFile(data, 'https://serviciosenlinea.crea.fin.ec:8180/serviciosenlinea/risks/upload');
      } catch (e) {
        reject();
      }
    });
    return promise;
  }




  guardar() {
    this.atiempo = this.horizontalStepperStep1.get('atiempo').value;


    // if (this.data.url == undefined || this.data.url == null || this.data.url == '') {
    //   Swal.fire({
    //     title: 'UPS!!!',
    //     text: 'Al parecer no se ha ingresado el respaldo:   ',
    //     timer: 5000,
    //     timerProgressBar: true,
    //     position: 'bottom-end',
    //     onOpen: (toast) => {
    //       toast.addEventListener('mouseenter', Swal.stopTimer)
    //       toast.addEventListener('mouseleave', Swal.resumeTimer)
    //       var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
    //       zippi.play();
    //     }
    //   })

    // } else {



      if (this.atiempo != null || this.atiempo != '' || this.atiempo != 'undefined') {
        //console.log('YUA NO ES NULL')
        if (this.atiempo) {
          this.riskService.cambioestadoUrl(this.id_culminar, 'FIN', '', '1').subscribe(resp => {

            if (resp.responseMessage == 'Ok') {
              //console.log('Correctro:', resp);

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
              this.dialogRef.close();
            } else {

              Swal.fire({
                title: 'UPS!!!',
                text: 'Algo salio mal:   ',
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



          }, err => {
            //console.log('error:   ' + err);
          })
        } else {
          this.riskService.cambioestadoUrl(this.id_culminar, 'FIN', this.data.url, '0').subscribe(resp => {
            if (resp.responseMessage == 'Ok') {

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
              this.dialogRef.close();



            } else {
              Swal.fire({
                title: 'UPS!!!',
                text: 'Algo salio mal:   ',
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

          }, err => {
            //console.log('error:   ' + err);
          })

        }
      } else {
        //console.log('aunnnn  ES NULL')
      }
    //}
    //console.log('ESTA ES LA IMAGEEEEEEEEEEEEEEEEEEEEEEEEEEEEEN',this.img1)
    //console.log('A TIEMPOOOOOOOOOOOOOOOOOOOOOOO',this.atiempo);
    //console.log('A maoooooooooooooooooooooooooooooooo',this.horizontalStepperStep1.get('atiempo').value);




  }



}
