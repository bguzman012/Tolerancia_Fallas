import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { RiskService } from '../services-riesgos/risk.service';
import { repeat } from 'lodash';
import Swal from "sweetalert2";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
var ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-com-risks',
  templateUrl: './com-risks.component.html',
  styleUrls: ['./com-risks.component.scss']
})
export class ComRisksComponent implements OnInit {
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
  
selected:string;
  imgList: any = [];
  img1: any;
  fileToUpload: File = null;
  uploading: boolean;
  nombreimg: any;
  id_culminar: string;
  atiempo: any=null;
  listgrupo: any;
  valida: boolean=false;
  selectgroup: any[];
  data: {};
  constructor(private _formBuilder: FormBuilder, public riskService: RiskService,public router:Router,
    public dialogRef: MatDialogRef<ComRisksComponent>) { }

  ngOnInit(): void {
    const data = localStorage.getItem('id_comunicar');
    this.id_culminar = data;
    this.horizontalStepperStep1 = this._formBuilder.group({
      grupo: ['', Validators.required],
     
      });  
      this.llenagrupo();
  }
  llenagrupo(){
    this.riskService.getgrupo().subscribe(resp => {
      //console.log('Datos:', resp);
      this.listgrupo = resp.jsonArray;
      


    }, err => {

      //console.log('error:   ' + err);

    })
  }
  changegroup(e){
  
//console.log('aquiiiiiiiiiiiiiiiii',e)


//console.log('entra al cambio de parte interesada', e.value)
this.selectgroup = this.listgrupo.filter(t => t.id==e.value);
//console.log('El resultado es:::::', this.selectgroup);

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
    //console.log(this.fileToUpload);
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
        this.riskService.postFile(data, 'http://10.20.117.74:8080/serviciosenlinea/risks/upload');
      } catch (e) {
        reject();
      }
    });
    return promise;
  }




  guardar(){



if (!this.valida){
  Swal.fire({
    title: 'UPS!!!',
    text: 'Al parecer no has enviado notificaciones:   ' ,
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


    this.riskService.cambioestado(this.id_culminar,'COM').subscribe(resp => {
      //console.log('Correctro:', resp);

      Swal.fire({
        icon: 'success',
        title: 'BUEN TRABAJO',
        text: 'Se ha finalizado correctamente el evento',
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
      this.router.navigate(['/boards']);

    }, err => {
      //console.log('error:   ' + err);
    })


}

   
 
   
  
 }

enviar(){
  //console.log('ENTRA A ENVIAR NOTIFICACIONES')
  
this.data={
  asunto:'NOTIFICACION DE CULMINACION DE EVENTO',
  bodymail:'El evento'+this.id_culminar+' se ha culminado con éxito. ',
  from_mail:'',
  to_mail:this.selectgroup[0].correos,
  imagen_encabezado:'',
  titulo:'RIESGOS',
  nombreempresa:'',
  paginaweb:'',
  emailcon:'',
  adjunto:''


};


  this.riskService.sendmail(this.data).subscribe(resp => {
    //console.log('Correctro:', resp);
if(resp.responseMessage=='Ok'){


    Swal.fire({
      icon: 'success',
      title: 'BUEN TRABAJO',
      text: 'Se han enviado las notificaciones. puedes enviar mas antes de culminar',
      timer: 4000,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
        zippi.play();
      }
      
      //footer: '<a href>Why do I have this issue?</a>'
    });

    
   
    this.valida=true;
  }else{
    Swal.fire({
      title: 'UPS!!!',
      text: 'Tuvimos un problema para culminar el evento:   ' ,
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

}
