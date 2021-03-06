import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MedicoDialogoComponent } from './pages/medico/medico-dialogo/medico-dialogo.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsultaEspecialComponent } from './pages/consulta-especial/consulta-especial.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { BuscarDialogoComponent } from './pages/buscar/buscar-dialogo/buscar-dialogo.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoginComponent } from './pages/login/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { ServerErrorsInterceptor } from './shared/server-errors.interceptor';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RolComponent } from './pages/rol/rol.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuEdicionComponent } from './pages/menu/menu-edicion/menu-edicion.component';
import { AsignarRolMenuComponent } from './pages/asignar-rol-menu/asignar-rol-menu.component';
import { AsignarRolMenuEdicionComponent } from './pages/asignar-rol-menu/asignar-rol-menu-edicion/asignar-rol-menu-edicion.component';
import { AsignarRolUsuarioComponent } from './pages/asignar-rol-usuario/asignar-rol-usuario.component';
import { AsignarRolUsuarioEdicionComponent } from './pages/asignar-rol-usuario/asignar-rol-usuario-edicion/asignar-rol-usuario-edicion.component';

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    RolComponent,
    RolEdicionComponent,
    MenuComponent,
    MenuEdicionComponent,
    AsignarRolMenuComponent,
    AsignarRolMenuEdicionComponent,
    AsignarRolUsuarioComponent,
    AsignarRolUsuarioEdicionComponent,
    MedicoComponent,
    PacienteEdicionComponent,
    MedicoDialogoComponent,
    ExamenComponent,
    ExamenEdicionComponent,
    EspecialidadComponent,
    EspecialidadEdicionComponent,
    ConsultaComponent,
    ConsultaEspecialComponent,
    WizardComponent,
    BuscarComponent,
    BuscarDialogoComponent,
    ReporteComponent,
    LoginComponent,
    Not403Component,
    Not404Component,
    RecuperarComponent,
    TokenComponent
  ],
  //entryComponents:[ MedicoDialogoComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    PdfViewerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.HOST.substring(7)],
        disallowedRoutes: [`http://${environment.HOST.substring(7)}/login/enviarCorreo`],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorsInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
