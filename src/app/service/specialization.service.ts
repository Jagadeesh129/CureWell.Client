import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecializationModel } from '../model/specializationModel';
import { DoctorModel } from '../model/doctorModel';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor(private http:HttpClient) { }
  apiUrl='https://localhost:7007/api/Specialization/'

  GetAll():Observable<SpecializationModel[]>{
    return this.http.get<SpecializationModel[]>(this.apiUrl+'GetAll')
  }

  GetById(id:any){
    return this.http.get<SpecializationModel>(this.apiUrl+'GetById?id='+id);
  }

  Create(data:any){
    return this.http.post(this.apiUrl+'Create',data);
  }

  UpdateById(data:any){
    return this.http.put(this.apiUrl+'Update?id='+data.specializationCode,data);
  }
  
  Remove(id:any){
    return this.http.delete(this.apiUrl+'Remove?id='+id);
  }

}
