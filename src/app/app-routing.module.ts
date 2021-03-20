import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablesComponent } from './pages/tables/tables.component';
import { TodoComponent } from './todo/todo.component';
import { FormularioComponent } from './pages/formulario/formulario.component';

const routes: Routes = [
  { path: 'todos', component: TodoComponent },
  { path: 'table-user', component: TablesComponent },
  { path: 'formulario', component: FormularioComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'formulario' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
