import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';


import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  search: new URLSearchParams()
};
@Injectable({
  providedIn: 'root'
})
export class DataBalanceService {

  formData: any[];
  onSearchTextChanged: Subject<any>;
  onformDataChanged: BehaviorSubject<any>;

  searchText: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.onSearchTextChanged = new Subject();
    this.onformDataChanged = new BehaviorSubject({});
  }
  getProcesses(): Observable<any> {
    let url = `${environment.serverBalance}/getProcesses`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getInfo(): Observable<any> {
    let url = `${environment.serverBalance}/getInfo`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCombos(): Observable<any> {
    let url = `${environment.serverBalance}/getCombos`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPlan(): Observable<any> {
    let url = `${environment.serverBalance}/getPlan`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getPeriodo(val): Observable<any> {
    let url = `${environment.serverBalance}/getPeriodo?plan=`;
    return this._httpClient.get<any>(url + val, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getPerspectiva(val1, val2): Observable<any> {
    let url = `${environment.serverBalance}/getPerspectiva?plan=`;
    return this._httpClient.get<any>(url + val1 + '&periodo=' + val2, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getObjetivo(val1, val2, val3): Observable<any> {
    let url = `${environment.serverBalance}/getObjetivo?plan=`;
    return this._httpClient.get<any>(url + val1 + '&periodo=' + val2 + '&perspectiva=' + val3, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getLinea(val1, val2, val3, val4): Observable<any> {
    let url = `${environment.serverBalance}/getLinea?plan=`;
    return this._httpClient.get<any>(url + val1 + '&periodo=' + val2 + '&perspectiva=' + val3 + '&objetivo=' + val4, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarAct(): Observable<any> {
    let url = `${environment.serverBalance}/obtenerMPE`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getDataPre(user): Observable<any> {
    let url = `${environment.serverBalance}/getRolUser`;
    return this._httpClient.get<any>(url + '?user=' + user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRiesgoOportunidad(): Observable<any> {
    let url = `${environment.serverBalance}/getRiesgoOportunidad`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getFechaCierre(): Observable<any> {
    let url = `${environment.serverBalance}/getFechaCierre`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getProcesobyuser(user): Observable<any> {
    let url = `${environment.serverBalance}/getProcesobyuser`;
    return this._httpClient.get<any>(url + '?user=' + user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getCargarPap(): Observable<any> {
    let url = `${environment.serverBalance}/filtroPAP`;
    return this._httpClient.post<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getCargarCYA(usuario): Observable<any> {
    let data = {
      usuario: usuario
    }
    let url = `${environment.serverBalance}/filtroREC_CYA`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getRequeINR(usuario): Observable<any> {

    let url = `${environment.serverBalance}/getRequeINR`;
    return this._httpClient.get<any>(url + "?usuario=" + usuario, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRequeACR(usuario): Observable<any> {

    let url = `${environment.serverBalance}/getRequeACR`;
    return this._httpClient.get<any>(url + "?usuario=" + usuario, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRequeCAR(usuario): Observable<any> {

    let url = `${environment.serverBalance}/getRequeCAR`;
    return this._httpClient.get<any>(url + "?usuario=" + usuario, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarPen(): Observable<any> {
    let url = `${environment.serverBalance}/filtroPEN`;
    return this._httpClient.post<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPOA(data): Observable<any> {
    let url = `${environment.serverBalance}/getPOA`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getTipoAccion(): Observable<any> {
    let url = `${environment.serverBalance}/getTipoAccion`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getrefuse(data): Observable<any> {
    let url = `${environment.serverBalance}/filtroREC`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getlistAct(data): Observable<any> {
    let url = `${environment.serverBalance}/filtroMPE`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPanel1(data): Observable<any> {
    let url = `${environment.serverBalance}/panel1`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getDetail(data): Observable<any> {
    let url = `${environment.serverBalance}/detalleActividad`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReportePlanEstrategicoAnual(data): Observable<any> {
    let url = `${environment.serverBalance}/getReportePlanEstrategicoAnual`;
    return this._httpClient.get<any>(url + "?id_plan=" + data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  graficaPresupuestoSaldoResponsable(plan, periodo): Observable<any> {
    let url = `${environment.serverBalance}/graficaPresupuestoSaldoResponsable`;
    return this._httpClient.get<any>(url + "?id_plan=" + plan + "&id_periodo=" + periodo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  graficaHallazgos(plan, periodo): Observable<any> {
    let url = `${environment.serverBalance}/graficaHallazgos`;
    return this._httpClient.get<any>(url , httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  graficaPromedioPerspectiva(plan, periodo): Observable<any> {
    let url = `${environment.serverBalance}/graficaPromedioPerspectiva`;
    return this._httpClient.get<any>(url + "?id_plan=" + plan + "&id_periodo=" + periodo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  getGraficaPresupuestoSaldo(plan, periodo): Observable<any> {
    let url = `${environment.serverBalance}/getGraficaPresupuestoSaldo`;
    return this._httpClient.get<any>(url + "?id_plan=" + plan + "&id_periodo=" + periodo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  getReportePlanEstrategicoMes(plan, periodo): Observable<any> {
    let url = `${environment.serverBalance}/getReportePlanEstrategicoMes`;
    return this._httpClient.get<any>(url + "?id_plan=" + plan + "&id_periodo=" + periodo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getDetailActivity(data): Observable<any> {
    let url = `${environment.serverBalance}/actividadDetalleTodosMeses`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRequerimientosRiesgos(data): Observable<any> {
    let url = `${environment.serverBalance}/getRequerimientosRiesgos`;
    return this._httpClient.get<any>(url + '?id_requerimiento=' + data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getCargarAPRCYA(): Observable<any> {
    let url = `${environment.serverBalance}/filtroICA`;
    return this._httpClient.post<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarREQ(user): Observable<any> {
    let url = `${environment.serverBalance}/getRequeDDR`;
    return this._httpClient.get<any>(url+"?usuario="+user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAllReqs(): Observable<any> {
    let url = `${environment.serverBalance}/getAllReqs`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getRequerimientosReqRCB(user): Observable<any> {
    let url = `${environment.serverBalance}/getRequerimientosReqRCB`;
    return this._httpClient.get<any>(url+"?usuario="+user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRequerimientosReqENT(user): Observable<any> {
    let url = `${environment.serverBalance}/getRequerimientosReqENT`;
    return this._httpClient.get<any>(url+"?usuario="+user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarREQAcep(user): Observable<any> {
    let url = `${environment.serverBalance}/filtroRCB`;
    return this._httpClient.post<any>(url, user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarREQAprEnt(): Observable<any> {
    let url = `${environment.serverBalance}/filtroENT`;
    return this._httpClient.post<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarCausaAccion(data): Observable<any> {
    let url = `${environment.serverBalance}/getCausaAccion`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCausaAccionRequerimiento(data): Observable<any> {
    let url = `${environment.serverBalance}/getCausaAccionRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarAcpReq(data): Observable<any> {
    let url = `${environment.serverBalance}/getRequerimientos`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarReqAceptado(data): Observable<any> {
    let url = `${environment.serverBalance}/getRequerimientosRCB`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getCargarReqAprobacion(data): Observable<any> {
    let url = `${environment.serverBalance}/getRequerimientosENT`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getdataHallazgo(): Observable<any> {
    let url = `${environment.serverBalance}/getdataHallazgo`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  getRptConMes(): Observable<any> {
    let url = `${environment.serverBalance}/obtenerMPEC`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getRequeRRC(user): Observable<any> {
    let url = `${environment.serverBalance}/getRequeRCC`;
    return this._httpClient.get<any>(url + '?usuario=' + user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  getReportConsolidado(id_plan, id_periodo, id_mes, id_clasificacion_actividad): Observable<any> {
    let url = `${environment.serverBalance}/getReporte`;
    return this._httpClient.get<any>(url + '?id_plan=' + id_plan + '&id_periodo=' + id_periodo + '&id_mes=' + id_mes + '&id_clasificacion_actividad=' + id_clasificacion_actividad, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReporteBalanceCumplimiento(): Observable<any> {
    let url = `${environment.serverBalance}/getReporteBalanceCumplimiento`;
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  generarCalculos(data): Observable<any> {
    let url = `${environment.serverBalance}/generarCalculos`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReportPresupuesto(id_plan, id_periodo, id_clasificacion_actividad): Observable<any> {
    let url = `${environment.serverBalance}/getReportePre`;
    return this._httpClient.get<any>(url + '?id_plan=' + id_plan + '&id_periodo=' + id_periodo + '&id_clasificacion_actividad=' + id_clasificacion_actividad, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReportActividad(id_plan, id_periodo, id_clasificacion_actividad): Observable<any> {
    let url = `${environment.serverBalance}/getReporteAct`;
    return this._httpClient.get<any>(url + '?id_plan=' + id_plan + '&id_periodo=' + id_periodo + '&id_clasificacion_actividad=' + id_clasificacion_actividad, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReporteRequerimiento(mes, tipo_solicitud, unidad,anio): Observable<any> {
    let url = `${environment.serverBalance}/getReporteRequerimiento`;
    return this._httpClient.get<any>(url + '?mes=' + mes + '&tipo_solicitud=' + tipo_solicitud + '&unidad=' + unidad+'&anio='+anio, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getReporteCausaAccion(mes): Observable<any> {
    let url = `${environment.serverBalance}/getReporteCausaAccion`;
    return this._httpClient.get<any>(url + "?mes=" + mes, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getProcesoFecha(id_plan, id_periodo, mes): Observable<any> {
    let url = `${environment.serverBalance}/getProcesoFecha`;
    return this._httpClient.get<any>(url + '?id_plan=' + id_plan + '&id_periodo=' + id_periodo + '&mes=' + mes, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveProcesoFecha(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/saveProcesoFecha`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  callCierreAutomaticas(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/callCierreAutomaticas`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  save(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/almacenarActividad`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveR(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/saveRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  saveRequerimientoExcel(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/saveRequerimientoExcel`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  
  updateRequerimiento(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/updateRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveRiesgoOportunidad(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/saveRiesgoOportunidad`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delete(data: any): Observable<any> {
    let url = `${environment.serverBalance}/eliminarActividad`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveDetalle(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/savePAP`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveAprRec(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/saveAprRec`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  recCausasAciones(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/deleteCausaAccion`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteCausaAccionRequerimiento(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/deleteCausaAccionRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  approveCausaAccion(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/approveCausaAccion`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  approveCausaAccionRequerimiento(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/approveCausaAccionRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  acceptReq(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/requerimientosRCB`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  rechazoRequerimiento(data: any): Observable<any> {

    let url = `${environment.serverBalance}/rechazoRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  devolverPendiente(data: any): Observable<any> {

    let url = `${environment.serverBalance}/devolverPendiente`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addEntregable(data: any): Observable<any> { 
    //console.log(risk);
    let url = `${environment.serverBalance}/requerimientosENT`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  approveAdjunto(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/approveAdjunto`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  approveAdjuntoReq(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/approveAdjuntoReq`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  caducarRequerimiento(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/caducarRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  refuseAdjunto(data: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.serverBalance}/refuseAdjunto`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveAnalysis(data: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.serverBalance}/saveCausaAccion`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saveCausaAccionRequerimiento(data: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.serverBalance}/saveCausaAccionRequerimiento`;
    return this._httpClient.post<any>(url, data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getDataParRep(): Observable<any> {
    let url = `${environment.serverBalance}/getParametrosReporteHallazgos`;
    return this._httpClient.get<any>(url , httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAnexo1(data): Observable<any> {
    let url = `${environment.serverBalance}/getAnexo1`;
    return this._httpClient.post<any>(url ,data,  httpOptions).pipe(
      catchError(this.handleError) 
    );
  }

  upload(data): Observable<any> {
    const formData = new FormData();
    formData.append('file', data);
    let url = `${environment.serverBalance}/upload`;
    return this._httpClient.post<any>(url, formData).pipe(
      catchError(this.handleError)
    );
  }


  getReporteHallazgosSolicitud(id) {
    let url = `${environment.serverBalance}/getReporteHallazgosSolicitud`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?id_requerimiento=" + id, httpOptions).pipe(
      catchError(this.handleError)
    );


    

  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(error);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
