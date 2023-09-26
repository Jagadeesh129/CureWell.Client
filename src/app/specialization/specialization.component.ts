import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateDoctorComponent } from '../doctor/update-doctor/update-doctor.component';
import * as alertify from 'alertifyjs';
import { SpecializationService } from '../service/specialization.service';
import { SpecializationModel } from '../model/specializationModel';
import { SpecializationDoctorsComponent } from '../specialization-doctors/specialization-doctors.component';

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent {

  constructor(private service :SpecializationService,private dailog:MatDialog){}
  dataSource:any;
  ngOnInit():void{
    this.GetAll();
  }
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  data:any;
  GetAll(){
    this.service.GetAll().subscribe(item=>{
      this.data=item;
      console.log(this.data);
      this.dataSource=new MatTableDataSource<SpecializationModel>(this.data);
      this.dataSource.paginator=this.paginator;
    })
  }
  displayedColumns: string[] = ['specializationCode','specializationName','Action'];

  ShowDoctors(code:any){
      var popUp = this.dailog.open(SpecializationDoctorsComponent,{
        width:'600px',
        height:'500px',
        exitAnimationDuration:"1000ms",
        enterAnimationDuration:"1000ms",
        data:{
          id:code
        }
      })
      popUp.afterClosed().subscribe(item=>{
        this.GetAll();
      })
  }
  // Update(id:any){
  //   var popUp = this.dailog.open(UpdateDoctorComponent,{
  //     width:'400px',
  //     height:'400px',
  //     exitAnimationDuration:"1000ms",
  //     enterAnimationDuration:"1000ms",
  //     data:{
  //       id:id
  //     }
  //   })
  //   popUp.afterClosed().subscribe(item=>{
  //     this.GetAll();
  //   })
  // }

  // Delete(id:any){
  //   alertify.confirm("Remove User","Do you want remove this user?",()=>{
  //     this.service.Remove(id).subscribe(item=>{
  //       this.GetAll();
  //       alertify.success("Removed Successfully");
  //     })
  //   },function(){})
  //}

}
