import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IName, IUserRespond, IUser } from '../../interfaces';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  users: IName[] = []
  
  usersFemale: IUser[] = []
  usersMale: IUser[] = []
  

  constructor(private u: UsersService) { }

  ngOnInit(){
   
  this.getUsuarios();
  this.getGenero();


    
  }


  getUsuarios(){
  this.u.getUsers()
  .subscribe( users =>{
    users.forEach(user=>{
      this.users.push(this.u.aux(user));
      this.users.splice(10, 1);
    })
  })
}

// getTest()
// {
//   this.u.getUsers()
// .subscribe(data2 => {
//   console.log(data2);
//   this.data2 = data2;
//   for (let user of this.data2){
//    user.name == user.name.firstName + " " + user.name.lastName;
      
// console.log(user.name);
// }

//   });

// }

getGenero(){

  this.u.getUsers()
  .subscribe( users =>{
    users
    .forEach( user =>{
      if(user.gender==="F"){
        this.usersFemale.push(this.u.aux(user));
        this.usersFemale.splice(10, 1);
      };
      if(user.gender==='M'){
        this.usersMale.push(this.u.aux(user));
        this.usersMale.splice(10, 1);
      };
    })
  })
}

  


}
// ENDPOINT Y URLBASE ubicados en archivo environments.ts
// Está prohibido alterar el componente table-test
// Mostrar como máximo 10 registros en cada tabla
// TODO 1 Consumir Servicio por método get para obtener data y llenar la primera tabla users
// TODO 1.1 En el nombre concatenar firstName y lastName con un espacio entre ellos 
// TODO 2 Llenar la 2da tabla de usersFemale únicamente con registros donde gender sea correspondiente a 'F'
// TODO 2.1 Llenar la 3ra tabla de usersMale únicamente con registros donde gender sea correspondiente a 'M'
