import {Component, ViewChild} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import Swal from "sweetalert2";
import { first } from 'rxjs/operators';
import { IpServiceService } from '@app/content/forms/services/ip-service.service';

//MAO EDITADO
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  email = new FormControl('',Validators.required);
  password = new FormControl('',Validators.required);
  keepMeLoggedIn = new FormControl(true);
  ipAddress:string;
  @ViewChild('signinForm') form: NgForm;

  constructor(private authService: AuthService , private router:Router,private ip:IpServiceService) {
    this.getIP();
   }
  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
    });  
  } 
  onSubmitSignIn() {
   // this.authService.signinUser(this.email.value, this.password.value);
   this.getIP();
   console.log('esta es la IPPPPPPPPPPPPPPPPPPPPPPPPP',this.ipAddress)
   if(this.email.valid && this.password.valid){

   
   this.authService.login(this.email.value, this.password.value,this.ipAddress)
            .pipe(first())
            .subscribe(
                data => {
                  console.log('esta es la dataaaaaaaaaaaaaaaaaaaaaaaaaa',data)

                 if(data.detailUsers[0].cambio_contrasenia=='1'){
                  this.router.navigate(['/change']);
                 }else{
                  this.router.navigate(['/select']);
                 }
                   
                },
                error => {
                    console.log(error);
                    
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Al parecer no ingresaste bien la credenciales: ',
                        timer: 4000
                        //footer: '<a href>Why do I have this issue?</a>'
                    });
                });
                 }else{
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Por favor ingresa todos los campos ',
                    timer: 4000
                    //footer: '<a href>Why do I have this issue?</a>'
                });

                 }
    }
  }

