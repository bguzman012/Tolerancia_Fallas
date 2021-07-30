import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RiskService} from '../services-riesgos/risk.service';
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
  selector: 'app-dia-ana',
  templateUrl: './dia-ana.component.html',
  styleUrls: ['./dia-ana.component.scss']
})
export class DiaAnaComponent implements OnInit {
  displayedColumns: string[] = ['Descripcion', 'select'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  form: FormGroup;
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep4:FormGroup;
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
  atiempo: any=null;
  listproceso: any;
  agencia: boolean;
  selectedproceso2:string;
  constructor(private _formBuilder: FormBuilder, public riskService: RiskService,public router:Router,
    public dialogRef: MatDialogRef<DiaAnaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {

    console.log('INGRESAAAAAAAAAAAAAAAAAAAAAAAAAA',this.data)
    

    this.id_culminar = this.data.name;
    this.horizontalStepperStep1 = this._formBuilder.group({
      proceso2: ['', Validators.required],
      atiempo: ['', Validators.required],
      });  
      this.getRiskProceso();
  }


  getRiskProceso() {

    this.riskService.getRiskProceso().subscribe(resp => {
      console.log('respppppppp',resp)
      if (resp.responseCode == 'Ok') {
        this.listproceso = resp.jsonArray
        console.log('ESTA ES LA LISTA DE SERVICIOS', this.listproceso)
      } else {

      }
    }, err => {
      
      console.log('error:   ' + err);

    })
  }

  changeProceso2(e){}

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
    this.pushimagen(this.imgList[0],0);
    this.img1 =  this.imgList[0].name;
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




  guardar(){


    console.log('enttra a la guardadaaaaaaaaaaaaaaaaaa ', this.selectedproceso2);



if (this.selectedproceso2==undefined || this.selectedproceso2==null || this.selectedproceso2==''){
  Swal.fire({
    title: 'UPS!!!',
    text: 'Al parecer no has seleccionado el proceso:   ' ,
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

}else{

  this.riskService.finProceso(this.id_culminar,this.selectedproceso2).subscribe(resp => {


if(resp.responseCode='Ok'){
  Swal.fire({
    icon: 'success',
    title: 'BUEN TRABAJO',
    text: 'Se ha guardado el analisis con éxito',
    timer: 5000,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
      zippi.play();
    }

  });
}else{
  Swal.fire({
    title: 'Error',
    text: 'Ha ocurrido un error al almacenar el analisis:   ' ,
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

    console.log('Correctro>>>>>>>>>>>>>>>>>>>>>:', resp);
    
this.ngOnInit();

  }, err => {
  
  
 });
  }

  }

}
