import * as alertify from 'alertifyjs';
import { SurgeryService } from '../../service/surgery.service';
import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-surgery',
  templateUrl: './update-surgery.component.html',
  styleUrls: ['./update-surgery.component.css']
})
export class UpdateSurgeryComponent implements OnInit{
  constructor(private service:SurgeryService,@Inject(MAT_DIALOG_DATA) public data:any,
  private popUp:MatDialogRef<UpdateSurgeryComponent>){}

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
        this.updateForm.setValue({
          doctorId:this.existedData.doctorId,
          surgeryId:this.existedData.surgeryId,
          surgeryDate:this.existedData.surgeryDate,
          startTime:this.existedData.startTime,
          endTime:this.existedData.endTime,
          surgeryCategory:this.existedData.surgeryCategory,
        });
      }
    })
  }

  Update(){
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
    surgeryId: new FormControl({value:"",disabled:true}),
    doctorId: new FormControl({value:"",disabled:true}),
    surgeryDate:new FormControl({value:"",disabled:true}),
    startTime:new FormControl('',Validators.required),
    endTime:new FormControl('',Validators.required),
    surgeryCategory:new FormControl({value:"",disabled:true}),
  });


  ClosePop(){
    this.popUp.close();
  }
}
