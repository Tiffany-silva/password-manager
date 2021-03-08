import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './UI-pages/registration/registration.component';
import {LoginComponent} from './UI-pages/login/login.component';
import {HomeComponent} from './UI-pages/home/home.component';

const routes: Routes = [
  {path: '', component: RegistrationComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
