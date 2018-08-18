import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatsComponent } from './stats/stats.component';
import { CejuscComponent } from './cejusc/cejusc.component';
import { CejuscNewComponent } from './cejusc/cejusc-new/cejusc-new.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', component: StatsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cejusc', component: CejuscComponent, canActivate: [AuthGuard]},
  {path: 'cejusc-novo', component: CejuscNewComponent, canActivate: [AuthGuard]},
  {path: 'cejusc-novo/:id', component: CejuscNewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
