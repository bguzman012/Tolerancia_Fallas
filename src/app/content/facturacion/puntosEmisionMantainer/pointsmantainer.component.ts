import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { PointService } from '../services/points.service';

@Component({
  selector: 'app-pointsmantainer',
  templateUrl: './pointsmantainer.component.html',
  styleUrls: ['./pointsmantainer.component.scss']
})
export class PointsmantainerComponent implements OnInit {
  @Input() dataModal;
  productForm: FormGroup;
  id_compania: any;
  dataInicial: any;
  loading: boolean;
  id_item: any;

  constructor(public activeModal: NgbActiveModal,
    
    private pointservice:PointService) { }

  ngOnInit(): void {
    (function () {
      'use strict'

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
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
    this.id_compania = this.dataModal.id_compania;
    this.dataInicial = this.dataModal.data;
    console.log('esta es la data inicial',this.dataInicial,this.id_compania)
    this.inintForm();
    this.chargeData();
  }
  inintForm() {
    this.productForm = new FormGroup({
      establecimiento: new FormControl(null, Validators.required),
      punto_emision: new FormControl(null,Validators.required ),
      direccion: new FormControl(null, Validators.required),
      
    });
  }
  chargeData(){
if(this.dataInicial){
 this.productForm.get('establecimiento').setValue(this.dataInicial.establecimiento),
   this.productForm.get('punto_emision').setValue(this.dataInicial.punto_emision),
   this.productForm.get('direccion').setValue(this.dataInicial.direccion)
}
  }
  onSubmitForm() {
    if(this.productForm.valid){
      var dataguardar={}
      this.loading=true;
      if(this.dataInicial){
         dataguardar={
          establecimiento: this.productForm.get('establecimiento').value,
          punto_emision: this.productForm.get('punto_emision').value,
          direccion: this.productForm.get('direccion').value,        
          id_compania: this.id_compania,
          id_items:this.dataInicial.id_items
          
        }

        this.pointservice.updatePoint(dataguardar).subscribe(resp => {

          this.loading=false;
          this.notificar('succes','Se ha actualizado el producto correctamente','Ok')
          this.close();
        
        }, err => {
          this.notificar('warning',err,'Ops');
  
          this.loading=false;
         
          
        });

      }else{
       dataguardar={
        establecimiento: this.productForm.get('establecimiento').value,
        punto_emision: this.productForm.get('punto_emision').value,
        direccion: this.productForm.get('direccion').value,
        id_compania: this.id_compania
      }
      this.pointservice.savePoint(dataguardar).subscribe(resp => {

        this.loading=false;
        this.notificar('succes','Se ha creado el producto correctamente','Ok')
        this.close();
      
      }, err => {
        this.notificar('warning',err,'Ops');

        this.loading=false;
       
        
      });
    }
  

    }
    console.log('entra en el submit')
  }
  close(){
this.activeModal.dismiss();
  }
  notificar(icon,text,title){
    Swal.fire({
      title: 'Ups!!',
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
