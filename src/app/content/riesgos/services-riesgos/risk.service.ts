import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';


import { environment } from '../../../../environments/environment';
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
export class RiskService {

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
  postFile(data, url) {
    const formData = new FormData();
    formData.append('file', data);

    this._httpClient.post<any>(url, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  getDataPre(user): Observable<any> {
    let url = `${environment.server}/risks/getRolUser`;
    return this._httpClient.get<any>(url + '?user=' + user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getInfoSelec(): Observable<any> {
    let url = `${environment.server}/risks/parametrosIngreso`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getgrupo(): Observable<any> {
    let url = `${environment.server}/risks/getDestinatarios`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  getreport() {
    let url = `${environment.server}/risks/getReporte`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );

  }
  getreportmapa() {
    let url = `${environment.server}/risks/getMapa`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );

  }

  cambioestado(id, estado): Observable<any> {
    let url = `${environment.server}/risks/cambioEstado1`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?codcabe=" + id + "&estado=" + estado, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  finProceso(id, proceso): Observable<any> {
    let url = `${environment.server}/risks/finProceso`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?codcabe=" + id + "&proceso=" + proceso, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  
  cambioestadoUrl(id, estado, urlimg, tiempo): Observable<any> {
    let url = `${environment.server}/risks/cambioEstadoUrl`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?codcabe=" + id + "&estado=" + estado + "&url=" + urlimg + "&atiempo=" + tiempo, httpOptions).pipe(
      catchError(this.handleError)
    );
  }




  getParamAnalisis(id): Observable<any> {
    let url = `${environment.server}/risks/parametrosAnalisis`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?idcab=" + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getDataAnalisis(id): Observable<any> {
    let url = `${environment.server}/risks/tiporiesgo`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getDetalleLinea(id): Observable<any> {
    let url = `${environment.server}/risks/lineanegocio`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + '?id=' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getlistRisk(user): Observable<any> {
    let url = `${environment.server}/risks/getRiesgo`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + '?user=' + user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getlistRiskAna(user, page,limit,search): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstado`;
    console.log(user, "The best")

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url +"?page="+page+"&limit="+limit+"&search="+search + "&estado=ING&usuario="+user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getlistRiskAna2(user): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstado`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado=ING&usuario="+user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getlistRiskRev(page,limit,search): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstado`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado=REV&page="+page+"&limit="+limit+"&search="+search , httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAllRiesgoEstadoUser(user, page,limit,search): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstadoUser`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado=ANA&user="+user + "&page="+ page+"&limit="+limit+"&search="+search, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  getAllRiesgoEstadoUserINI(user): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstadoUser`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado=INI&user="+user, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getlistRiskTra(page,limit,search): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstado`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url +"?page="+page+"&limit="+limit+"&search="+search + "&estado=ANA", httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getlistRiskAnaestado(estado, page,limit,search): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstado`;

    console.log('Luis Miguel gUARSREI:', url,estado)
    return this._httpClient.get<any>(url +"?page="+page+"&limit="+limit+"&search="+search + "&estado=" + estado, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getriskedit(id): Observable<any> {
    let url = `${environment.server}/risks/getDetalleRiesgo`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + '?codcabe=' + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getEstados(): Observable<any> {
    let url = `${environment.server}/risks/getEstados`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getAllRiesgoEstadoUserQry(user, estado, page,limit,search): Observable<any> {
    let url = `${environment.server}/risks/getAllRiesgoEstadoUserEspecial`;
 
    console.log(user, estado, "Sincooos")
    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado="+estado+"&usuario="+user +"&page="+page+"&limit="+limit+"&search="+search
    , httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getdetalleanexos(id_anexoa): Observable<any> {
    let url = `${environment.server}/risks/getAnexoADetalle`;
 
    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?id_anexoa="+id_anexoa, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  savepart1(risk: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.server}/risks/`;
    return this._httpClient.post<any>(url + 'almacenamientoRiesgo', risk, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  sendmail(data: any): Observable<any> {
    //console.log(data);
    let url = `${environment.server}/risks/`;
    return this._httpClient.post<any>(url + 'sendmail', data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  almacenamientoTratamiento(risk: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.server}/risks/`;
    return this._httpClient.post<any>(url + 'almacenamientoTratamiento', risk, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  savepart2(risk: any): Observable<any> {
    //console.log(risk);
    let url = `${environment.server}/risks/`;
    return this._httpClient.post<any>(url + 'almacenamientoAnalisis', risk, httpOptions).pipe(
      catchError(this.handleError)
    );
  }





  // PARA LOS SERVICIOS DE QUEJAS****************************

  getComplainPerson(id): Observable<any> {
    let url = `${environment.server}/score/getPerson`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?cedula=" + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getComplainServices(): Observable<any> {
    let url = `${environment.server}/score/getServices`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getComplainSucursales(): Observable<any> {
    let url = `${environment.server}/score/getSucursales`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  getlistComplains(estado): Observable<any> {
    let url = `${environment.server}/score/getQuejas`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado=" + estado, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  getQuejasUsuario(estado,usu): Observable<any> {
    let url = `${environment.server}/score/getQuejasUsuario`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?estado=" + estado+'&usuario='+usu, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  


  getComplainProceso(): Observable<any> {
    let url = `${environment.server}/score/getProcesses`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getRiskProceso(): Observable<any> {
    let url = `${environment.server}/risks/getProcesses`;

    console.log('La URL es: ', url)
    return this._httpClient.get<any>(url, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  getlistComplainsConsultar(finicial, ffinal): Observable<any> {
    let url = `${environment.server}/score/getQuejasFinalizadas`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?desde=" + finicial + "&hasta=" + ffinal, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  savepart1Complain(complain: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/score/`;
    return this._httpClient.post<any>(url + 'saveScoreS', complain, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  savepart2Complain(complain: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/score/`;
    return this._httpClient.post<any>(url + 'assignResponsible', complain, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  refuseAccion(complain: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/score/`;
    return this._httpClient.post<any>(url + 'refuseAccion', complain, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  

  saveAnalysis(complain: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/score/`;
    return this._httpClient.post<any>(url + 'saveAnalysis', complain, httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  savepart4Complain(data): Observable<any> {
    let url = `${environment.server}/score/`;

    //console.log('La URL es: ', data)
    return this._httpClient.post<any>(url + 'saveSolution', data, httpOptions).pipe(
      catchError(this.handleError)
    );
  }


  savepart5Complain(complain: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/score/`;
    return this._httpClient.post<any>(url + 'finalizarQueja', complain, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  saverefuseQueja(complain: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/score/`;
    return this._httpClient.post<any>(url + 'refuseQueja', complain, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getQuejasCodigo(id): Observable<any> {
    let url = `${environment.server}/score/getQuejasCodigo`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?codigo=" + id, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getreportScore(id) {
    let url = `${environment.server}/score/getReporte`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url + "?codigo=" + id, httpOptions).pipe(
      catchError(this.handleError)
    );


    

  }

  getMails() {
    let url = `${environment.server}/score/getMails`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url  , httpOptions).pipe(
      catchError(this.handleError)
    );


    

  }

  getMailProcesos(id,suc) {
    let url = `${environment.server}/score/getMailProcesos`;

    //console.log('La URL es: ', url)
    return this._httpClient.get<any>(url+'?id_proceso='+id+'&sucursal='+suc  , httpOptions).pipe(
      catchError(this.handleError)
    );


    

  }

  
  //************************************************************************************** */






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
