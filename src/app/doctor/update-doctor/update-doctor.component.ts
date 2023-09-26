import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from 'src/app/service/doctor.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit{

  constructor(private service:DoctorService,@Inject(MAT_DIALOG_DATA) public data:any,
  private popUp:MatDialogRef<UpdateDoctorComponent>){}

  ngOnInit():void{
    this.GetData(this.data.id);
  }

  existedData : any;
  responseData:any;

  GetData(id:any){
    this.service.GetById(id).subscribe(item=>{
      console.log(item);
      this.existedData=item;
      if(this.existedData!=null){
        this.updateForm.setValue({doctorId:this.existedData.doctorId,doctorName:this.existedData.doctorName});
      }
    })
  }

  UpdateDoctor(){
    if(this.updateForm.valid){
      console.log(this.updateForm.getRawValue());
      this.service.UpdateById(this.updateForm.getRawValue()).subscribe(item=>{
        this.responseData=item;
        console.log(this.responseData);
        if(this.responseData.result!=null){
          alertify.success("Updated Succesful");
          this.popUp.close();
        }
        else{
          alertify.failure("Failed Try Again");
        }
      })
    }
  }

  updateForm = new FormGroup({
    doctorId: new FormControl({value:"",disabled:true}),
    doctorName:new FormControl('',Validators.required)
  });

  ClosePop(){
    this.popUp.close();
  }

}
