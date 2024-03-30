import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  
  StudentArray : any[] = [];
  isResultLoaded = false;
 
  target: string = '';
  
  name: string ="";
  address: string ="";
  phone: Number =0;
 
  currentStudentID = "";
  
constructor(private http: HttpClient, private router: Router, private userdata: UserdataService)
  {
    this.getAllStudent();
 
  }
  getAllStudent()
  {
    
    this.http.get("http://127.0.0.1/api/student")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.StudentArray = resultData;
    });
  }
 
  register()
  {
  
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone
    };
 
    this.http.post("http://127.0.0.1/api/student",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully");
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone  = 0;
    });
  }
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.phone = data.phone;
   this.currentStudentID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "id" : this.currentStudentID,
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
  
    };
    
    this.http.put("http://127.0.0.1/api/student"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("O registro do(a) estudante foi atualizado!");
        this.getAllStudent();
        window.location.reload();
      
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://127.0.0.1/api/student"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deleteddd")
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone  = 0;
  
    });
 
  }

  logoutUser() {

    var c = confirm("Você tem certeza que quer desconectar?");
    
    if (c) {

      this.userdata.logoutUser(localStorage.getItem('token')).subscribe((response: any) => {

        setTimeout(() => {

        }, 1000);

        if(response.code == 1) {

          localStorage.removeItem('token');

          this.router.navigate(['/']);

        }

        else if(response.code == 2) {

          this.target = '<div class="alert alert-danger">Error! ' + response.message + '</div>';

        }

      });

    }

  }

}
