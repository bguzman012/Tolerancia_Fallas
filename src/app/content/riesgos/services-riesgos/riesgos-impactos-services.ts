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
export class ImpactosServices {
    constructor(private http: HttpClient) { }
    

    /***
     * 
     * 
     * Get Impactoss
     */


    getImpactos(page, limit, search){
        let url = `${environment.server}/impactos/getImpacto`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }
    getValores(page, limit, search){
        let url = `${environment.server}/impactos/getValoracion`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    getImpactosDetallados(page, limit, search){
        let url = `${environment.server}/impactos/getImpactos`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }
    public saveImpacto(param: any): Observable<any> {
        let url = `${environment.server}/impactos/saveImpactos/`;
        return this.http.post(url, param, httpOptions)
    }


    
    updateImpacto(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/impactos/editImpactos/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    
    }

    deleteImpactoDetalle(id): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/impactos/deleteImpactos`;
        return this.http.post<any>(url + "?id=" + id, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    //Servicios SubProcesos

    public saveEconomico(param: any): Observable<any> {
        let url = `${environment.server}/economico/saveEconomico/`;
        return this.http.post(url, param, httpOptions)
    }

    updateEconomico(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/economico/editEconomico/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getEconomicos(page, limit, search) {
        let url = `${environment.server}/economico/getEconomico`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    deleteImpacto(id): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/economico/deleteEconomico`;
        return this.http.post<any>(url + "?id_economico=" + id, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
/***
 * 
 * Impacto Operacional
 * 
 */

    public saveOperacional(param: any): Observable<any> {
        let url = `${environment.server}/operacional/saveOperacional/`;
        return this.http.post(url, param, httpOptions)
    }

    updateOperacional(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/operacional/editOperacional/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getOperacional(page, limit, search) {
        let url = `${environment.server}/operacional/getOperacional`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    deleteOperacional(id): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/operacional/deleteOperacional`;
        return this.http.post<any>(url + "?id_operacional=" + id, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    /***
 * 
 * Impacto Legal
 * 
 */

     public saveLegal(param: any): Observable<any> {
        let url = `${environment.server}/legal/saveLegal/`;
        return this.http.post(url, param, httpOptions)
    }

    updateLegal(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/legal/editLegal/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getLegal(page, limit, search) {
        let url = `${environment.server}/legal/getLegal`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    deleteLegal(id): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/legal/deleteLegal`;
        return this.http.post<any>(url + "?id_legal=" + id, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * 
     * Impacto Reputacional Servicios
     * @returns 
     */


     public saveReputacional(param: any): Observable<any> {
        let url = `${environment.server}/reputacional/saveReputacional/`;
        return this.http.post(url, param, httpOptions)
    }

    updateReputacional(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/reputacional/editReputacional/`;
        return this.http.post<any>(url, data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    getReputacional(page, limit, search) {
        let url = `${environment.server}/reputacional/getReputacional`;

        return this.http.get<any>(url + "?page=" + page + "&limit=" + limit + "&search=" + search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res.data)
                return res;
            })
    }


    deleteReputacional(id): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/reputacional/deleteReputacional`;
        return this.http.post<any>(url + "?id_reputacional=" + id, httpOptions).pipe(
            catchError(this.handleError)
        );
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