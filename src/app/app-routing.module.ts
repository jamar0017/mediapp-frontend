import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ConsultaEspecialComponent } from './pages/consulta-especial/consulta-especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { WizardComponent } from './pages/consulta/wizard/wizard.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { LoginComponent } from './pages/login/login.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { AsignarRolMenuEdicionComponent } from './pages/asignar-rol-menu/asignar-rol-menu-edicion/asignar-rol-menu-edicion.component';
import { AsignarRolMenuComponent } from './pages/asignar-rol-menu/asignar-rol-menu.component';
import { MenuEdicionComponent } from './pages/menu/menu-edicion/menu-edicion.component';
import { MenuComponent } from './pages/menu/menu.component';
import { Not403Component } from './pages/not403/not403.component';
import { Not404Component } from './pages/not404/not404.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { RolEdicionComponent } from './pages/rol/rol-edicion/rol-edicion.component';
import { RolComponent } from './pages/rol/rol.component';
import { GuardService } from './_service/guard.service';
import { AsignarRolUsuarioComponent } from './pages/asignar-rol-usuario/asignar-rol-usuario.component';
import { AsignarRolUsuarioEdicionComponent } from './pages/asignar-rol-usuario/asignar-rol-usuario-edicion/asignar-rol-usuario-edicion.component';

const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  {
    path: 'rol', component: RolComponent, children: [
      { path: 'nuevo', component: RolEdicionComponent },
      { path: 'edicion/:id', component: RolEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'menu', component: MenuComponent, children: [
      { path: 'nuevo', component: MenuEdicionComponent },
      { path: 'edicion/:id', component: MenuEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'asignar-rol-menu', component: AsignarRolMenuComponent, children: [
      { path: 'asignar/:id', component: AsignarRolMenuEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'asignar-rol-usuario', component: AsignarRolUsuarioComponent, children: [
      { path: 'asignar/:id', component: AsignarRolUsuarioEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'consulta-wizard', component: WizardComponent, canActivate: [GuardService] },
  { path: 'consulta-especial', component: ConsultaEspecialComponent, canActivate: [GuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
