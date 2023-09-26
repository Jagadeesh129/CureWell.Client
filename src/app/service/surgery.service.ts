import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs' ;
import { SurgeryModel } from '../model/surgeryModel';

@Injectable({
  providedIn: 'root'
})
export class SurgeryService {

  constructor(private http:HttpClient) { }
  apiUrl='https://localhost:7007/api/Surgery/'

  GetAll():Observable<SurgeryModel[]>{
    return this.http.get<SurgeryModel[]>(this.apiUrl+'GetAll')
  }

  GetById(id:any){
    return this.http.get(this.apiUrl+'GetById?id='+id);
  }

  Create(data:any){
    return this.http.post(this.apiUrl+'Create',data);
  }

  UpdateById(data:any){
    return this.http.put(this.apiUrl+'Update?id='+data.surgeryId,data);
  }
  
  RemoveDoctor(id:any){
    return this.http.delete(this.apiUrl+'Remove?id='+id);
  }
}
