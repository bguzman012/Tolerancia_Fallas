import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AesCriptography } from 'src/security/aes-criptography';

@Injectable()
export class AuthService {
  token: string;
  dataUser: any;

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  login(username: string, password: string,ip:string) {
    var criptography = new AesCriptography();
    var parametro1 = criptography.encrypt(username);
    var parametro2 = criptography.encrypt(password);
    return this.http.post<any>(`${environment.server}/users/login?user=${encodeURIComponent(parametro1)}&password=${encodeURIComponent(parametro2)}&ip=`+ip, { parametro1, parametro2 })
      .pipe(map(user => {
        console.log('USETRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR   ', user)
        if (user.detailUsers == null) {
          user.detailUsers = {
            address: "Anonimo",
            photo: "Anonimo",
            username: 'Anonimo',
            fullName: 'Anonimo',
            email: 'Anonimo',
            telephone: 'Anonimo'
          }
        }
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem('currentUserData', JSON.stringify(user));
        this.dataUser=user;
        return user;
      }));
  }
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;

                localStorage.setItem('currentUser', this.token);
              }
            );

          this.router.navigate(['/']);
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                this.token = token;
                var userdata = {
                  name: 'Mauricio Tene', token: 'this.token', email: 'maoteneg@gmail.com', ci: '0105609135', photoUrl: 'https://firebasestorage.googleapis.com/v0/b/skillsoft-ea998.appspot.com/o/maotene.jpg?alt=media&token=40c1205e-2acd-4651-a4e9-469610a348a4',
                  companys: [{ id: 1, name: 'CBZ' }, { id: 2, name: 'SkillSoft' }]
                }
                this.dataUser = userdata;
                localStorage.setItem('currentUser', this.token);
                localStorage.setItem('currentUserData', JSON.stringify(userdata));
                if (this.activatedRoute.snapshot.queryParams.returnUrl) {
                  this.router.navigate([this.activatedRoute.snapshot.queryParams.returnUrl]);

                } else {
                  this.router.navigate(['/select']);
                }
              }
            );
        }
      )
      .catch(
        (error) => {
          console.log(error);
        }
      );
  }

  logout() {
    //firebase.auth().signOut();
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.router.navigate(['/signin']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => {
          this.token = token;
          localStorage.setItem('currentUser', this.token);
        }
      );

    return this.token;
  }

  isAuthenticated() {
    return localStorage.getItem('token');
  }

  isCompany() {
    var data = JSON.parse(localStorage.getItem('currentUserData')).detailUsers[0].company;
    return data
  }
}
