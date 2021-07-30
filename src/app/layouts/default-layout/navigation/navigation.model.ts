import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { FormService } from '@app/content/forms/services/forms.service';
import {NavigationModelInterface} from '@gaxon/components';
import { environment } from 'src/environments/environment';

var httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',



  }),
  search: new URLSearchParams()
};

//MAO EDITADO
export class NavigationModel implements NavigationModelInterface {
  public navigation: any[];

  constructor( nav:any) {


    

  this.navigation=nav;
   /*  this.navigation = [
    
      {
        id: 'main',
        title: 'Inicio',
       
        type: 'group',
        icon: 'home',
        children: [
          {
            id: 'admin',
            title: 'Administracion',
            translate: 'NAV.MAIN.ADMIN',
            type: 'collapse',
            icon: 'dashboard',
            children: [
              {
                id: 'file-upload',
                title: 'Cargar Archivo',
                translate: 'NAV.FORMS.FILE_UPLOAD',
                type: 'item',
                icon: 'file-upload',
                url: 'forms/file-upload'
              },
              {
                id: 'account-list',
                title: 'Lista de Cuentas',
                translate: 'NAV.FORMS.ACOUNT_LIST',
                type: 'item',
                icon: 'task-manager',
                url: 'forms/account-list'
              },
              {
                id: 'agente',
                title: 'Agente',
                translate: 'NAV.FORMS.AGENT',
                type: 'item',
                icon: 'crypto',
                url: 'forms/new-agent'
              },
              {
                id: 'planificacion',
                title: 'Planificacion',
                translate: 'NAV.FORMS.PLANNING',
                type: 'item',
                icon: 'crm',
                url: 'forms/generate-planing'
              }
            ]
          },
          {
            id: 'agente',
            title: 'Agente',
            translate: 'NAV.MAIN.AGENT',
            type: 'collapse',
            icon: 'widgets',
            children: [
              {
                id: 'classic-widgets',
                title: 'Lista de Planificación',
                type: 'item',
                icon: 'components',
                url: 'main/widgets/classic'
              },
            ]
          },
        ]
      }, 
    ]; */
  }

}
