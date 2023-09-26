// import { Injectable } from '@angular/core';
// import {  UrlTree, Router } from '@angular/router';
// import {Observable} from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// export class authGuard {

//   constructor(private service : UserService,private route:Router) {}

//   canActivate(): 
//   | Observable<boolean | UrlTree> 
//   | Promise<boolean | UrlTree> 
//   | boolean 
//   | UrlTree {
//     if(this.service.IsLoggedIn()){
//       return true;
//     }
//     else{
//       alert('Please login and access it')
//       this.route.navigate(['login']);
//       return false;
//     }
//   }
// } 

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';

export const authGuard: CanActivateFn = (route, state) => 
{
  const router=inject(Router);
  const service = inject(UserService)
  if(service.IsLoggedIn()){
    return true;
  }
  else{
    alert('Please login and access it');
    router.navigate(['login']);
    return false;
  }
};

