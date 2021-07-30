import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProcesoDialogComponent } from "../proceso-dialog/proceso-dialog.component";
import { RiesgosServices } from "../services-riesgos/riesgos-services";
import Swal from "sweetalert2";

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styleUrls: ['./proceso.component.scss']
})
export class ProcesoComponent implements OnInit {
  personForm: FormGroup;
  closeResult: string;
  filter = new FormControl('');
  tipos: any[] = []
  guardar: boolean
  id_tipo_documento: any;
  nombreTipo: any
  users: any[] = []
  validador: boolean = true;
  loading: boolean
  disableSave: boolean;
  procesos: any[] = []
  totalsize: number = 0;
  pageSize: number = 10;
  page: number = 0;
  limit: number = 10;

  constructor(private modalService: NgbModal, private riesgosServices: RiesgosServices) { }

  ngOnInit(): void {
    this.getData(null, null, null)
  }

  loadsearch(e) {
    console.log('ESTA ES LA DATAAAA', e)
    this.getData(0, this.pageSize, e);

  }
  paginator(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getData(e - 1, this.pageSize, null);
  }

  changePag(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getData(0, e, null)
  }
  getData(page, limit, search) {

    this.riesgosServices.getProcesos(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaProcesoooa', data)
      this.procesos = data.data;
      this.totalsize = data.totalElements;

      console.log(this.users)

    });
  }


  openDialog(data) {


    const modalRef = this.modalService.open(ProcesoDialogComponent, { ariaLabelledBy: 'Ingreso de Cliente', size: 'l' });
    modalRef.componentInstance.dataModal = { data: data };
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.getData(null, null, null)
    }, (reason) => {

      this.getData(null, null, null)


    });
  }

  deleteItem(item) {


    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro de eliminar el proceso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {

      /** */
      this.riesgosServices.deleteProceso(item.id_proceso).subscribe(resp => {
        this.notificar('success', 'Se ha eliminado con éxito', 'Ok')
        this.getData(null, null, null)
      }, err => {
        this.notificar('warning', err, 'Ops!')

      });


    }
    )
  }


  notificar(icon, text, title) {
    Swal.fire({
      title: title,
      icon: icon,
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
