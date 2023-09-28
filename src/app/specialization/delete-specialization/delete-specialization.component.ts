import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SpecializationService } from 'src/app/service/specialization.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-delete-specialization',
  templateUrl: './delete-specialization.component.html',
  styleUrls: ['./delete-specialization.component.css']
})
export class DeleteSpecializationComponent {

  
  constructor(private service:SpecializationService,private router:Router,private popUp:MatDialogRef<DeleteSpecializationComponent>){}

  Form = new FormGroup({
    specializationCode:new FormControl('',[Validators.required,Validators.pattern('^[A-Z]{3}$')])
  });

  responseData:any;

  DeleteSpecialization(){
    if(this.Form.valid){
      console.log(this.Form.value);
      this.service.Remove(this.Form.value.specializationCode).subscribe(item=>{
        this.responseData=item;
        if(this.responseData.result!=null){
          alertify.success("Specialization Deleted Successfully");
          this.popUp.close();
        }
        else{
          alertify.error("Failed Try Again");
          this.Form.reset();
          this.popUp.close();
        }
      })
    }
  }

  Cancel(){
    this.popUp.close();
  }
}
