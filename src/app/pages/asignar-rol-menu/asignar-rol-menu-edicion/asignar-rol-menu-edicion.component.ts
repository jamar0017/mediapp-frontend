import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';
import { switchMap } from 'rxjs/operators';
import { RolService } from 'src/app/_service/rol.service';
import { Rol } from 'src/app/_model/rol';

@Component({
  selector: 'app-asignar-rol-menu-edicion',
  templateUrl: './asignar-rol-menu-edicion.component.html',
  styleUrls: ['./asignar-rol-menu-edicion.component.css']
})
export class AsignarRolMenuEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  rolesDisponibles: Rol[];
  rolesPorAsignar: Rol[];
  rolDefault: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private rolService: RolService,
  ) { }

  ngOnInit(): void {
    this.rolesPorAsignar = new Array<Rol>();
    this.form = new FormGroup({
      'idMenu': new FormControl(0),
      'icono': new FormControl(''),
      'nombre': new FormControl(''),
      'url': new FormControl(''),
      'roles': new FormControl([]),
    });
    this.listarRoles();
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.initForm();
    });
  }

  private initForm() {
    this.menuService.listarPorId(this.id).subscribe(data => {
      this.form = new FormGroup({
        'idMenu': new FormControl(data.idMenu),
        'icono': new FormControl(data.icono),
        'nombre': new FormControl(data.nombre),
        'url': new FormControl({ value: data.url, disabled: true }),
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

    let menu = new Menu();
    menu.idMenu = this.form.value['idMenu'];
    menu.icono = this.form.value['icono'];
    menu.nombre = this.form.value['nombre'];
    menu.url = this.form.controls['url'].value;
    menu.roles = this.rolesPorAsignar;

    this.menuService.modificar(menu).pipe(switchMap(() => {
      return this.menuService.listar();
    })).subscribe(data => {
      this.menuService.setMenuCambio(data);
      this.menuService.setMensajeCambio('SE MODIFICO');
    });

    this.router.navigate(['asignar-rol-menu']);

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
