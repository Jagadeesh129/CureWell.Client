import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShowDataComponent } from './doctor/DisplayDoctor/show-data.component';
import { SurgeryComponent } from './surgery/display-surgery/surgery.component';
import { SpecializationComponent } from './specialization/display-specialization/specialization.component';
import { ErrorhandlerComponent } from './errorhandler/errorhandler.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path:"home",component:HomeComponent,canActivate:[authGuard]},
  {path:"showDoctor",component:ShowDataComponent,canActivate:[authGuard]},
  {path:"surgery",component:SurgeryComponent,canActivate:[authGuard]},
  {path:"specialization",component:SpecializationComponent,canActivate:[authGuard]},
  {path:"access",loadChildren:()=>import('./access/access.module').then(opt=>opt.AccessModule)},
  {path:"",component:LoginComponent},
  {path:"**",component:ErrorhandlerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
