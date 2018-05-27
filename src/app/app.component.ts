import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

import { UserCredentials } from './constants';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loginForm: FormGroup;
    userCredentials: UserCredentials;
    isAuthenticated = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.minLength(5)]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)])
        });
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

    login(event) {
        const success = (response) => {
            console.log(response);
            this.isAuthenticated = true;
        };

        const error = (response) => {
            console.log(response);
            this.isAuthenticated = false;
        };


        const formValues = this.loginForm.value;
        const userCredentials: UserCredentials = {
            username: formValues.email,
            password: formValues.password
        };

        this.authService
            .login(userCredentials)
            .subscribe(success, error);
    }

    logout() {
        this.authService.logout();
        this.isAuthenticated = false;
    }

    testApi() {
        const success = (response) => {
            console.log(response);
        };
        const error = (response) => {
            console.error(response);
        };
        this.authService.getResource('friends').subscribe(success, error);
    }
}
