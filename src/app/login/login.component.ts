import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Login } from './login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login = new Login();
  target: any = '';

  token: any;

  constructor(

    private userdata: UserdataService,
    private route: Router

  ) { }

  ngOnInit(): void {
      
  }

  loginUser() {
    
    if (this.login.email == undefined || this.login.password == undefined) {
      
      this.target= '<div class="alert alert-danger">Erro! Por favor preencha todos os campos.</div>';
      
      setTimeout(() => {

      }, 1000);

      return;

    }

    this.userdata.loginUser(this.login).subscribe( (response: any) => {

      setTimeout(() => {

      }, 1000);

      this.login.email='';
      this.login.password='';

      console.log(response);

      if(response.success == true) {

        this.token = localStorage.setItem('token', response.token);

        this.target = '<div class="alert alert-success">Sucesso! ' + response.message + '</div>';

        this.route.navigate(['dashboard']);

      }

      else {

        this.target = '<div class="alert alert-danger">Erro! ' + response.error + '</div>';

      }

    });

  }

}
