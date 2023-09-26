import { Component,DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  constructor(private router:Router){}
  title = 'CureWell.Client';
  isMenuVisible=true;

   ngDoCheck():void{
    const currentRoute=this.router.url;
    if(currentRoute=='/access/register' || currentRoute=='/login'){
      this.isMenuVisible=false;
    }
    else{
      this.isMenuVisible=true;
    }
  }

  Logout(){
    alertify.confirm("Are sure U want to Logout",()=>{
      console.log("logout");
      localStorage.clear();
      this.router.navigateByUrl('/login');
    },function(){})
  }
}
