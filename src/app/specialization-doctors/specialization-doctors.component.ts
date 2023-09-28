import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SpecializationService } from '../service/specialization.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DoctorModel } from '../model/doctorModel';
import { MatPaginator } from '@angular/material/paginator';
import * as alertify from 'alertifyjs';
import { DoctorSpecializationService } from '../service/doctorSpecialization';

@Component({
  selector: 'app-specialization-doctors',
  templateUrl: './specialization-doctors.component.html',
  styleUrls: ['./specialization-doctors.component.css']
})
export class SpecializationDoctorsComponent implements OnInit{
  constructor(private service:DoctorSpecializationService,@Inject(MAT_DIALOG_DATA) public data:any,
  private popUp:MatDialogRef<SpecializationDoctorsComponent>){}

  ngOnInit():void{
    this.GetData(this.data.id);
  }

  dataSource:any;
  responseData:any;
  name:any

  displayedColumns: string[] = ['id','name',];
  @ViewChild(MatPaginator) paginator !:MatPaginator;

  GetData(id:any){
    this.service.GetDoctors(id).subscribe(item=>{
      console.log(item);
      this.dataSource=item;
      this.dataSource=new MatTableDataSource<DoctorModel>(this.dataSource);
      this.dataSource.paginator=this.paginator;
    })
  }

}
