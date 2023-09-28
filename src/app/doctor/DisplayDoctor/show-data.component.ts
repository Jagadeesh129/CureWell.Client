import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorModel } from 'src/app/model/doctorModel';
import { DoctorService } from 'src/app/service/doctor.service';
import * as alertify from 'alertifyjs';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDoctorComponent } from '../update-doctor/update-doctor.component';
import { AddDataComponent } from '../addDoctor/add-data.component';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit{

  constructor(private service :DoctorService,private dailog:MatDialog){}
  dataSource:any;
  ngOnInit():void{
    this.GetAll();
  }
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  data:any;
  GetAll(){
    this.service.GetAll().subscribe(item=>{
      this.data=item;
      this.dataSource=new MatTableDataSource<DoctorModel>(this.data);
      this.dataSource.paginator=this.paginator;
    })
  }
  displayedColumns: string[] = ['id','name','action'];

  Update(id:any){
    var popUp = this.dailog.open(UpdateDoctorComponent,{
      width:'400px',
      height:'400px',
      exitAnimationDuration:"1000ms",
      enterAnimationDuration:"1000ms",
      data:{
        id:id
      }
    })
    popUp.afterClosed().subscribe(item=>{
      this.GetAll();
    })
  }

  Add(){
    var popUp = this.dailog.open(AddDataComponent,{
      width:'400px',
      height:'400px',
      exitAnimationDuration:"1000ms",
      enterAnimationDuration:"1000ms",
    })
    popUp.afterClosed().subscribe(item=>{
      this.GetAll();
    })
  }

  Delete(id:any){
    alertify.confirm("Remove Doctor","If you remove this Doctor then Surgeries related to this doctor are deleted Okay?",()=>{
      this.service.RemoveDoctor(id).subscribe(item=>{
        this.GetAll();
        alertify.success("Removed Successfully");
      })
    },function(){})
  }
}

