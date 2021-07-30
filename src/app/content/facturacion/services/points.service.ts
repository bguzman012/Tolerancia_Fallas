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
export class PointService {
    constructor(private http: HttpClient) { }


    getPoints(id_compania,page,limit,search) {
        let url = `${environment.server}/items/list`;

        return this.http.get<any>(url+"?id_compania="+id_compania+"&page="+page+"&limit="+limit+"&search="+search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista:', res)
                return res;
            })
    }


    savePoint(data: any): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
        let url = `${environment.server}/items/`;
        return this.http.post<any>(url + 'register', data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
    updatePoint(data: any): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
        let url = `${environment.server}/items/`;
        return this.http.post<any>(url + 'update', data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    deletePoint(id_compania,id_items): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        let url = `${environment.server}/items/`;
        return this.http.post<any>(url + 'delete'+"?id_items="+id_items+"&id_compania="+id_compania, httpOptions).pipe(
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