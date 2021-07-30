import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { FactService } from '../services/fact.service';

@Component({
  selector: 'app-productmantainer',
  templateUrl: './productmantainer.component.html',
  styleUrls: ['./productmantainer.component.scss']
})
export class ProductmantainerComponent implements OnInit {
  @Input() dataModal;
  productForm: FormGroup;
  id_compania: any;
  dataInicial: any;
  loading: boolean;
  id_item: any;

  constructor(public activeModal: NgbActiveModal,
    
    private factservice:FactService) { }

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
      codigo: new FormControl(null, Validators.required),
      codigo_aux: new FormControl(null, ),
      descripcion: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      
    });
  }
  chargeData(){
if(this.dataInicial){
 this.productForm.get('descripcion').setValue(this.dataInicial.descripcion),
   this.productForm.get('valor').setValue(this.dataInicial.precio_unitario),
   this.productForm.get('codigo_aux').setValue(this.dataInicial.codigo_auxiliar),
   this.productForm.get('codigo').setValue(this.dataInicial.codigo_principal)
}
  }
  onSubmitForm() {
    if(this.productForm.valid){
      var dataguardar={}
      this.loading=true;
      if(this.dataInicial){
         dataguardar={
          descripcion: this.productForm.get('descripcion').value,
          precio_unitario: this.productForm.get('valor').value,
          codigo_auxiliar: this.productForm.get('codigo_aux').value,
          codigo_principal: this.productForm.get('codigo').value,
          id_compania: this.id_compania,
          id_items:this.dataInicial.id_items


          
        }

        this.factservice.updateProduct(dataguardar).subscribe(resp => {

          this.loading=false;
          this.notificar('succes','Se ha actualizado el producto correctamente','Ok')
          this.close();
        
        }, err => {
          this.notificar('warning',err,'Ops');
  
          this.loading=false;
         
          
        });

      }else{
       dataguardar={
        descripcion: this.productForm.get('descripcion').value,
        precio_unitario: this.productForm.get('valor').value,
        codigo_auxiliar: this.productForm.get('codigo_aux').value,
        codigo_principal: this.productForm.get('codigo').value,
        id_compania: this.id_compania
      }
      this.factservice.saveProduct(dataguardar).subscribe(resp => {

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
