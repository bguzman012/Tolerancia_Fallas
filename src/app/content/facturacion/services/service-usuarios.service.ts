import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',



  }),
  search: new URLSearchParams()
};


@Injectable({
  providedIn: 'root'
})

export class ServicesUsers {


  constructor(private http: HttpClient) { }


  getIdentificacion() {
    let url = `${environment.server}/persona/getIdentificacion/`;

    return this.http.get<any>(url, httpOptions)
      .toPromise()
      .then(res => {
        return res;
      })
  }
  getPersonas() {
    let url = `${environment.server}/persona/getPersona/`;

    return this.http.get<any>(url, httpOptions)
      .toPromise()
      .then(res => {
        return res;
      })
  }

  getRoles() {
    let url = `${environment.server}/risks/getRol/`;

    return this.http.get<any>(url, httpOptions)
      .toPromise()
      .then(res => {
        return res;
      })
  }

  public savePersona(persona: any): Observable<any> {
    let url = `${environment.server}/persona/savePersona/`;
    return this.http.post(url, persona, httpOptions)
  }

  public deleteUser(user: any): Observable<any> {
    console.log(user, "Sinn")
    let url = `${environment.server}/risks/eliminarPersona/`;
    return this.http.put(url, user, httpOptions)
  }

  updatePersona(data: any): Observable<any> {
    //console.log(complain);
    let url = `${environment.server}/persona/editPersona/`;
    return this.http.post<any>(url, data, httpOptions).pipe(
        catchError(this.handleError)
    );
}
getClients(page,limit,search) {
  let url = `${environment.server}/persona/getPerson`;

  return this.http.get<any>(url+"?page="+page+"&limit="+limit+"&search="+search, httpOptions)
      .toPromise()
      .then(res => {
          console.log('Lista:', res.data)
          return res;
      })
}


  deletePerson(id_person): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
    let url = `${environment.server}/persona/deletePersona`;
    return this.http.post<any>(url + "?id=" + id_person, httpOptions).pipe(
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
