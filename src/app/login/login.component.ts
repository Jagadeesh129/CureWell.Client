import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private route: Router) {}

  responseData: any;

  ngOnInit(): void {
    localStorage.clear();
  }

  ProceedLogin(logindata: any): void {
    if (logindata.valid) {
      console.log(logindata.value)
      this.service.ProceedLogin(logindata.value).subscribe(item => {
        this.responseData = item;
        console.log(this.responseData);
        if (this.responseData.token != null) {
          console.log("Login Successful");
          alertify.success("Login Successful");
          localStorage.setItem('token', this.responseData.token);
          localStorage.setItem('refreshToken', this.responseData.refreshToken);
          this.route.navigate(['home']);
        } else {
          alertify.failure("Login Failed");
        }
      });
    }
  }

  RedirectRegister(): void {
    this.route.navigate(['access/register']);
  }
}
