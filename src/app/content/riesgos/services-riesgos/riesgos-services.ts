import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AesCriptography } from 'src/security/aes-criptography';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',



    }),
    search: new URLSearchParams()
};



@Injectable()
export class RiesgosServices {
    constructor(private http: HttpClient) { }

    //Servicios Procesos
    public saveProcesos(proceso: any): Observable<any> {
        let url = `${environment.server}/proceso/saveProceso/`;
        return this.http.post(url, proceso, httpOptions)
    }

    updateProceso(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/proceso/editProceso/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    getProcesos(page, limit, search) {
        let url = `${environment.server}/proceso/getProceso`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }

    public saveAnalisis(param: any): Observable<any> {
        let url = `${environment.server}/analisis/saveAnalisis/`;
        return this.http.post(url, param, httpOptions)
    }
    getSubprocesosById(param) {

        let url = `${environment.server}/analisis/getSubProceso?id_proceso=` + param;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }

    getEconomico() {
        let url = `${environment.server}/analisis/getEconomico`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })

    }

    getPuntuacion() {
        let url = `${environment.server}/analisis/getPuntuacion`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })

    }

    getCriticidad() {
        let url = `${environment.server}/analisis/getCriticidad`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })

    }

    getOperacional() {
        let url = `${environment.server}/analisis/getOperacional`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })

    }

    getLegal() {
        let url = `${environment.server}/analisis/getLegal`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })

    }

    getReputacional() {
        let url = `${environment.server}/analisis/getReputacional`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })

    }

    getInforEconomico() {
        let url = `${environment.server}/analisis/getInformacionEconomico`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    getInforOperacional() {
        let url = `${environment.server}/analisis/getInformacionOperacional`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    generatereport(id_proceso, nombre_proceso, cuantitativo, cualitativo) {
        let url = `${environment.server}/analisis/report`;

        return this.http.get<any>(url + "?id_proceso=" + id_proceso + "&nombre_proceso=" + nombre_proceso + "&cuantitativo=" +
            cuantitativo + "&cualitativo=" + cualitativo, httpOptions).toPromise()
            .then(res => {
                return res;
            })

    }

    getInforLegal() {
        let url = `${environment.server}/analisis/getInformacionLegal`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    getInforReputacional() {
        let url = `${environment.server}/analisis/getInformacionReputacional`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }

    deleteProceso(id_proceso): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/proceso/deleteProceso`;
        return this.http.post<any>(url + "?id_proceso=" + id_proceso, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    public saveEconomico(param: any): Observable<any> {
        let url = `${environment.server}/economico/saveEconomico/`;
        return this.http.post(url, param, httpOptions)
    }

    //Servicios SubProcesos

    public saveSubProcesos(proceso: any): Observable<any> {
        let url = `${environment.server}/subproceso/saveSubProceso/`;
        return this.http.post(url, proceso, httpOptions)
    }

    updateSubProceso(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/subproceso/editSubProceso/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    getSubProcesos(page, limit, search) {
        let url = `${environment.server}/subproceso/getSubProceso`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    deleteSubProceso(id_proceso): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/subproceso/deleteSubProceso`;
        return this.http.post<any>(url + "?id_subproceso=" + id_proceso, httpOptions).pipe(
            catchError(this.handleError)
        );
    }


    getDepartamentos(page, limit, search) {
        let url = `${environment.server}/proceso/getDepartamento`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('ListaDepart:', res.data)
                return res;
            })
    }

    /* *********************************************************************************************************************************************************************** */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error('este es el errrrrrrorrrr:', error);
        }
        // return an observable with a user-facing error message
        return throwError(
            error);
    }


}