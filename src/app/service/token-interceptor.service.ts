import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import {catchError,Observable,throwError,BehaviorSubject, switchMap, filter, take} from 'rxjs';
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private inject:Injector) { }
  
  intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let authService = this.inject.get(UserService);
    let authreq=request;
    authreq=this.AddTokenHeader(request,authService.GetToken());
    return next.handle(authreq).pipe(
      catchError(errordata=>{
        if(errordata.status===401){
            // authService.Logout();
            authService.Logout();
          return throwError(errordata);
        }
        return throwError(errordata);
      })
    );
  }
  
  AddTokenHeader(request:HttpRequest<any>,token:any){
    return request.clone({headers:request.headers.set('Authorization','bearer '+token)});
  }
}

