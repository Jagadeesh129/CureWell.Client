import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpecializationService } from 'src/app/service/specialization.service';
import { MatDialogRef } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.css']
})
export class AddSpecializationComponent {

  constructor(private service:SpecializationService,private router:Router,private popUp:MatDialogRef<AddSpecializationComponent>){}

  addForm = new FormGroup({
    specializationCode:new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{3}$')]),
    specializationName:new FormControl('',Validators.required)
  });

  responseData:any;

  AddSpecialization(){
    if(this.addForm.valid){
      console.log(this.addForm.value);
      this.service.Create(this.addForm.value).subscribe(item=>{
        this.responseData=item;
        if(this.responseData.result!=null){
          alertify.success("Specialization added Successfully");
          this.popUp.close();
        }
        else{
          alertify.error("Failed Try Again");
          this.addForm.reset();
          this.popUp.close();
        }
      })
    }
  }

  Cancel(){
    this.popUp.close();
  }
}
