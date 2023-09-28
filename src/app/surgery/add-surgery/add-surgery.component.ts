import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as alertify from 'alertifyjs'
import { SurgeryService } from 'src/app/service/surgery.service';

@Component({
  selector: 'app-add-surgery',
  templateUrl: './add-surgery.component.html',
  styleUrls: ['./add-surgery.component.css']
})
export class AddSurgeryComponent {

  constructor(private service:SurgeryService,private popUp:MatDialogRef<AddSurgeryComponent>){}

  responseData:any;

  Add(){
    if(this.addForm.valid){
      console.log(this.addForm.valid);
      this.service.Create(this.addForm.value).subscribe(item=>{
        this.responseData=item;
        console.log(this.responseData);
        if(this.responseData.result!=null){
          alertify.success("Added Succesfully");
          this.popUp.close();
        }
        else{
          alertify.error("Failed Try Again");
        }
      })
    }
  }

  addForm = new FormGroup({
    doctorId: new FormControl('', [
      Validators.required
    ]),
    surgeryDate:new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required),
    endTime:new FormControl('',Validators.required),
    surgeryCategory:new FormControl('',Validators.required),
  });


  ClosePop(){
    this.popUp.close();
  }
}
