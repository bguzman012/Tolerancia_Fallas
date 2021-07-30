import { Component, OnInit } from '@angular/core';


import { RiskService} from '../services-riesgos/risk.service'
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from "sweetalert2";


@Component({
  selector: 'app-tra-risks',
  templateUrl: './tra-risks.component.html',
  styleUrls: ['./tra-risks.component.scss']
})
export class TraRisksComponent implements OnInit {
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;

  horizontalStepperStep3: FormGroup;
  horizontalStepperStep4: FormGroup;
  horizontalStepperStep5: FormGroup;

  minimocampos: number;
  maximocampos: number;
  currentfields: number;
  currentfieldscon: number=0;

  panelOpenState = false;

procesos:any[];
  datosguardar: any;
  eventoana: any;

 
  listacciones: any=[];
  listactividades: any=[];
  listcresp: any=[];
  listrespact: any=[];
  listfecha: any=[];

  constructor(private _formBuilder: FormBuilder, public riskService: RiskService,public router:Router) { }
  fields = [{ id: 'accion1', label: 'Acción 1', value: '' },
  { id: 'accion2', label: 'Acción 2', value: '' },
  { id: 'accion3', label: 'Acción 3', value: '' }
];

fieldscon = [
{ id: 'accion1', label: '', value: '',id2:'act1',id3:'resp1',id4:'respac1',id5:'fecha1' }, 
{ id: 'accion2', label: '', value: '',id2:'act2',id3:'resp2' ,id4:'respac2',id5:'fecha2'  }, 
{ id: 'accion3', label: '', value: '',id2:'act3',id3:'resp3' ,id4:'respac3' ,id5:'fecha3' }];




fields2 = [{ id: 'act1', label: 'Actividad 1', value: '' },
{ id: 'act2', label: 'Actividad 2', value: '' },
{ id: 'act3', label: 'Actividad 3', value: '' }
];
fields3 = [{ id: 'resp1', label: 'Ejecución 1', value: '' },
{ id: 'resp2', label: 'Ejecución 2', value: '' },
{ id: 'resp3', label: 'Ejecución 3', value: '' }];
fields4 = [{ id: 'respac1', label: 'Responsable Acción 1', value: '' },
{ id: 'respac2', label: 'Responsable Acción 2', value: '' },
{ id: 'respac3', label: 'Responsable Acción 3', value: '' }];
fields5 = [{ id: 'fecha1', label: 'Fecha Cierre 1', value: '' },
{ id: 'fecha2', label: 'Fecha Cierre 2', value: '' },
{ id: 'fecha3', label: 'Fecha Cierre 3', value: '' }];
accion1:string;
accion2:string;
accion3:string;
actividad1:string;
actividad2:string;
actividad3:string;
resp1:string;
resp2:string;
resp3:string;
respa1:string;
respa2:string;
respa3:string;
fecha1:string;
fecha2:string;
fecha3:string;
contador: number=0;

  ngOnInit(): void {
    const data=localStorage.getItem('trarisk')
    this.eventoana=JSON.parse(data);
console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',this.eventoana)

    this.minimocampos = 3;
    this.currentfields = 3;
    this.currentfieldscon = 3;
    this.maximocampos = 6;
    this.horizontalStepperStep1 = this._formBuilder.group({});
    this.horizontalStepperStep2 = this._formBuilder.group({});
    this.horizontalStepperStep3 = this._formBuilder.group({});
    this.horizontalStepperStep4 = this._formBuilder.group({});
    this.horizontalStepperStep5 = this._formBuilder.group({});


    this.fieldscon.forEach(x => {
      if(this.contador==0){
        this.horizontalStepperStep1.addControl(x.id2, new FormControl(x.value, Validators.required))
        this.horizontalStepperStep1.addControl(x.id3, new FormControl(x.value, Validators.required))
        this.horizontalStepperStep1.addControl(x.id5, new FormControl(x.value, Validators.required))
      }
      this.horizontalStepperStep1.addControl(x.id2, new FormControl(x.value))
      this.horizontalStepperStep1.addControl(x.id3, new FormControl(x.value))
      this.horizontalStepperStep1.addControl(x.id5, new FormControl(x.value))
      this.contador+=1;
     
    })
    


    this.procesos=[{id:1,nombre:'CONSEJO DE ADMINISTRACION'}],{id:1,nombre:'CONSEJO DE ADMINISTRACION2'};
        this.fields.forEach(x => {
     // this.horizontalStepperStep1.addControl(x.id, new FormControl(x.value, Validators.required))
    })
  
  }

 

  next(){
    this.accion1=this.horizontalStepperStep1.get('accion1').value;
    this.accion2=this.horizontalStepperStep1.get('accion2').value;
    this.accion3=this.horizontalStepperStep1.get('accion3').value;

  }
  next2(){
    this.actividad1=this.horizontalStepperStep2.get('act1').value;
    this.actividad2=this.horizontalStepperStep2.get('act2').value;
    this.actividad3=this.horizontalStepperStep2.get('act3').value;

  }
  next3(){
    this.resp1=this.horizontalStepperStep3.get('resp1').value;
    this.resp2=this.horizontalStepperStep3.get('resp2').value;
    this.resp3=this.horizontalStepperStep3.get('resp3').value;

  }
  next4(){
    this.respa1=this.horizontalStepperStep4.get('respac1').value;
    this.respa2=this.horizontalStepperStep4.get('respac2').value;
    this.respa3=this.horizontalStepperStep4.get('respac3').value;

  }
  next5(){
    this.fecha1=this.horizontalStepperStep5.get('fecha1').value;
    this.fecha2=this.horizontalStepperStep5.get('fecha2').value;
    this.fecha3=this.horizontalStepperStep5.get('fecha3').value;

  }

  guardar(){
    this.listacciones=[]
    this.listactividades=[]
    this.listcresp=[]
    this.listrespact=[]
    this.listfecha=[]
var data=[];


this.fieldscon.forEach(x => {
  console.log('AQUIIIIIIIIIIIIIIIIIIIII')
  //this.listacciones.push(this.horizontalStepperStep1.get(x.id).value)
  this.listactividades.push(this.horizontalStepperStep1.get(x.id2).value)
  this.listcresp.push(this.horizontalStepperStep1.get(x.id3).value)
  //this.listrespact.push(this.horizontalStepperStep1.get(x.id4).value)
  this.listfecha.push(this.horizontalStepperStep1.get(x.id5).value)
})
; 
    this.datosguardar = {
      dcabe:this.eventoana.id_riesgo,
      //listacciones:this.listacciones,
      listactividades:this.listactividades,
      listcresp:this.listcresp,
     // listrespact:this.listrespact,
      listfecha:this.listfecha

    } 
console.log('MAOOOOOOOOOOOO')
console.log(JSON.stringify(this.datosguardar));

if(this.horizontalStepperStep1.invalid){
  Swal.fire({
    title: 'Error',
    text: 'Debe ingresar todos los campos:   ' ,
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


  Swal.fire({
    title: 'Finalizar',
    text: "Al guardar usted acepta el riesgo residual de este evento."+ this.eventoana.valor_riesgo_residual+ "¿Desea Guardar?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, estoy seguro',
    cancelButtonText: 'No, cancelar'
  }).then((result) => {
 if (result.value) {
    console.log('EL FORMULARIO validooooooooooooo')




    this.riskService.almacenamientoTratamiento(this.datosguardar).subscribe(resp => {
    
      if(resp.responseMessage=='Ok'){
        localStorage.removeItem('anarisk');
        Swal.fire({
          icon: 'success',
          title: 'BUEN TRABAJO',
          text: 'Se ha guardado el tratamiento con éxito',
          timer: 5000,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
   
        });
        console.log(localStorage.getItem('idproceso'), "3 0 coqueta te acuerdas y te duele" )
        this.router.navigate(['default/riesgos/list-tra']);

      }else{
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al almacenar el tratamiento:   ' ,
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
this.ngOnInit();

    }, err => {
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al almacenar el tratamiento:   ' ,
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
      

    })
    
  }
  
  else{
    Swal.fire({
      title: 'OK',
      text: 'No hemos aprobado nada:   ' ,
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
  });
}
  }


  agregacampo(step) {
   
    if (step == 3) {
      if(this.currentfields<5){
      this.currentfieldscon += 1;
    
      //console.log('entra en agregar campo', this.horizontalStepperStep3)
      this.fieldscon.push({ id: 'accion' + this.currentfieldscon, label: '', value: '',id2:'act'+this.currentfieldscon,id3:'resp'+this.currentfieldscon,id4:'respac'+this.currentfieldscon,id5:'fecha'+ this.currentfieldscon});
      this.horizontalStepperStep1.addControl('accion' + this.currentfieldscon, new FormControl('', Validators.required))
      this.horizontalStepperStep1.addControl('act' + this.currentfieldscon, new FormControl('', Validators.required))
      this.horizontalStepperStep1.addControl('resp' + this.currentfieldscon, new FormControl('', Validators.required))
      this.horizontalStepperStep1.addControl('respac' + this.currentfieldscon, new FormControl('', Validators.required))
      this.horizontalStepperStep1.addControl('fecha' + this.currentfieldscon, new FormControl('', Validators.required))
      }
    }



  }

  deletecausa(step) {
    //console.log('maoooooo'+this.currentfields)
  
  if(this.currentfieldscon>1){
    if (step == 3) {
      //console.log('ingresa a eliminar', 'consec' + this.currentfieldscon)
      this.fieldscon.splice(this.currentfieldscon - 1);

      this.horizontalStepperStep1.removeControl('accion' + this.currentfieldscon)
      this.horizontalStepperStep1.removeControl('act' + this.currentfieldscon)
      this.horizontalStepperStep1.removeControl('resp' + this.currentfieldscon)
      this.horizontalStepperStep1.removeControl('respac' + this.currentfieldscon)
      this.horizontalStepperStep1.removeControl('fecha' + this.currentfieldscon)
      this.currentfieldscon -= 1;
    }

  }
}
}
