import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs' ;
import {DoctorModel} from '../model/doctorModel.js';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  apiUrl='https://localhost:7007/api/Doctor/'

  GetAll():Observable<DoctorModel[]>{
    return this.http.get<DoctorModel[]>(this.apiUrl+'GetAll')
  }

  GetById(id:any){
    return this.http.get(this.apiUrl+'GetById?id='+id);
  }

  Create(data:any){
    return this.http.post(this.apiUrl+'Create',data);
  }

  UpdateById(data:any){
    return this.http.put(this.apiUrl+'Update?id='+data.doctorId,data);
  }
  
  RemoveDoctor(id:any){
    return this.http.delete(this.apiUrl+'Remove?id='+id);
  }
}
