import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const appRoutes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
