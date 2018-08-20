import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatsComponent } from './stats/stats.component';
import { CejuscComponent } from './cejusc/cejusc.component';
import { CejuscNewComponent } from './cejusc/cejusc-new/cejusc-new.component';
import { AuthGuard } from './auth.guard';
import { ArquivoComponent } from './arquivo/arquivo.component';
import { ArquivoNewComponent } from './arquivo/arquivo-new/arquivo-new.component';
import { ContadoriaJefComponent } from './contadoria-jef/contadoria-jef.component';
import { ContadoriaJefNewComponent } from './contadoria-jef/contadoria-jef-new/contadoria-jef-new.component';
import { ContadoriaVaraComponent } from './contadoria-vara/contadoria-vara.component';
import { ContadoriaVaraNewComponent } from './contadoria-vara/contadoria-vara-new/contadoria-vara-new.component';
import { DistribuicaoJefComponent } from './distribuicao-jef/distribuicao-jef.component';
import { DistribuicaoJefNewComponent } from './distribuicao-jef/distribuicao-jef-new/distribuicao-jef-new.component';
import { MandadoDistribuidoComponent } from './mandado-distribuido/mandado-distribuido.component';
import { MandadoDistribuidoNewComponent } from './mandado-distribuido/mandado-distribuido-new/mandado-distribuido-new.component';

const routes: Routes = [
  {path: '', component: StatsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cejusc', component: CejuscComponent, canActivate: [AuthGuard]},
  {path: 'cejusc-novo', component: CejuscNewComponent, canActivate: [AuthGuard]},
  {path: 'arquivo', component: ArquivoComponent, canActivate: [AuthGuard]},
  {path: 'arquivo-novo', component: ArquivoNewComponent, canActivate: [AuthGuard]},
  {path: 'arquivo-novo/:id', component: ArquivoNewComponent, canActivate: [AuthGuard]},
  {path: 'contjef', component: ContadoriaJefComponent, canActivate: [AuthGuard]},
  {path: 'contjef-novo', component: ContadoriaJefNewComponent, canActivate: [AuthGuard]},
  {path: 'contjef-novo/:id', component: ContadoriaJefNewComponent, canActivate: [AuthGuard]},
  {path: 'contvara', component: ContadoriaVaraComponent, canActivate: [AuthGuard]},
  {path: 'contvara-novo', component: ContadoriaVaraNewComponent, canActivate: [AuthGuard]},
  {path: 'contvara-novo/:id', component: ContadoriaVaraNewComponent, canActivate: [AuthGuard]},
  {path: 'distjef', component: DistribuicaoJefComponent, canActivate: [AuthGuard]},
  {path: 'distjef-novo', component: DistribuicaoJefNewComponent, canActivate: [AuthGuard]},
  {path: 'distjef-novo/:id', component: DistribuicaoJefNewComponent, canActivate: [AuthGuard]},
  {path: 'mandado', component: MandadoDistribuidoComponent, canActivate: [AuthGuard]},
  {path: 'mandado-novo', component: MandadoDistribuidoNewComponent, canActivate: [AuthGuard]},
  {path: 'mandado-novo/:id', component: MandadoDistribuidoNewComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
