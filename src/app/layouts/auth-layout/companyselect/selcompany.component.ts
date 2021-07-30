import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';


 

//MAO EDITADO
@Component({
  selector: 'app-selcompany',
  templateUrl: './selcompany.component.html',
  styleUrls: ['./selcompany.component.scss']
})
export class SelCompanyComponent implements OnInit {
  email = new FormControl('maoteneg@gmail.com');
  password = new FormControl('Lampard10');
  keepMeLoggedIn = new FormControl(true);
  selectedcompany:string="Seleccione Empresa"
  @ViewChild('signinForm') form: NgForm;
  companies:any[];
  constructor(private authService: AuthService, private router:Router) { }
  ngOnInit(): void {
    this.companies=this.authService.isCompany();
    console.log('INGRESA EN EL ON INITTT',this.companies);
  }

  onSubmitSignIn() {
    console.log('ingresa en el submt')
  }

  evento(e){
    console.log('INGRESA AL EVENTO:    ',e)
    this.selectedcompany=e.razon_social;
    localStorage.setItem('company',JSON.stringify(e))
    console.log("Mayri", e)
    this.router.navigate(['/default/forms/home']);
  }

}
