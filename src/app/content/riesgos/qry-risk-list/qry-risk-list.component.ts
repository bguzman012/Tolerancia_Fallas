import { DatePipe } from '@angular/common';
import { IfStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild, ViewEncapsulation, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { DataBalanceService } from '../services-riesgos/dataBalance.service';
import { RiskService } from '../services-riesgos/risk.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const data = {
  chart: {
    caption: "Nordstorm's Customer Satisfaction Score for 2017",
    lowerlimit: "0",
    upperlimit: "100",
    showvalue: "1",
    numbersuffix: "%",
    theme: "fusion",
    showtooltip: "0"
  },
  colorrange: {
    color: [
      {
        minvalue: "0",
        maxvalue: "50",
        code: "#F2726F"
      },
      {
        minvalue: "50",
        maxvalue: "75",
        code: "#FFC533"
      },
      {
        minvalue: "75",
        maxvalue: "100",
        code: "#62B58F"
      }
    ]
  },
  dials: {
    dial: [
      {
        value: "81"
      }
    ]
  }
};


var ELEMENT_DATA6: PeriodicElement[] = [

];

@Component({
  selector: 'app-qry-risk-list',
  templateUrl: './qry-risk-list.component.html',
  styleUrls: ['./qry-risk-list.component.scss'],
})
export class QryRiskListComponent implements OnInit {

  width = 600;
  height = 400;
  type = "angulargauge";
  dataFormat = "json";
  dataSource2 = data;

  dataSource6 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA6);
  displayedColumns: string[] = ['Id', 'Secuencia', 'Evento', 'Estado', 'Riesgo', 'edit'];

  selection = new SelectionModel<PeriodicElement>(true, []);
  public array: any;

  totalsize: number = 0;

  pageSize: number = 10
  page: number = 0;

  limit: number = 10;
  filter = new FormControl('');

  searchForm: FormGroup;
  anioform: FormGroup;
  planform: FormGroup;
  persform: FormGroup;
  objetivoForm: FormGroup;
  lineaForm: FormGroup;
  anio_pre: any;
  plan_pre: any;
  usr: any = 0;
  listEstados = "PEN";
  bandera: boolean = false;

  mostrarperspectiva: boolean = true;
  mostrarobjetivo: boolean = true;
  mostrarlinea: boolean = true;
  front: boolean = true;

  listact: any[];

  listplan: any = [];
  selectedplan: string = '';


  listanio: any = [];
  selectedanio: string = '';


  selectedproceso: any[] = [];
  listProceso: any = [];

  selectedestatus: any[] = [];
  listEstatus: any = [];

  selectedmes: string = '';
  listMes: any = [];

  data: any;
  searchText: any;

  directasVal: any = 0;
  directasCum: any = 0;

  eventualVal: any = 0;
  eventualCum: any = 0;

  totalVal: any = 0;
  totalCum: any = 0;

  selected = '2';
  deshabilitacampos: boolean = true;
  deshPlan: boolean = true;
  deshAnio: boolean = true;
  deshProceso: boolean = true;
  deshEstado: boolean = true;
  deshMes: boolean = true;
  control: number = 1;
  datafromlocal: string;
  user: any;


  bloquearboton: boolean = false;
  listrie6: any;

  constructor(private _formBuilder: FormBuilder,
    public dataService: DataBalanceService, public router: Router,
    public riskService: RiskService
  ) {
    this.bloquearboton = false;
  }

  ngOnInit(): void {
    this.bloquearboton = false;
    var data = JSON.parse(localStorage.getItem('currentUserData'));

    this.dataSource6 = new MatTableDataSource<PeriodicElement>([]);
    let data1 = {
      id:1,
      nombre: "APR",
      descripcion: "Aprobado"
    }
    let data2 = {
      id:2,
      nombre: "VAL",
      descripcion: "Validado"
    }
    let data3 = {
      id:3,
      nombre: "REC",
      descripcion: "Rechazado"
    }
    let data4 = {
      id:4,
      nombre: "ING",
      descripcion: "Ingresado"
    }
    let data5 = {
      id:5,
      nombre: "TRA",
      descripcion: "Tratamiento"
    }
    let data6 = {
      id:6,
      nombre: "FIN",
      descripcion: "Finalizado"
    }
    let data7 = {
      id:7,
      nombre: "REV",
      descripcion: "Revisado"
    }
    let data8 = {
      id:8,
      nombre: "ANA",
      descripcion: "Analizado"
    }

    
    this.listEstatus.push(data1)
    this.listEstatus.push(data2)
    this.listEstatus.push(data3)
    this.listEstatus.push(data4)
    this.listEstatus.push(data5)
    this.listEstatus.push(data6)
    this.listEstatus.push(data7)
    this.listEstatus.push(data8)

    console.log(this.listEstatus, "sinnntuamor")
    this.user = data.detailUsers[0].username;
    this.initForms();
    this.riskService.getDataPre(this.user).subscribe(async resp => {

      console.log("Muerto", resp)
      if (resp.error = 'Ok') {
        console.log('Data>>>>>>>', resp);


        resp.data.forEach(element => {
          if (element.id_rol == 'ADM' || element.id_rol == 'OSI') {
            this.bandera = true;
          }
        });

        

        
        

/**
 * 
      this.riskService.getEstados().subscribe(resp22 => {
        console.log(resp22.data[0].id_estado, "40 y 20")


        this.listEstatus = resp22.data[0].id_estado
        
        resp22.data[0].id_estado.forEach(element => {
          console.log(element[0], "Aweboo")
          
        });
      }, err => {

      })
      
 */

    } else {
      console.log('error')
    }
    }, err => {

});

    //this.fillSelects();

  }

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  this.dataSource6.filter = filterValue;
}
  public handlePage(e: any) {
  //this.currentPage = e.pageIndex;
  this.pageSize = e.pageSize;
  this.iterator();
}
  private iterator() {
  //const end = (this.currentPage + 1) * this.pageSize;
  //const start = this.currentPage * this.pageSize;
  //const part = this.array.slice(start, end);
  //this.dataSource6 = part;
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource6.data.length;
  return numSelected === numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource6.data.forEach(row => this.selection.select(row));
}

/** The label for the checkbox on the passed row */
checkboxLabel(row ?: PeriodicElement): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}


initForms() {
  this.planform = this._formBuilder.group({
    addplan: ['', Validators.required],
  });
  this.anioform = this._formBuilder.group({
    addanio: ['2020', Validators.required],
  });
  this.searchForm = this._formBuilder.group({
    word: ['', Validators.required],
  });
  this.anioform = this._formBuilder.group({
    addanio: ['2020', Validators.required],
  });
  this.persform = this._formBuilder.group({
    addpers: ['', Validators.required],
  });
  this.objetivoForm = this._formBuilder.group({
    addobjetivo: ['', Validators.required],
  });
  this.lineaForm = this._formBuilder.group({
    addLinea: ['', Validators.required],
  });

}

fillSelects() {
  this.fill();
}
async fill() {

}

loadsearch(e) {
  console.log('ESTA ES LA DATAAAA', e)
  this.listar(0,null,e)

}
paginator(e) {
  console.log('entra en el evento de paginator', e - 1)
  this.listar(e -1,this.pageSize,null)
  // this.getlist(this.user, e - 1, this.pageSize, null);
}

changeEstatus(e) {
  console.log(this.selectedestatus, e, "Basilios")
  console.log(this.bandera, "Ohhh no")
  this.listar(null, null, null)
 
}

listar(page, limit, search){
  this.riskService.getAllRiesgoEstadoUserQry((this.bandera ? "null" : this.user), this.selectedestatus,  page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
    console.log('Datos:', resp);
    console.log(resp.additionalResponse, "shre")
    this.totalsize = Number (resp.additionalResponse);
    console.log(this.totalsize, "Francoo")
    this.listrie6 = resp.jsonArray
  

  }, err => {

    //console.log('error:   ' + err);

  })
}

changePag(e) {
  console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
  this.listar(0,e,null)
  //this.getlist(this.user,0, e, null)
}
changeMes(e) {
  console.log(this.selectedmes);
  this.search();
  this.bloquearboton = false;
}

changeAvance(e) {
  console.log(this.selected);
  this.search();
  this.bloquearboton = false;
}

searchByWord(e) {
  console.log(e.target.value);
  this.searchText = e.target.value;
  this.search();
  this.bloquearboton = false;
}

search() {

}

loadList(lista: any) {

  var detalle: any = [];
  lista.forEach(element => {
    detalle.push({
      value: element
    });
  });

  return detalle;
}

message() {
  Swal.fire({
    title: 'Advertencia.',
    text: 'Complete la Información requerida con *',
    icon: 'warning',
    toast: false,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
      zippi.play();
    }
  })
}

editar(e) {
  console.log('ingresa aqui');
  console.log(e);

  if (e.id_estado == "PEN" || e.id_estado == "FDT" || e.id_estado == "RFT") {//FDT 
    localStorage.setItem('detalle', JSON.stringify(e));
    this.router.navigate(['boards/data3/fill/']);
  } else {
    localStorage.setItem('detalleQry', JSON.stringify(e));
    this.router.navigate(['boards/data11/query/']);
  }

}

changePlan(e) {
  console.log('entra al cambio de plannn', e)


  this.listanio = [];
  this.selectedanio = '';
  this.anioform.get('addanio').setValue(null);
  this.fillperiodo(e.value);

}

changeAnio(e) {
  //this.deshabilitacampos = false;
  console.log('entra al cambio de anio', e.value)
  this.search();
}

fillperiodo(val) {
  this.selectedanio = ''
  this.listanio = []
  this.dataService.getPeriodo(val).subscribe(resp => {
    console.log('entra al periodo')
    if (resp.error = 'Ok') {
      console.log('entra al periodoooo', resp)
      this.listanio = resp.data
      //this.mostraranio = false;
    } else {
      console.log('errorrr');

    }
  }, err => {

  })

}

}
