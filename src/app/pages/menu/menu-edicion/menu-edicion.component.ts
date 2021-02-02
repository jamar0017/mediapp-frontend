import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';
import { switchMap } from 'rxjs/operators';
import { Rol } from 'src/app/_model/rol';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'idMenu': new FormControl(0),
      'icono': new FormControl(''),
      'nombre': new FormControl(''),
      'url': new FormControl(''),
      'roles': new FormControl([]),
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    if (this.edicion) {
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idMenu': new FormControl(data.idMenu),
          'icono': new FormControl(data.icono, Validators.required),
          'nombre': new FormControl(data.nombre, Validators.required),
          'url': new FormControl(data.url, Validators.required),
          'roles': new FormControl(data.roles)
        });
      });
    }
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
    menu.url = this.form.value['url'];
    menu.roles = this.form.value['roles'];

    if (this.edicion) {
      this.menuService.modificar(menu).pipe(switchMap(() => {
        return this.menuService.listar();
      }))
        .subscribe(data => {
          this.menuService.setMenuCambio(data);
          this.menuService.setMensajeCambio('SE MODIFICO');
        });

    } else {
      //REGISTRAR
      this.menuService.registrar(menu).subscribe(() => {
        this.menuService.listar().subscribe(data => {
          this.menuService.setMenuCambio(data);
          this.menuService.setMensajeCambio('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['menu']);

  }

}
