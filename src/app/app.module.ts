import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SpecializationComponent } from './specialization/specialization.component';
import { SurgeryComponent } from './surgery/surgery.component';
import { ShowDataComponent } from './doctor/DisplayDoctor/show-data.component';
import { AddDataComponent } from './doctor/addDoctor/add-data.component';
import { LoginComponent } from './login/login.component';
import { ErrorhandlerComponent } from './errorhandler/errorhandler.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatTableModule} from '@angular/material/table'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { TokenInterceptorService } from './service/token-interceptor.service';
import { MatPaginatorModule } from '@angular/material/paginator'
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateDoctorComponent } from './doctor/update-doctor/update-doctor.component'
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SpecializationDoctorsComponent } from './specialization-doctors/specialization-doctors.component';
import { UpdateSurgeryComponent } from './update-surgery/update-surgery.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpecializationComponent,
    SurgeryComponent,
    ShowDataComponent,
    AddDataComponent,
    LoginComponent,
    ErrorhandlerComponent,
    UpdateDoctorComponent,
    SpecializationDoctorsComponent,
    UpdateSurgeryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
