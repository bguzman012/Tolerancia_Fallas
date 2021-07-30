import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProductmantainerComponent } from "../productmantainer/productmantainer.component";
import { FactService } from "../services/fact.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  productForm: FormGroup;
  closeResult: string;
  id_compania: any;
  totalsize:number=0;
  pageSize:number=10;
  page:number=0;
  limit:number=10;
  search:string='';
  filter = new FormControl('');


  listProducts:any[]=[]

  constructor(private modalService: NgbModal,
    private factservice:FactService
    ) {}

  ngOnInit(): void {
  
    this.id_compania=JSON.parse(localStorage.getItem('company')).id_compania

    this.getData(this.id_compania,null,null,null)
  }
getData(id_compania,page,limit,search){
  
  this.factservice.getProducts(this.id_compania, page==null?0:page, limit==null?10:limit, search==null?'':search).then(data => {
    console.log('dataaaaaaaa', data)
    this.listProducts=data.data;
    this.totalsize=data.totalElements;


  });
}
 
  openDialog(data) {


    const modalRef = this.modalService.open(ProductmantainerComponent, { ariaLabelledBy: 'Ingreso de Gestión', size: 'xl' });
    modalRef.componentInstance.dataModal = { id_compania:this.id_compania ,data:data};
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.getData(this.id_compania,null,null,null)   
     }, (reason) => {
    
      this.getData(this.id_compania,null,null,null)
    });
  }


  paginator(e){
    console.log('entra en el evento de paginator',e-1)
    this.getData(this.id_compania,e-1,this.pageSize,null);
  }



  changePag(e)
  {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa',e)
   this.getData(this.id_compania,0,e,null)
  }
  loadsearch(e){
    console.log('ESTA ES LA DATAAAA', e)
  this.getData(this.id_compania,0,this.pageSize,e);

  }

  deleteItem(item){


    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro de eliminar el producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {

this.factservice.deleteProduct(this.id_compania,item.id_items).subscribe(resp => {
 this.notificar('success','Se ha eliminado con éxito','Ok')
  this.getData(this.id_compania,null,null,null)
}, err => {
  this.notificar('success',err,'Ops!')

});


  }
    )}
  

    notificar(icon,text,title){
      Swal.fire({
        title: title,
        icon:icon,
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
