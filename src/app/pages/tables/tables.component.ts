import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/interfaces/user';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  users: IUser[] = []
  usersFemale: IUser[] = []
  usersMale: IUser[] = []

  constructor(private service: ServiceService, private toastr: ToastrService) {
    this.getAllUser();
  }

  ngOnInit(): void {

  }

  getAllUser() {
    this.service.getAllUser().subscribe((data: IUser[]) => {

      if (data !== null || data !== undefined) {
        //llenado de lista primeros 10 usuarios
        data.slice(0, 10).forEach(x => this.users.push(this.createUser(x)))

        //llenado lista primeros 10 usuarios femeninos
        data.filter(x => x.gender === 'F').slice(0, 10).forEach(x => this.usersFemale.push(this.createUser(x)))

        //llenado lista primeros 10 usuarios masculinos
        data.filter(x => x.gender === 'M').slice(0, 10).forEach(x => this.usersMale.push(this.createUser(x)))

        this.toastr.success('Usuarios obtenidos', 'OK', {
          timeOut: 3000,
        });
      }
    }, (error) => {
      this.toastr.error(error['message'], 'Error', {
        timeOut: 3000,
      });
    })
  }

  createUser(user): IUser {
    const us: IUser = {
      id: user.id,
      name: `${user.name['firstName']} ${user.name['lastName']}`,
      age: user.age,
      isWorkNow: user.isWorkNow,
      email: user.email != null ? user.email : 'N/A',
      username: user.username,
      gender: user.gender,
      company: user.company
    }
    return us;
  }

}

// ENDPOINT Y URLBASE ubicados en archivo environments.ts
// Está prohibido alterar el componente table-test
// Mostrar como máximo 10 registros en cada tabla
// TODO 1 Consumir Servicio por método get para obtener data y llenar la primera tabla users
// TODO 1.1 En el nombre concatenar firstName y lastName con un espacio entre ellos 
// TODO 2 Llenar la 2da tabla de usersFemale únicamente con registros donde gender sea correspondiente a 'F'
// TODO 2.1 Llenar la 3ra tabla de usersMale únicamente con registros donde gender sea correspondiente a 'M'
