import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import Swal from "sweetalert2";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { RiskService } from '../services-riesgos/risk.service';

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
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Secuencia', 'Evento', 'Estado', 'Riesgo', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  user: any;
  listrie: any[];
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;





  constructor(private _formBuilder: FormBuilder, public riskService: RiskService, public router: Router, public risk: RiskService) { }
  fields = [{ id: 'causa1', label: '', value: '' }, { id: 'causa2', label: '', value: '' }, { id: 'causa3', label: '', value: '' }];
  fieldscon = [{ id: 'consec1', label: '', value: '' }, { id: 'consec2', label: '', value: '' }, { id: 'consec3', label: '', value: '' }];
  formdynamico = new FormGroup({});
  ngOnInit(): void {
    var data = JSON.parse(localStorage.getItem('currentUserData'));

    this.user = data.detailUsers[0].username
    //this.user='etene'


  }
  descargarreporte() {
    this.loading = true

    this.risk.getreport().subscribe(resp => {
      //console.log('Datos:', resp.response);

      window.open(resp.response, '_blank');
      this.loading = false
    }, err => {

      //console.log('error:   ' + err);
      this.loading = false
    })
  }
  descargarreportemapa() {
    this.loading = true

    this.risk.getreportmapa().subscribe(resp => {
      //console.log('Datos:', resp.response);

      window.open(resp.response, '_blank');
      this.loading = false
    }, err => {

      //console.log('error:   ' + err);
      this.loading = false
    })
  }

}
