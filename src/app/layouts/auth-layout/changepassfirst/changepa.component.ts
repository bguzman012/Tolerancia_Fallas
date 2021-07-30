import {Component, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SettingsService} from '@app/settings/settings.service';
import {AuthService} from '@app/layouts/auth-layout/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { FormService } from '@app/content/forms/services/forms.service';

 

//MAO EDITADO
@Component({
  selector: 'app-changepa',
  templateUrl: './changepa.component.html',
  styleUrls: ['./changepa.component.scss']
})
export class ChangePaComponent implements OnInit {
  itemsList: any[];
  errorMessage: string = '';
  username: String;
  nombres: any;
  name = 'World';
  person: any;


  dataSesion = null;
  //Variables de los Selects
  provinciaS: any = "";
  ciudadS: any = "";
  ciudadesPorProv: any[] = [];
  //DATOS DE PRUEBA

  resultado: any
  existeid: any
  esSocio: boolean;
  apellidos: any;
  celular: any;
  direccion: any;
  frmSignup: any;
  disableSave: boolean;
  loading: boolean;


  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private formService:FormService

  ) {

    this.frmSignup = this.createSignupForm();

  }

  ngOnInit() {

 
  }
   patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

   passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }


  createSignupForm(): FormGroup {
    return this.fb.group(
      {
       passwordold:[null,Validators.required],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            this.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            this.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            this.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            this.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: this.passwordMatchValidator
      }
    );
  }













  getFormBuilder() {
    return this.formBuilder.group({
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      numid: ["", [Validators.required]],
      //razonSocial: ["", [Validators.required]],
      //telefono: ["", [Validators.required]],
      celular: ["", [Validators.required]],
      pass: ["", [Validators.required]],



      //actividadEconomica: ["", [Validators.required]],
      //email: ["", [Validators.required]],
      //comentarios: ["", [Validators.required]],
    });
  }

  get f() {
    return this.frmSignup.controls;
  }
  hasError(field: string, error: string): boolean {
    if (error === 'any' || error === '') {
      ////console.log('Campo con error',field)

      return (
        this.frmSignup.controls[field].dirty &&
        this.frmSignup.controls[field].invalid
      );
    }
    // this.frmLogin.controls[field].pending;
    return (
      this.frmSignup.controls[field].dirty &&
      this.frmSignup.controls[field].hasError(error)


    );
  }




 
  submit(){
    console.log('entra en el sbmit')
    this.loading=true;
    if (this.frmSignup.valid) {
var dataguardar={

}
      this.formService.changePassword(this.frmSignup.get('passwordold').value,this.frmSignup.get('password').value).subscribe(resp => {
        this.loading = false;
if (resp.code==200){


        Swal.fire({
          title: 'OK',
          text: 'La Contraseña ha sido cambiada con éxito  ',
          timer: 5000,
          timerProgressBar: true,

          
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
        this.disableSave = true;
        console.log('GUARDOOOOOO',resp);
        this.authService.logout();
 }else{
  Swal.fire({
    title: 'UPS!!!',
    icon:'warning',
    text: 'Ha ocurrido un error '+resp.message,
    timer: 5000,
    timerProgressBar: true,
    position: 'bottom-end',

    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
      zippi.play();
    }
  })
 }

      }, err => {
          Swal.fire({
            title: 'UPS!!!',
            icon:'warning',
            text: 'Ha ocurrido un error ',
            timer: 5000,
            timerProgressBar: true,
            position: 'bottom-end',

            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
              var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
              zippi.play();
            }
          })
        });

       }else{
        Swal.fire({
          title: 'UPS!!!',
          icon:'warning',
          text: 'Por favor verificar los campos  ',
          timer: 5000,
          timerProgressBar: true,
          position: 'bottom-end',

          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            var zippi = new Audio('http://static.woopra.com/sounds/notification.mp3')
            zippi.play();
          }
        })
       }

  }



}
