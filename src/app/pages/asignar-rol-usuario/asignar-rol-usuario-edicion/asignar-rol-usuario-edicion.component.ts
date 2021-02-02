import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';

@Component({
  selector: 'app-asignar-rol-usuario-edicion',
  templateUrl: './asignar-rol-usuario-edicion.component.html',
  styleUrls: ['./asignar-rol-usuario-edicion.component.css']
})
export class AsignarRolUsuarioEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  rolesDisponibles: Rol[];
  rolesPorAsignar: Rol[];
  rolDefault: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
  ) { }

  ngOnInit(): void {
    this.rolesPorAsignar = new Array<Rol>();
    this.form = new FormGroup({
      'idUsuario': new FormControl(0),
      'username': new FormControl(''),
      'roles': new FormControl([]),
    });
    this.listarRoles();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.initForm();
    });
  }

  private initForm() {
    this.usuarioService.listarPorId(this.id).subscribe(data => {
      this.form = new FormGroup({
        'idUsuario': new FormControl(data.idUsuario),
        'username': new FormControl({ value: data.username, disabled: true }),
        'roles': new FormControl(data.roles)
      });

      this.rolesPorAsignar = new Array<Rol>();
      data.roles.forEach((val: Rol) => {
        this.rolesPorAsignar.push(val);
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  operar() {
    if (this.form.invalid) { return; }

    let usuario = new Usuario();
    usuario.idUsuario = this.form.value['idUsuario'];
    usuario.username = this.form.controls['username'].value;
    usuario.roles = this.rolesPorAsignar;

    this.usuarioService.modificar(usuario).pipe(switchMap(() => {
      return this.usuarioService.listar();
    })).subscribe(data => {
      this.usuarioService.setUsuarioCambio(data);
      this.usuarioService.setMensajeCambio('SE MODIFICO');
    });

    this.router.navigate(['asignar-rol-usuario']);

  }

  listarRoles() {
    this.rolService.listar().subscribe(data => {
      this.rolesDisponibles = data;
      this.rolDefault = data[0];
    });
  }


  seleccionarRol(e: any) {
    if (!(this.rolesPorAsignar.find((val: Rol) => val.idRol === e.value.idRol))) {
      this.rolesPorAsignar.push(e.value);
    }
  }

  getRoles(): Rol[] {
    return this.form.value['roles'];
  }

  removerRol(index: number) {
    this.rolesPorAsignar.splice(index, 1);
  }

}
