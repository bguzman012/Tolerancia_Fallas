import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '@app/layouts/auth-layout/auth.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        if(localStorage.getItem('token')){
       var token =localStorage.getItem('token').replace('"','').replace('"','');
    }
       console.log('ESTE ES EL LOKENNNNNNNNNNNNNN',token)
       console.log('esta es la url del requestttttttttttttttttttttt',request.url)
       console.log('esta es el enviroment',environment.server)
        const isApiUrl = request.url.startsWith(environment.server);
        console.log('esta es la apiurellllllllllllll', isApiUrl);
        if (token && (isApiUrl )) {
            console.log('entra en el IFFFFFFFFF');
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}