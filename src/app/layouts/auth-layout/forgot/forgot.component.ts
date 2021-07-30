import {Component, ViewChild} from '@angular/core';
import {FormControl, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';
import Swal from "sweetalert2";
import { first } from 'rxjs/operators';
import { IpServiceService } from '@app/content/forms/services/ip-service.service';
import { FormService } from '@app/content/forms/services/forms.service';

//MAO EDITADO
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {
  usuario = new FormControl('');
  password = new FormControl('');
  keepMeLoggedIn = new FormControl(true);
  ipAddress:string;
  @ViewChild('signinForm') form: NgForm;

  constructor(private authService: AuthService , private router:Router,private ip:IpServiceService,private formservice: FormService) {
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
   if(this.usuario.valid){
   this.formservice.resetPassword(this.usuario.value)
            .pipe(first())
            .subscribe(
                data => { 
                  console.log('esta es la dataaaaaaaaaaaaaaaaaaaaaaaaaa',data)
                  Swal.fire({
                    icon: 'success',
                    title: 'Ok',
                    text: data.message,
                    timer: 4000
                    //footer: '<a href>Why do I have this issue?</a>'
                });
                this.authService.logout();
                   
                },
                error => {
                    console.log(error);
                    
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: error,
                        timer: 4000
                        //footer: '<a href>Why do I have this issue?</a>'
                    });
                });
              }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'Oops...',
                  text: 'Por favor ingresa tu nombre de usuario: ',
                  timer: 4000
                  //footer: '<a href>Why do I have this issue?</a>'
              });
              }
    }
  }

