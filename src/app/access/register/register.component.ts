import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private service:UserService) {}

  ngOnInit(): void {
    
  }
  responsedata:any;

  RedirectLogin(){
    this.router.navigate(['login']);
  }

  reactiveForm = new FormGroup({
    name:new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
    userName:new FormControl('',Validators.required),
    mobile:new FormControl(''),
    role:new FormControl(''),
  });

  SaveUser(){
    if(this.reactiveForm.valid){
      console.log(this.reactiveForm.value);
      this.service.Registration(this.reactiveForm.value).subscribe(item=>{
        this.responsedata=item;
        console.log(this.responsedata);
        if(this.responsedata.result!=null){
          alertify.success("Successfully Registerd\nGo to Login Page");
          this.RedirectLogin();
        }
        else{
          alertify.error("Registration Failed, Try with different Username or try after sometime ")
        }
      });
    }
  }

}




