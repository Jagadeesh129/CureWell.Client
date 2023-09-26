import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private router:Router) { }

  ProceedLogin(inputdata:any){
    return this.http.post('https://localhost:7007/api/Authorize/Login',inputdata);
  }

  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }

  GetToken(){
    return localStorage.getItem('token')!=null?localStorage.getItem('token'):'';
  }

  GetRefreshToken(){
    return localStorage.getItem('refreshToken')!=null?localStorage.getItem('refreshToken'):'';
  }

  Registration(inputdata:any){
    return this.http.post('https://localhost:7007/api/Authorize/Registration',inputdata);
  }

  Logout(){
    alert("Your Session Expired");
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  GenerateRefreshToken(){
    let input = {
      "token": this.GetToken(),
      "refreshToken":this.GetRefreshToken()
    }
    return this.http.post('https://localhost:7007/api/Authorize/GenerateRefreshToken',input);
  }

  SaveToken(tokenData:any){
    localStorage.setItem('token', tokenData.token);
          localStorage.setItem('refreshToken', tokenData.refreshToken);
  }

}
