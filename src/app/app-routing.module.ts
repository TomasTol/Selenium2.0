import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { SubidaComponent } from './subida/subida.component';
import { CrearFiestaComponent } from './crear-fiesta/crear-fiesta.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: "login", component: LoginComponent, title: "login" },
  { path: "main", component: MainComponent, title: "main" },
  { path: "register", component: RegisterComponent, title: "register" },
  { path: "search", component: BuscadorComponent, title: "search" },
  { path: "upload", component: SubidaComponent, title: "upload" },
  { path: "crearFiesta", component: CrearFiestaComponent, title: "CREAR FIESTA" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
