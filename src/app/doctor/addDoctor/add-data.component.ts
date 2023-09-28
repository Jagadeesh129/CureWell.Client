import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DoctorSpecializationService } from 'src/app/service/doctorSpecialization';
import { DoctorSpecializationModel } from 'src/app/model/doctorSpecializationModel';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {

  constructor(private service:DoctorService,private router:Router,private popUp:MatDialogRef<AddDataComponent>,private drs:DoctorSpecializationService){}

  addForm = new FormGroup({
    doctorName:new FormControl('',Validators.required),
    specializationCode:new FormControl('',Validators.required),
    SpecializationDate:new FormControl('',Validators.required),
  });

  responseData:any;

  dsModel:DoctorSpecializationModel=new DoctorSpecializationModel();

  AddDoctor(){
    if(this.addForm.valid){
      console.log(this.addForm.value);
      this.service.Create(this.addForm.value).subscribe(item=>{
        console.log(item);
        this.responseData=item;
        this.dsModel.specializationCode=this.addForm.value.specializationCode;
        this.dsModel.doctorId=parseInt(this.responseData.result,10);
        this.dsModel.specializationDate=new Date(this.addForm.value.SpecializationDate);
        this.drs.AddDoctorSpecialization(this.dsModel).subscribe(item=>{
          this.responseData=item;
        })
        if(this.responseData.result!=null){
          alertify.success("Doctor added Successfully");
          this.popUp.close();
        }
        else{
          alertify.failure("Failed Try Again");
          this.addForm.reset();
          this.router.navigate(['showDoctor']);
        }
      })
    }
  }

  Cancel(){
    this.popUp.close();
  }
}

