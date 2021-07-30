import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RiskService} from '../services-riesgos/risk.service'
import Swal from "sweetalert2";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ProcesoDialogComponent } from "../proceso-dialog/proceso-dialog.component";
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
var ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-listRiskTra',
  templateUrl: './listRiskTra.component.html',
  styleUrls: ['./listRiskTra.component.scss']
})
export class ListRiskTraComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Secuencia', 'Evento', 'Estado', 'Riesgo', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  user: any;
  listrie: any[];
  //public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
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
  
  pageSize: number = 10
  page: number = 0;
  
  limit: number = 10;
      

  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
  }


  constructor(private modalService: NgbModal, private _formBuilder: FormBuilder, public riskService: RiskService,public router:Router) { }
  fields = [{ id: 'causa1', label: '', value: '' }, { id: 'causa2', label: '', value: '' }, { id: 'causa3', label: '', value: '' }];
  fieldscon = [{ id: 'consec1', label: '', value: '' }, { id: 'consec2', label: '', value: '' }, { id: 'consec3', label: '', value: '' }];
  formdynamico = new FormGroup({});
  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem('currentUserData'));

    this.user = data.detailUsers[0].username
    //this.user='etene'
    this.getlist(this.user, null, null, null);


  }
  paginator(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlist(this.user, e - 1, this.pageSize, null);
  }
  changePag(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlist(this.user,0, e, null)
  }
  openDialog(data) {


    const modalRef = this.modalService.open(ProcesoDialogComponent, { ariaLabelledBy: 'Ingreso de Cliente', size: 'l' });
    modalRef.componentInstance.dataModal = { data: data };
    modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      //this.getData(null, null, null)
    }, (reason) => {

      //this.getData(null, null, null)


    });
  }

  loadsearch(e) {
    console.log('ESTA ES LA DATAAAA', e)
    this.getlist(this.user,0, null, e)

  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;   
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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

    this.riskService.getAllRiesgoEstadoUser(user, page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      console.log('Estoy confundido:', resp);
      this.listrie = resp.jsonArray
      console.log('LISTAD E RIESGOS:', this.listrie);
      ELEMENT_DATA = this.listrie;
      this.totalsize = Number (resp.additionalResponse);
      //Number (resp.additionalResponse);
      this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    //  this.dataSource.paginator = this.paginator;
   //   this.paginator._intl.itemsPerPageLabel = 'Items por página';
    }, err => {

      //console.log('error:   ' + err);

    })
  }
  editarRiesgo(e) {
    //console.log('ingresa aqui')
    //console.log(e)
    //console.log('MAOOOOOOO' + JSON.stringify(e))

    localStorage.setItem('trarisk',JSON.stringify(e));
    this.router.navigate(['default/riesgos/tratamiento']);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 

}
