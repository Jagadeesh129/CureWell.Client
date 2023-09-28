import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs' ;
import { DoctorModel } from '../model/doctorModel';
import { DoctorSpecializationModel } from '../model/doctorSpecializationModel';

@Injectable({
    providedIn: 'root'
  })
  export class DoctorSpecializationService {
    constructor(private http:HttpClient){}

    GetDoctors(code:any){
        return this.http.get<DoctorModel>('https://localhost:7007/api/DoctorSpecialization/GetDoctorsByCode?code='+code);
      }
    
      AddDoctorSpecialization(data:DoctorSpecializationModel){
        return this.http.post('https://localhost:7007/api/DoctorSpecialization/Create',data);
      }
  }