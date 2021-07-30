import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicesUsers } from "../services/service-usuarios.service";
import { ClienteDialogComponent } from "../cliente-dialog/cliente-dialog.component";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

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
  personas: any[] = []
  totalsize: number = 0;
  pageSize: number = 10;
  page: number = 0;
  limit: number = 10;

  constructor(private modalService: NgbModal, private userService: ServicesUsers) { }

  ngOnInit(): void {
    this.getData(null, null, null)
  }

  listarPersonas() {
    this.userService.getPersonas().then(data => {
      this.personas = data.personas;

    })
  }
  listarTipos() {
    this.userService.getIdentificacion().then(data => {
      this.tipos = data.identificacion;

    })
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

    this.userService.getClients(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).then(data => {
      console.log('dataaaaaaaa', data)
      this.personas = data.data;
      this.totalsize = data.totalElements;

      console.log(this.users)

    });
  }
 

  hideDialog() {

  }
  eventotiAgente(item) {
    this.personForm.get('iTipoDocumento').setValue(item.nombre);
    this.nombreTipo = item.nombre
    this.id_tipo_documento = item.id;
  }



  openDialog(data) {


    const modalRef = this.modalService.open(ClienteDialogComponent, { ariaLabelledBy: 'Ingreso de Cliente', size: 'xl' });
    modalRef.componentInstance.dataModal = { data: data };
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.getData(null, null, null)
    }, (reason) => {

      this.getData(null, null, null)


    });
  }


  onSubmitForm() { }
  deleteItem(item) {


    Swal.fire({
      title: 'Eliminar',
      text: "¿Está seguro de eliminar el cliente?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {

      /** */
      this.userService.deletePerson(item.id).subscribe(resp => {
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

