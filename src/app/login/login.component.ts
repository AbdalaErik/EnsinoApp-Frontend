import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Login } from './login.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  login = new Login();
  target: any = '';
  token: any;

  userForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(

    private userdata: UserdataService,
    private route: Router

  ) { 

    this.userForm = new FormGroup ({

      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)])

    })


  }

  ngOnInit(): void {
      
  }

  loginUser() {

    const isFormValid = this.userForm.valid;

    this.isFormSubmitted = true;

    this.login.email = this.userForm.controls['email'].value;
    this.login.password = this.userForm.controls['password'].value;

    this.userdata.loginUser(this.login).subscribe( (response: any) => {

      setTimeout(() => {

      }, 1000);

      this.login.email='';
      this.login.password='';

      console.log(response);

      if(response.success == true) {

        this.token = localStorage.setItem('token', response.token);

        this.target = '<div class="alert alert-success">Sucesso! ' + response.message + '</div>';

        setTimeout(() => {
          
          this.route.navigate(['dashboard']);

        }, 2000);

      }

      else {

        if(response.error.email && response.error.password)
        
        this.target = '<div class="alert alert-danger">Erro! ' + response.error.email + ' | ' + response.error.password + '</div>';

        else if(response.error.email)

        this.target = '<div class="alert alert-danger">Erro! ' + response.error.email + '</div>';

        else if(response.error.password)

        this.target = '<div class="alert alert-danger">Erro! ' + response.error.password + '</div>';

      }

    }, error => {
      
      console.log(error);

      if(error) {

        this.target = '<div class="alert alert-danger">Erro! ' + error.error.message + '</div>';

      }
      
    });

  }

}
