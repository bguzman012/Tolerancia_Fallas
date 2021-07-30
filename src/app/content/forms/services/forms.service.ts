import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AesCriptography } from 'src/security/aes-criptography';
import { Customer } from '../account-list/customer';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',



    }),
    search: new URLSearchParams()
};



@Injectable()
export class FormService {
    constructor(private http: HttpClient) { }
    getMenu() {
        let url = `${environment.server}/boards/menu-web`;
    
        return this.http.get<any>(url, httpOptions).toPromise()
            .then(res => {
                return res;
            })
    
    }
    getCustomersLarge() {

        return this.http.get<any>(`${environment.server}/charge/getData/`)
            .toPromise()
            .then(res => {
                console.log('Esta es la respuestaaaaaa', res)
                return res;
            })



    }

    loadAllAccounts(id_empresa,page,limit,search) {
        let url = `${environment.server}/charge/select-account-v2`;

        return this.http.get<any>(url + "?id_empresa=" + id_empresa + "&id_estado=0&page="+page+"&limit="+limit+"&search="+search, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista de cuentasssss::::*************************** ', res)
                return res;
            })
    }

    getTipoTel(id_empresa,page,limit,search) {
        let url = `${environment.server}/general/type-phone`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista de tiposssssss::::*************************** ', res)
                return res;
            })
    }



    
    getTipoDir(id_empresa,page,limit,search) {
        let url = `${environment.server}/general/type-address`;

        return this.http.get<any>(url, httpOptions)
            .toPromise()
            .then(res => {
                console.log('Lista de tiposssssss::::*************************** ', res)
                return res;
            })
    }

    loadDetail(id_cuenta, id_persona) {
        let url = `${environment.server}/charge/select-account-detail`;

        return this.http.get<any>(url + "?id_cuenta=" + id_cuenta + "&id_estado=0" + "&id_persona=" + id_persona, httpOptions)
            .toPromise()
            .then(res => {
                console.log('ESTE ES EL DETALLEEEEEEEEEEEEEEEE:', res)
                return res;
            })
    }


    loadManagement(id_empresa, id_cuenta, id_persona) {
        let url = `${environment.server}/management/detail-management`;

        return this.http.get<any>(url + "?id_empresa=" + id_empresa + "&id_cuenta=" + id_cuenta + "&id_persona=" + id_persona, httpOptions).toPromise()
            .then(res => {
                console.log('ESTE ES EL DETALLEEEEEEEEEEEEEEEE:', res)
                return res;
            })
    }

    loadSelectsGestion() {
        let url = `${environment.server}/management/info-management`;

        return this.http.get<any>(url, httpOptions).toPromise()
            .then(res => {
                return res;
            })

    }

    saveGestion2(data) {
        let url = `${environment.server}/management/register`;

        return this.http.post<any>(url, data, httpOptions).toPromise()
            .then(res => {
                return res;
            })

    }


    saveGestion3(data: any): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
        let url = `${environment.server}/management/`;
        return this.http.post<any>(url + 'register', data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    saveAgent(data: any): Observable<any> {
        //console.log(complain);
        console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
        let url = `${environment.server}/agent/`;
        return this.http.post<any>(url + 'register', data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }

    saveGestion() {
        let url = `${environment.server}/management/info-management`;

        return this.http.get<any>(url, httpOptions).toPromise()
            .then(res => {
                return res;
            })

    }

    selectbusiness(id_compania): Observable<any> {
        let url = `${environment.server}/charge/select-business`;

        console.log('La URL es: ', url)
        return this.http.get<any>(url + "?id_compania=" + id_compania, httpOptions)
            .pipe(map((res: Response) => {
                console.log('esta es la respuestaaaaaaa:::::::::::::::::::::::::::::::', res)
                return res;
            }
            ));
    }


    selectbusiness2(id_company) {
        console.log('entra aquiiiii')
        return this.http.get<any>(`${environment.server}/charge/select-business?id_compania=` + id_company)
            .toPromise()
            .then(res => {
                console.log('Esta es la respuestaaaaaa de empresaaaas', res)
                return res;
            })



    }

    getDetailManagement(id_gestion,id_empresa,id_cuenta) {
        let url = `${environment.server}/management/detail`;

        console.log('La URL es: ', url)
        return this.http.get<any>(url + "?id_gestion=" + id_gestion+ "&id_empresa=" + id_empresa+ "&id_cuenta=" + id_cuenta, httpOptions)
            .pipe(map((res: Response) => {
                console.log('esta es la respuestaaaaaaa:::::::::::::::::::::::::::::::', res)
                return res;
            }
            ));
    
    }

    saveMasterFile(data: any): Observable<any> {
        //console.log(complain);
        let url = `${environment.server}/charge/`;
        return this.http.post<any>(url + 'cargar-archivo', data, httpOptions).pipe(
            catchError(this.handleError)
        );
    }
/* *********************************************************************SERVICIOS PARA LA CREACION DE AGENTE***************************************************** */


getInfoPerson(id) {
    
    let url = `${environment.server}/users/info`;
    let id_company = JSON.parse(localStorage.getItem('company')).id_compania;
    console.log(id_company, "Mijin")
    console.log(url+'?identificacion='+id+'&id_compania='+id_company)
    return this.http.get<any>(url+'?identificacion='+id+'&id_compania='+id_company, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}
getInfoPersonAgent(id) {
    let url = `${environment.server}/users/agent`;

    return this.http.get<any>(url+'?identificacion='+id, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}


getPlan(id_persona,id_compania) {
    let url = `${environment.server}/planning/generate`;

    return this.http.get<any>(url+'?id_persona='+id_persona+'&id_compania='+id_compania, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}



/* savePlan(data) {
    let url = `${environment.server}/planning/register`;

    return this.http.post<any>(url,data, httpOptions).toPromise()
        .then(res => {
            return res;
        })

} */


savePlan(data: any): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
    let url = `${environment.server}/planning/`;
    return this.http.post<any>(url + 'register', data, httpOptions).pipe(
        catchError(this.handleError)
    );
}

editDir(data: any): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
    let url = `${environment.server}/person/`;
    return this.http.post<any>(url + 'update-address', data, httpOptions).pipe(
        catchError(this.handleError)
    );
}


saveDir(data: any): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
    let url = `${environment.server}/person/`;
    return this.http.post<any>(url + 'register-address', data, httpOptions).pipe(
        catchError(this.handleError)
    );
}



saveTel(data: any): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
    let url = `${environment.server}/person/`;
    return this.http.post<any>(url + 'register-phone', data, httpOptions).pipe(
        catchError(this.handleError)
    );
}


saveRef(data: any): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
    let url = `${environment.server}/person/`;
    return this.http.post<any>(url + 'register-reference', data, httpOptions).pipe(
        catchError(this.handleError)
    );
}



editTel(data: any): Observable<any> {
    //console.log(complain);
    console.log('SERVICEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE', data)
    let url = `${environment.server}/person/`;
    return this.http.post<any>(url + 'update-phone', data, httpOptions).pipe(
        catchError(this.handleError)
    );
}


getAgentType(id) {
    let url = `${environment.server}/agent/info`;

    return this.http.get<any>(url, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}

getGestionType() {
    let url = `${environment.server}/gestion/getGestion`;

    return this.http.get<any>(url, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}



getZones(id) {
    let url = `${environment.server}/zone/zone`;

    return this.http.get<any>(url, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}




getPlanbyAgent(id_compania,id_agente) {
    let url = `${environment.server}/planning/select`;

    return this.http.get<any>(url+"?id_compania="+id_compania+"&id_agente="+id_agente, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}

getAccountListAgent(id_compania,id_agente,id_planificacion) {
    let url = `${environment.server}/planning/select-detail`;

    return this.http.get<any>(url+"?id_compania="+id_compania+"&id_agente="+id_agente+"&id_planificacion="+id_planificacion+"&id_estado=0", httpOptions).toPromise()
        .then(res => {
            return res;
        })

}


generatereport(id_compania,id_empresa,finicio,ffin,tipo) {
    let url = `${environment.server}/management/report-managemnets`;

    return this.http.get<any>(url+"?id_compania="+id_compania+"&id_empresa="+id_empresa+"&finicio="+finicio+"&ffin="+ffin+"&tipo="+tipo, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}

generatereportger(id_compania,id_empresa,finicio,ffin,tipo) {
    let url = `${environment.server}/management/report-managemnets-g`;

    return this.http.get<any>(url+"?id_compania="+id_compania+"&id_empresa="+id_empresa+"&finicio="+finicio+"&ffin="+ffin+"&tipo="+tipo, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}




/* ********************************************************+editar info */
getProvincia(id) {
    let url = `${environment.server}/general/province`;

    return this.http.get<any>(url+'?id_pais=ECU', httpOptions).toPromise()
        .then(res => {
            return res;
        })

}





getCanton(id) {
    let url = `${environment.server}/general/city`;

    return this.http.get<any>(url+'?id_pais=ECU'+'&id_provincia='+id, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}

getParroquia(id,id_ciudad) {
    let url = `${environment.server}/general/parish`;

    return this.http.get<any>(url+'?id_pais=ECU'+'&id_provincia='+id+'&id_ciudad='+id_ciudad, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}

getHistoryDir(id_tipo_direccion,id_persona,id_persona_direccion) {
    let url = `${environment.server}/person/address-history`;

    return this.http.get<any>(url+'?id_tipo_direccion='+id_tipo_direccion+'&id_persona='+id_persona+'&id_persona_direccion='+id_persona_direccion, httpOptions).toPromise()
        .then(res => {
            return res;
        })

}


changePassword(oldpassword,newpassword): Observable<any> {
    var criptography = new AesCriptography();
    var parametro1 = criptography.encrypt(oldpassword);
    var parametro2 = criptography.encrypt(newpassword);
    return this.http.post<any>(`${environment.server}/users/change-password?oldpassword=${encodeURIComponent(parametro1)}&newpassword=${encodeURIComponent(parametro2)}`, { parametro1, parametro2 })
      .pipe(map(user => {
       return user;
      
      }));
}


resetPassword(user): Observable<any> {
    var criptography = new AesCriptography();
    var parametro1 = criptography.encrypt(user);
    return this.http.post<any>(`${environment.server}/users/reset-password?user=${encodeURIComponent(parametro1)}`, { parametro1 })
      .pipe(map(user => {
       return user;
      
      }));
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