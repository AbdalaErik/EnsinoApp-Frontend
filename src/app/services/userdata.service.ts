import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({

  providedIn: 'root'
  
})

export class UserdataService {

  private API_URL = 'http://127.0.0.1/api/';

  userdata: any;

  tokenVal = localStorage.getItem('token');

  header = new HttpHeaders({

    'Authorization': `Bearer ${this.tokenVal}`,

  });

  constructor(private httpRequest: HttpClient,) { }

  registerUser(data: any) { 

    return this.httpRequest.post(this.API_URL + 'register', data);

  }

  loginUser(data: any) {

    return this.httpRequest.post(this.API_URL + 'login', data);

  }

  logoutUser(token: any) {

    return this.httpRequest.get(this.API_URL + 'logout/' + token, {

      headers: this.header

    });

  }

}
