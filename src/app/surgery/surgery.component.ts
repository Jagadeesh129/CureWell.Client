import { Component, ViewChild } from '@angular/core';
import { SurgeryService } from '../service/surgery.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { SurgeryModel } from '../model/surgeryModel';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateSurgeryComponent } from '../update-surgery/update-surgery.component';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.component.html',
  styleUrls: ['./surgery.component.css']
})
export class SurgeryComponent {
  constructor(private service :SurgeryService,private dailog:MatDialog){}
  dataSource:any;
  ngOnInit():void{
    this.GetAll();
  }
  @ViewChild(MatPaginator) paginator !:MatPaginator;
  data:any;
  GetAll(){
    this.service.GetAll().subscribe(item=>{
      this.data=item;
      console.log(item);
      this.dataSource=new MatTableDataSource<SurgeryModel>(this.data);
      this.dataSource.paginator=this.paginator;
    })
  }
  displayedColumns: string[] = ['surgeryid','doctorid','surgeryDate','startTime','endTime','surgeryCategory','action'];

  Update(id:any){
    var popUp = this.dailog.open(UpdateSurgeryComponent,{
      width:'500px',
      height:'350px',
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

  Delete(id:any){
    alertify.confirm("Remove User","Do you want remove this Surgery?",()=>{
      console.log(id);
      this.service.RemoveDoctor(id).subscribe(item=>{
        this.GetAll();
        alertify.success("Removed Successfully");
      })
    },function(){})
  }
}
