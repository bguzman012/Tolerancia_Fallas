// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  hmr       : false,
  // server: 'http://localhost:8180/serviciosenlinea', // SERVICIOS EN LINEA PARA EL LOGIN
   server: '/serviciosenlinea/api', // SERVICIOS EN LINEA PARA EL LOGIN
 //  server: 'http://vps-2d507f0e.vps.ovh.ca:8180/serviciosenlinea',
  firebase:{
    apiKey: "AIzaSyDIGS_8WgkCevNlPNBCY1GIn208xFXMASw",
    authDomain: "skillsoft-ea998.firebaseapp.com",
    projectId: "skillsoft-ea998",
    storageBucket: "skillsoft-ea998.appspot.com",
    messagingSenderId: "598079570410",
    appId: "1:598079570410:web:ec38ce89e2f5cec6a13293"
  }
  
  
  //serverGD: 'http://10.22.117.79:8080/datascan/api/web', //PARA EL SISTEMA DE GESTION DOCUMENTAL
  //serverBalance: 'http://10.22.117.79:8080/databalance/api/web', //PARA EL SISTEMA DEL DATABALANCE
  //serverGlpi: 'http://10.22.117.77:8180/glpi/api/web', // PARA EL SISTEMA DEL glpi
  //timezone: 'http://worldtimeapi.org'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
