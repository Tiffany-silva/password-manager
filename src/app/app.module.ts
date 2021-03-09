import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './UI-pages/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './UI-pages/login/login.component';
import { HomeComponent } from './UI-pages/home/home.component';
import {CryptoService} from './Services/cryto/crypto.service';
import { AddEntryComponent } from './Forms/add-entry/add-entry.component';
import {HttpClientModule} from '@angular/common/http';
import { authInterceptorProviders} from './helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AddEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CryptoService, authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
