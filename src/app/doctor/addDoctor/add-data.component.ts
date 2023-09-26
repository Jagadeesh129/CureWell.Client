import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/service/doctor.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {

  constructor(private service:DoctorService,private router:Router){}

  addForm = new FormGroup({
    doctorName:new FormControl('',Validators.required)
  });

  responseData:any;

  AddDoctor(){
    if(this.addForm.valid){
      console.log(this.addForm.value);
      this.service.Create(this.addForm.value).subscribe(item=>{
        this.responseData=item;
        if(this.responseData.result!=null){
          alertify.success("Doctor added Successfully");
          this.addForm.reset();
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
    this.addForm.reset();
    this.router.navigate(['showDoctor']);
  }
}


// if(this.updateForm.valid){
//   console.log(this.updateForm.getRawValue());
//   this.service.UpdateById(this.updateForm.getRawValue()).subscribe(item=>{
//     this.responseData=item;
//     console.log(this.responseData);
//     if(this.responseData.result!=null){
//       alertify.success("Updated Succesful");
//       this.popUp.close();
//     }
//     else{
//       alertify.failure("Failed Try Again");
//     }
//   })
// }
