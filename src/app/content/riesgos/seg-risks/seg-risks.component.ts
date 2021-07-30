import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { RiskService } from '../services-riesgos/risk.service';
import Swal from "sweetalert2";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ParseSourceSpan } from '@angular/compiler';
import { MatPaginator } from '@angular/material/paginator';

import { DiaRisksComponent } from '../dia-risk/dia-risks.component';
import { ComRisksComponent } from '../com-risk/com-risks.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface DialogData {
  animal: string;
  name: string;
}

var ELEMENT_DATA: PeriodicElement[] = [

];
var ELEMENT_DATA2: PeriodicElement[] = [

];
var ELEMENT_DATA3: PeriodicElement[] = [

];
var ELEMENT_DATA4: PeriodicElement[] = [

];
var ELEMENT_DATA5: PeriodicElement[] = [

];
var ELEMENT_DATA6: PeriodicElement[] = [

];

@Component({
  selector: 'app-seg-risks',
  templateUrl: './seg-risks.component.html',
  styleUrls: ['./seg-risks.component.scss']
})
export class SegRisksComponent implements OnInit {
  
  public currentPage = 0;
  public totalSize = 0;
  /*   @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatPaginator) paginator2: MatPaginator;
  
    @ViewChild(MatPaginator) paginator3: MatPaginator;
  
    @ViewChild(MatPaginator) paginator4: MatPaginator;
  
    @ViewChild(MatPaginator) paginator6: MatPaginator; */

  animal: string;
  name: string;

  displayedColumns: string[] = ['Id', 'Secuencia', 'Evento', 'Estado', 'Riesgo', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA2);
  dataSource3 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA3);
  dataSource4 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA4);

  personForm: FormGroup;
  closeResult: string;
  filter = new FormControl('');
  tipos: any[] = []

  id_tipo_documento: any;
  nombreTipo: any
  users: any[] = []
  validador: boolean = true;
  loading: boolean
  disableSave: boolean;
  procesos: any[] = []
  totalsize: number = 0;
  totalsize2: number = 0;
  totalsize3: number = 0;
  totalsize4: number = 0;
  //pageSize: number = 10;
  pageSize: number = 10
  page: number = 0;
  
  limit: number = 10;

  pageSize2: number = 10
  page2: number = 0;
  
  limit2: number = 10;

  pageSize3: number = 10
  page3: number = 0;
  
  limit3: number = 10;

  pageSize4: number = 10
  page4: number = 0;
  
  limit4: number = 10;

  dataSource6 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA6);




  selection = new SelectionModel<PeriodicElement>(true, []);

  maxImages: any = [1];
  imgList: any = [];
  fileToUpload: File = null;
  uploading: boolean = false;
  user: any;
  listrie: any[];
  isLinear = true;

  form: FormGroup;
  horizontalStepperStep1: FormGroup;
  horizontalStepperStep2: FormGroup;
  horizontalStepperStep3: FormGroup;
  horizontalStepperStep4: FormGroup;
  horizontalStepperStep6: FormGroup;

  listrie4: any;

  listrie3: any;
  listrie2: any;
  listrie6: any;
  img1: any;
  indice: any;
  dataSourceX: any;

  constructor(private _formBuilder: FormBuilder, public riskService: RiskService, public router: Router, public dialog: MatDialog, public MatDialog: MatDialog) { }
  fields = [{ id: 'causa1', label: '', value: '' }, { id: 'causa2', label: '', value: '' }, { id: 'causa3', label: '', value: '' }];
  fieldscon = [{ id: 'consec1', label: '', value: '' }, { id: 'consec2', label: '', value: '' }, { id: 'consec3', label: '', value: '' }];
  formdynamico = new FormGroup({});
  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem('currentUserData'));

    this.user = data.detailUsers[0].username
    //this.getlist(this.user, null, null, null);
    this.llenatablas();

    this.horizontalStepperStep1 = this._formBuilder.group({

    });

    this.horizontalStepperStep2 = this._formBuilder.group({

    });

    this.horizontalStepperStep3 = this._formBuilder.group({

    });

    this.horizontalStepperStep4 = this._formBuilder.group({

    });


    this.horizontalStepperStep6 = this._formBuilder.group({

      basicfile: [''],
    });

  }
  llenatablas() {
    console.log('LLENA TABLAS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    this.getlistestado('TRA', null, null, null);
    this.getlistestado2('APR', null, null, null);
    this.getlistestado6('VAL', null, null, null);
    this.getlistestado4('FIN', null, null, null);

  }

  // this.getlistestado6('VAL', null, null, null);
  //this.getlistestado4('FIN', null, null, null);

  changePag(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlistestado('TRA',0, e, null)
  }
  changePag2(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlistestado2('APR', 0, e, null);
  }
  changePag3(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlistestado6('VAL', 0, e, null);
  }

  changePag4(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlistestado4('FIN', 0, e, null);
  }


 

  loadsearch(e) {
    this.getlistestado2('TRA', 0, this.pageSize, e)


  }
  loadsearch2(e){

    this.getlistestado2('APR', 0, this.pageSize2, e)
  }

  loadsearch3(e){

    this.getlistestado6('VAL', 0, this.pageSize3, e);
    
  }
  loadsearch4(e){

    this.getlistestado4('FIN', 0, this.pageSize4, e);
  }

  abrirDialog(e): void {

    console.log(e);
    var id = e.id_riesgo;
    //console.log('este es el id................................',id);
    localStorage.setItem('id_culminar', id);
    const dialogRef = this.dialog.open(DiaRisksComponent, {
      width: '500px',
      data: { id_culminar: id, url: e.url_adjunto }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.getlistestado6('VAL', null, null, null);
      this.getlistestado4('FIN', null, null, null);
      this.animal = result;
    });
  }
  abrirDialogcom(e): void {
    var id = e.id_riesgo;
    //console.log('este es el id................................',id);
    localStorage.setItem('id_comunicar', id);
    const dialogRef = this.dialog.open(ComRisksComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.animal = result;
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  paginator(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlistestado('TRA', e - 1, this.pageSize, null);
  }
  paginator2(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlistestado2('APR', e - 1, this.pageSize2, null);
  }

  paginator3(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlistestado6('VAL', e - 1, this.pageSize3, null);
  }

  paginator4(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlistestado4('FIN', e - 1, this.pageSize4, null);
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  getlist(user, page, limit, search) {

    this.riskService.getlistRiskAna(user, page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      this.listrie = resp.jsonArray
      this.totalsize = Number (resp.additionalResponse);
      ////console.log('LISTAD E RIESGOS:', this.listrie);
      
    }, err => {

      //console.log('error:   ' + err);

    })
  }

  getlistestado(estado, page, limit, search) {

    this.riskService.getlistRiskAnaestado(estado, page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      console.log('Datos 1111111111111111111111111111111111111111111111111111:', resp);

      this.listrie = resp.jsonArray
      this.totalsize = Number (resp.additionalResponse);
  
    }, err => {

      //console.log('error:   ' + err);

    })
  }

  getlistestado2(estado, page, limit, search) {

    console.log("Guararei", estado)
    this.riskService.getlistRiskAnaestado(estado,page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      console.log(resp, "Ahora te puedes marchar")
      this.listrie2 = resp.jsonArray
      this.totalsize2 = Number (resp.additionalResponse);
      // //console.log('LISTAD E RIESGOS:', this.listrie);
      ELEMENT_DATA2 = this.listrie2;
      this.dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA2);

     // this.dataSource2.paginator = this.paginator.toArray()[1];
     // this.paginator.toArray()[1]._intl.itemsPerPageLabel = 'Items por página';
    }, err => {

      //console.log('error:   ' + err);

    })
  }
  getlistestado3(estado, page, limit, search) {

    this.riskService.getlistRiskAnaestado(estado, page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      this.listrie3 = resp.jsonArray
      ////console.log('LISTAD E RIESGOS:', this.listrie3);
      ELEMENT_DATA3 = this.listrie3;
      this.dataSource3 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA3);

      //this.dataSource3.paginator = this.paginator.toArray()[3];
      //this.paginator.toArray()[3]._intl.itemsPerPageLabel = 'Items por página';
    }, err => {

      //console.log('error:   ' + err);

    })
  }
  getlistestado6(estado, page, limit, search) {

    this.riskService.getlistRiskAnaestado(estado, page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      this.listrie6 = resp.jsonArray
      this.totalsize3 = Number (resp.additionalResponse);
      ////console.log('LISTAD E RIESGOS:', this.listrie);
      ELEMENT_DATA6 = this.listrie6;
      this.dataSource6 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA6);
     // this.dataSource6.paginator = this.paginator.toArray()[2];
     // this.paginator.toArray()[2]._intl.itemsPerPageLabel = 'Items por página';
    }, err => {

      //console.log('error:   ' + err);

    })
  }

  getlistestado4(estado, page, limit, search) {

    this.riskService.getlistRiskAnaestado(estado, page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      console.log("Sin tu amooor", resp)
      this.listrie4 = resp.jsonArray
      this.totalsize4 = Number (resp.additionalResponse);

    }, err => {

      //console.log('error:   ' + err);

    })
  }
  aprobarRiesgo(e) {
    //console.log('ingresa aqui aprobar')
    //console.log(e)
    var id = e.id_riesgo;
    var estado = 'APR';


    Swal.fire({
      title: 'Finalizar',
      text: "¿Esta seguro de Aprobar el evento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.riskService.cambioestado(id, estado).subscribe(resp => {
          //console.log('Correctro:', resp);

          this.ngOnInit();

        }, err => {

          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al almacenar el analisis:   ',
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
      } else {
        Swal.fire({
          title: 'OK',
          text: 'No hemos aprobado nada:   ',
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
    })



  }




  rechazarRiesgo(e) {
    //console.log('ingresa aqui aprobar')
    //console.log(e)
    var id = e.id_riesgo;
    var estado = 'REC';


    Swal.fire({
      title: 'Finalizar',
      text: "¿Esta seguro de RECHAZAR el evento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.riskService.cambioestado(id, estado).subscribe(resp => {
          //console.log('Correctro:', resp);

          this.ngOnInit();

        }, err => {

          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al almacenar el analisis:   ',
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
      } else {
        Swal.fire({
          title: 'OK',
          text: 'No hemos aprobado nada:   ',
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
    })







  }

  finalizarRiesgo(e, el) {
    //console.log('ingresa aqui')
    //console.log(el)
    //console.log('Victor   ' + JSON.stringify(e))
    Swal.fire({
      title: 'Finalizar',
      text: "Como se cerro el Evento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'A Tiempo',
      cancelButtonText: 'Fuera de Tiempo'
    }).then((result) => {
      if (result.value) {
        this.guardar(e, el);
      } else {
        //console.log('cancelasdasdasdasdasdasdasd');
        this.guardar(e, el);

      }
    })
  }
  guardar(e, el) {


    if (e == null) {

      //console.log('entraa guardar fuera de tiempo');

      var id = el.id_riesgo;
      var estado = 'FIN';

      this.riskService.cambioestadoUrl(id, estado, this.img1, '0').subscribe(resp => {
        //console.log('Correctro:', resp);

        this.ngOnInit();

      }, err => {

        //console.log('error:   ' + err);

      })

    } else {
      //console.log(el);
      //console.log('entra a iniciiiiiiiiiiiiiiiiiiiiiiiiar')
      //console.log(e);
      var id = el.id_riesgo;
      var estado = 'FIN';

      this.riskService.cambioestadoUrl(id, estado, this.img1, '0').subscribe(resp => {
        //console.log('Correctro:', resp);

        this.ngOnInit();

      }, err => {

        //console.log('error:   ' + err);

      })


    }
    //console.log('entra aqui',e);
  }
  comunicarRiesgo(e) {
    //console.log('ingresa aqui')
    //console.log(e)
    //console.log('Victor   ' + JSON.stringify(e))

    Swal.fire({
      title: 'Enviar Comunicado',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }


  iniciarRiesgo(e) {
    //console.log('entra a iniciiiiiiiiiiiiiiiiiiiiiiiiar')
    var id = e.id_riesgo;
    var estado = 'VAL';


    Swal.fire({
      title: 'Finalizar',
      text: "¿Esta seguro de INICIAR el evento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.riskService.cambioestado(id, estado).subscribe(resp => {
          //console.log('Correctro:', resp);

          this.ngOnInit();

        }, err => {

          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al almacenar el analisis:   ',
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
      } else {
        Swal.fire({
          title: 'OK',
          text: 'No hemos iniciado nada:   ',
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
    })




  }
  next(paso) {




  }


  clickInputFile(i) {

    //console.log('IMAGEEEEEEEEEEEEEEN',i)

    let input = document.getElementById("imageQuest" + i);
    //console.log("imageQuest" + i,input)
    input.click();
  }
  renderImage(e, index) {
    //console.log('entra aqui',e, index)
    let reader = new FileReader();
    this.imgList[0] = e.target.files[0];

    reader.readAsDataURL(e.target.files[0]);
    this.fileToUpload = this.imgList[0];
    //console.log(this.fileToUpload);

    this.pushimagen(this.imgList[0], 0);

    this.img1 = this.imgList[0].name;



    /*    setTimeout(() => {
         let img = <HTMLDivElement>document.querySelector(".img-default" + index);
        // img.style.backgroundImage = `url(${reader.result})`
        img.style.backgroundImage = `url(https://thumbs.dreamstime.com/b/icono-de-documento-los-varios-archivos-logo-design-element-122728126.jpg)`
       }, 300);  */

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

  applyFilter(filterValue: string) {

    console.log('ENTRA AL PRIMER FILTRO')
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSourceX.filter = filterValue;
  }
  applyFilter2(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }
  applyFilter3(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource3.filter = filterValue;
  }
  applyFilter4(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource4.filter = filterValue;
  }
  applyFilter6(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource6.filter = filterValue;
  }


  reevaluarRiesgo(e) {
    console.log('ingresa a reevaluar riesgo');

    var id = e.id_riesgo;
    var estado = 'REV';


    Swal.fire({
      title: 'Finalizar',
      text: "¿Esta seguro de reevaluar el evento?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
        this.riskService.cambioestado(id, estado).subscribe(resp => {
          //console.log('Correctro:', resp);

          this.ngOnInit();

        }, err => {

          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error al almacenar:   ',
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
      } else {
        Swal.fire({
          title: 'OK',
          text: 'No hemos aprobado nada:   ',
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
    })

  }


}

