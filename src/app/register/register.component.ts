import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Register } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  register = new Register();
  target: any= '';

  constructor(private userdata:UserdataService) {
    
  }

  ngOnInit(): void {
      
  }

  registerUser() {
    
    if (this.register.name ==undefined || this.register.email == undefined || this.register.password == undefined) {
      
      this.target= '<div class="alert alert-danger">Erro! Por favor preencha todos os campos.</div>';
      
      setTimeout(() => {

      }, 1000);

      return;

    }

    this.userdata.registerUser(this.register).subscribe( (response: any) => {

      setTimeout(() => {

      }, 1000);

      this.register.name='';
      this.register.email='';
      this.register.password='';

      console.log(response);

      if(response.code == 1) {

        this.target = '<div class="alert alert-success">Sucesso! ' + response.message + '</div>';

      }

      else if(response.code == 2) {

        this.target = '<div class="alert alert-danger">Erro! ' + response.message + '</div>';

      }

    });

  }

}
