import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class MessagingService {
    currentMessage = new BehaviorSubject(null);
    tokenPush = new BehaviorSubject(null);
    navegadorPush = new BehaviorSubject(null);
    
    constructor(private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {
     
   /*    this.angularFireMessaging.messaging.subscribe( 
        (_messaging) => {
          _messaging.onMessage = _messaging.onMessage.bind(_messaging);
          _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
      ) */
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                console.log('tokeeeeeeeeeeeeeeeen:  ',token)
                this.tokenPush.next(token);
                this.getIpCliente();
                //console.log(token);
            },
            (err) => {
               
                console.error('No se DFSGDFGDFSGSDFGSDFGDSFDFSGSDFGSDFGDSFGDFS.', err);
            }
        );
    }
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                //console.log("new message received. ", payload);
                this.currentMessage.next(payload);
            })
    }

    getIpCliente(){
        var ua = navigator.userAgent;
		console.log(ua);
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
            this.navegadorPush.next("iOs Web");
        }
        else if(/Chrome/i.test(ua)) {
            console.log('Chrome');
            this.navegadorPush.next("Chrome");
        }
        else {
            console.log('Desktop');
            this.navegadorPush.next("Escritorio");
        }
        /*this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK')
        .subscribe( res => {
            console.log(res);
        })*/
        /*.map((res:Response) => {console.log('res ', res);
                                console.log('res.json() ', res.text());
                                //console.log('parseado ', JSON.parse(res.text()));
                                console.log('parseado  stringify ', JSON.stringify(res.text()));
                                let ipVar = res.text();
                                let num = ipVar.indexOf(":");
                                let num2 = ipVar.indexOf("\"});");
                                ipVar = ipVar.slice(num+2,num2);
                                console.log('ipVar -- ',ipVar);
                                return ipVar});*/// ...and calling .json() on the response to return data
        //.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    }
}