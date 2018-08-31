import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SrcBarComponent } from './src-bar/src-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { StatsComponent } from './stats/stats.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CejuscNewComponent } from './cejusc/cejusc-new/cejusc-new.component';
import { CejuscComponent } from './cejusc/cejusc.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { SharedService } from './services/shared.service';
import { DialogService } from './services/dialog.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { ArquivoComponent } from './arquivo/arquivo.component';
import { ArquivoNewComponent } from './arquivo/arquivo-new/arquivo-new.component';
import { ContadoriaJefComponent } from './contadoria-jef/contadoria-jef.component';
import { ContadoriaJefNewComponent } from './contadoria-jef/contadoria-jef-new/contadoria-jef-new.component';
import { ContadoriaVaraComponent } from './contadoria-vara/contadoria-vara.component';
import { ContadoriaVaraNewComponent } from './contadoria-vara/contadoria-vara-new/contadoria-vara-new.component';
import { DistribuicaoJefComponent } from './distribuicao-jef/distribuicao-jef.component';
import { DistribuicaoJefNewComponent } from './distribuicao-jef/distribuicao-jef-new/distribuicao-jef-new.component';
import { DistribuicaoVaraComponent } from './distribuicao-vara/distribuicao-vara.component';
import { DistribuicaoVaraNewComponent } from './distribuicao-vara/distribuicao-vara-new/distribuicao-vara-new.component';
import { MandadoDistribuidoComponent } from './mandado-distribuido/mandado-distribuido.component';
import { MandadoDistribuidoNewComponent } from './mandado-distribuido/mandado-distribuido-new/mandado-distribuido-new.component';
import { CejuscGraficoComponent } from './cejusc/cejusc-grafico/cejusc-grafico.component';
import { ChartsModule } from 'ng2-charts';
import { UsuarioNewComponent } from './usuario/usuario-new/usuario-new.component';
import { ContadoriaJefGraficoComponent } from './contadoria-jef/contadoria-jef-grafico/contadoria-jef-grafico.component';
import { ContadoriaVaraGrafico1Component } from './contadoria-vara/contadoria-vara-grafico1/contadoria-vara-grafico1.component';
import { ContadoriaVaraGrafico2Component } from './contadoria-vara/contadoria-vara-grafico2/contadoria-vara-grafico2.component';
import { DistribuicaoJefGraficoComponent } from './distribuicao-jef/distribuicao-jef-grafico/distribuicao-jef-grafico.component';
import { DistribuicaoVaraGrafico1Component } from './distribuicao-vara/distribuicao-vara-grafico1/distribuicao-vara-grafico1.component';
import { DistribuicaoVaraGrafico2Component } from './distribuicao-vara/distribuicao-vara-grafico2/distribuicao-vara-grafico2.component';
import { MandadoDistribuidoGraficoComponent } from './mandado-distribuido/mandado-distribuido-grafico/mandado-distribuido-grafico.component';
import { ArquivoTabelaComponent } from './arquivo/arquivo-tabela/arquivo-tabela.component';
import { DistribuicaoJefTabelaComponent } from './distribuicao-jef/distribuicao-jef-tabela/distribuicao-jef-tabela.component';


@NgModule({
  declarations: [
    AppComponent,
    SrcBarComponent,
    LoginComponent,
    StatsComponent,
    UsuarioComponent,
    CejuscNewComponent,
    CejuscComponent,
    ArquivoComponent,
    ArquivoNewComponent,
    ContadoriaJefComponent,
    ContadoriaJefNewComponent,
    ContadoriaVaraComponent,
    ContadoriaVaraNewComponent,
    DistribuicaoJefComponent,
    DistribuicaoJefNewComponent,
    DistribuicaoVaraComponent,
    DistribuicaoVaraNewComponent,
    MandadoDistribuidoComponent,
    MandadoDistribuidoNewComponent,
    CejuscGraficoComponent,
    UsuarioNewComponent,
    ContadoriaJefGraficoComponent,
    ContadoriaVaraGrafico1Component,
    ContadoriaVaraGrafico2Component,
    DistribuicaoJefGraficoComponent,
    DistribuicaoVaraGrafico1Component,
    DistribuicaoVaraGrafico2Component,
    MandadoDistribuidoGraficoComponent,
    ArquivoTabelaComponent,
    DistribuicaoJefTabelaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [UsuarioService, SharedService, AuthGuard, DialogService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
