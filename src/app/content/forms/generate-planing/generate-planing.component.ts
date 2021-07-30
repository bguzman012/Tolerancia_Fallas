import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/forms.service';
import Swal from "sweetalert2";
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-generate-planing',
  templateUrl: './generate-planing.component.html',
  styleUrls: ['./generate-planing.component.scss']
})
export class GeneratePLaningComponent implements OnInit {
  dataPerson: any={};
  loading:boolean=false;
  id_compania: any;
  dataPlani: any;
  datasource: any[]=[];
  listPlan: any[];
  totalRecords:number=0;
  selectedCuentas: any=[];
  disableSave: boolean;
  planForm: FormGroup;
mostrarsave:boolean=false;
  constructor(private datePipe: DatePipe,
    private formService: FormService,) { }
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
    this.loading=false;
    this.id_compania=JSON.parse(localStorage.getItem('company')).id_compania;
    this.initform();
  }

  

  initform() {

    this.planForm = new FormGroup({
      fecha: new FormControl(null, Validators.required),   

    })

  }
  searchById(val){
    console.log('este es el valor que va a buscar::',val)
    this.getInfoPerson(val);
  }
  getInfoPerson(id) {
    this.formService.getInfoPersonAgent(id).then(data => {

      if(data.status=='OK'){
        this.dataPerson=data.data[0];
        console.log('Esta es la data de las personas agenteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:   ', this.dataPerson)
      }else{
        this.dataPerson={};
        Swal.fire({
          title: 'UPS!!!',
          text: 'No se ha encontrado información de este usuario  ',
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

  generatePlan(){
    console.log('estan yendo estos datos:::::::::::::::::::',this.dataPerson.id_persona,this.id_compania)
    this.formService.getPlan(this.dataPerson.id_persona,this.id_compania).then(data => {

      if(data.status=='OK'){
        this.datasource=data.data;
        this.totalRecords = data.data.length;
        if(this.totalRecords>0){
          this.mostrarsave=true;
        }else{
          this.mostrarsave=false;
        }
        this.loadPlan(null);
        console.log('Esta es la data de las pplaaaaaniiiiiiiiiiiiiiiiiiiiiiiiiiii:   ', this.datasource)
      }else{
        this.dataPerson={};
        Swal.fire({
          title: 'UPS!!!',
          text: 'No se ha encontrado información de este usuario  ',
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




  savePlan(){
    if(this.planForm.valid){
      this.loading=true;


      var d = new Date(this.planForm.get('fecha').value);
      var dt = d.getDate()+1;
      var mn = d.getMonth();
      mn ++;
      var yy = d.getFullYear();
      var newf= dt + "/" + mn + "/" + yy
      

   var dataguardar={
     id_compania:this.id_compania,
     id_agente:this.dataPerson.id_agente,
     fecha_planificacion:newf,
     detalle:this.datasource

   }
    this.formService.savePlan(dataguardar).subscribe(resp => {

      this.loading=false;
      this.disableSave = true;
    }, err => {
      this.disableSave = true;
      this.loading=false;
      Swal.fire({
        title: 'Ups!!',
        text: 'Ha Ocurrido un error  '+ err,
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
  }else{
    Swal.fire({
      title: 'UPS!!!',
      text: 'Revisa los campos requeridos ',
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

  }

  loadPlan(event){
  
    this.loading = true;

   
    setTimeout(() => {
      if(event){
      if (this.datasource) {
        console.log('esta es el datasourceeeee', this.datasource)
        this.listPlan = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }}else{
        if (this.datasource) {
          console.log('esta es el datasourceeeee', this.datasource)
          this.listPlan = this.datasource.slice(0,10);
          this.loading = false;
        }
      }
    }, 1000);
  }

  selectCuenta(event,item){
    console.log('entra al evento check::',item,event.target.checked)

    if(event.target.checked){
   //this.selectedCuentas.push({id_zona:item.id_zona})
   
   }else{
   
   
   
     this.datasource.forEach((item1, index1) => {
       if(item.id_cuenta === item1.id_cuenta){
         this.datasource.splice(index1,1);
       }
     });
     console.log('voy a quitar del arrary')
     this.loadPlan(null);
   } 
   console.log('este es el array finallllllll:::::::::::',this.datasource)
  }

}
