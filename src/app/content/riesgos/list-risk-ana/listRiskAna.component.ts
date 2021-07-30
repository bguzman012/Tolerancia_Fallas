import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { RiskService } from '../services-riesgos/risk.service';
import Swal from "sweetalert2";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DiaAnaComponent } from '../dia-ana/dia-ana.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
var ELEMENT_DATA: PeriodicElement[] = [

];

var ELEMENT_DATA2: PeriodicElement[] = [

];

@Component({
  selector: 'app-listRiskAna',
  templateUrl: './listRiskAna.component.html',
  styleUrls: ['./listRiskAna.component.scss']
})
export class ListRiskAnaComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Secuencia', 'Evento', 'Estado', 'Riesgo', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dataSource2 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  selection = new SelectionModel<PeriodicElement>(true, []);
  user: any;
  listrie: any[];
  listrie_rev: any[];

  public array: any;
  /*   public displayedColumns = ['', '', '', '', ''];
    public dataSource: any;  */

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public totalSize2 = 0;

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
  totalsize2: number = 0;
  //pageSize: number = 10;
  pageSize2: number = 10
  page: number = 0;
  page2: number = 0;
  
  limit: number = 10;

  animal: any;


  
  constructor(private _formBuilder: FormBuilder, public riskService: RiskService, public router: Router, public dialog: MatDialog, public MatDialog: MatDialog) { }
  fields = [{ id: 'causa1', label: '', value: '' }, { id: 'causa2', label: '', value: '' }, { id: 'causa3', label: '', value: '' }];
  fieldscon = [{ id: 'consec1', label: '', value: '' }, { id: 'consec2', label: '', value: '' }, { id: 'consec3', label: '', value: '' }];
  formdynamico = new FormGroup({});
  ngOnInit(): void {

    var data = JSON.parse(localStorage.getItem('currentUserData'));
    this.user = data.detailUsers[0].username
    //this.user='etene'
    this.getlist(this.user, null, null, null);
    this.getlistRiskRev(this.user, null,null,null);


  }
  paginator(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlist(this.user, e - 1, this.pageSize, null);
  }
  paginator2(e) {
    console.log('entra en el evento de paginator', e - 1)
    this.getlistRiskRev(this.user, e - 1, this.pageSize, null);
  }
  changePag(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlist(this.user,0, e, null)
  }
  changePag2(e) {
    console.log('este es el tamaño de l apaginaaaaaaaaaaaaaaaaaaaaaaa', e)
    this.getlistRiskRev(this.user,0, e, null)
  }

 

  loadsearch(e) {
    console.log('ESTA ES LA DATAAAA', e)
    this.getlist(this.user,0, this.pageSize, e);


  }
  loadsearch2(e) {
    console.log('ESTA ES LA DATAAAA', e)
    this.getlistRiskRev(this.user,0, this.pageSize, e);

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  applyFilter2(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
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

    this.riskService.getlistRiskAna(user,page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      this.listrie = resp.jsonArray
      console.log(resp, "sloww")
      this.totalsize = Number (resp.additionalResponse);
      

      console.log(this.listrie, "Elviis")

      /* this.dataSource.paginator = this.paginator;
      this.array = resp;
      this.totalSize = this.array.length;
      this.iterator();  */
    }, err => {

      //console.log('error:   ' + err);

    })
  }


  getlistRiskRev(user, page, limit, search) {


    this.riskService.getlistRiskRev(page == null ? 0 : page, limit == null ? 10 : limit, search == null ? '' : search).subscribe(resp => {
      //console.log('Datos:', resp);

      this.listrie_rev = resp.jsonArray
      console.log(resp, "Bachatuuu")
      
      this.totalsize2 = Number (resp.additionalResponse);
    }, err => {

      //console.log('error:   ' + err);

    })
  }






  editarRiesgo(e) {
    console.log('ingresa aqui')
    console.log(e)
    //console.log('MAOOOOOOO' + JSON.stringify(e))

    if (e.ide_riesgo == 'BAJO') {
      this.abrirDialogcom(e);
    } else {
      localStorage.setItem('anarisk', JSON.stringify(e));
      this.router.navigate(['/default/riesgos/ana-risk']);

    }


  }


  abrirDialogcom(e): void {
    var id = e.id_riesgo;


    const dialogRef = this.dialog.open(DiaAnaComponent, {
      width: '500px',
      data: { name: id, animal: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.animal = result;
    });
  }





}
